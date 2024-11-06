// index.js
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "./middlewares/authenticateToken.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const GOOGLE_MAPS_API_KEY = "AIzaSyBTvNmclwwco65CZaBlyneOmSEBjqAIaNo";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "ecomap",
});

const bd = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "ecomap",
});

export default bd;

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.post("/buscar-pontos-coleta", async (req, res) => {
  const { latitude, longitude, raio, materiais } = req.body;

  try {
    const connection = await db;
    const query = `
      SELECT DISTINCT pc.*, 
      (6371 * acos(cos(radians(?)) * cos(radians(pc.latitude)) * cos(radians(pc.longitude) - radians(?)) 
      + sin(radians(?)) * sin(radians(pc.latitude)))) AS distance 
      FROM Ponto_coleta AS pc
      JOIN PontoColeta_TipoMaterial AS ptm ON pc.id_pontoColeta = ptm.fk_id_pontoColeta
      WHERE ptm.fk_id_tipoMaterial IN (${materiais.join(",")})
      HAVING distance < ?
      ORDER BY distance
    `;
    
    const [results] = await connection.execute(query, [latitude, longitude, latitude, raio]);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar pontos de coleta" });
  }
});

// Endpoint para buscar ONGs próximas
app.post("/buscar-ongs", async (req, res) => {
  const { latitude, longitude, raio, materiais } = req.body;

  try {
    const connection = await db;
    const query = `
      SELECT DISTINCT ong.*, 
      (6371 * acos(cos(radians(?)) * cos(radians(ong.latitude)) * cos(radians(ong.longitude) - radians(?)) 
      + sin(radians(?)) * sin(radians(ong.latitude)))) AS distance 
      FROM Usuario AS ong
      JOIN Usuario_tipoMaterial AS utm ON ong.id_usuario = utm.fk_id_usuario
      WHERE utm.fk_id_tipoMaterial IN (${materiais.join(",")}) 
        AND ong.fk_id_categoria = 2
      HAVING distance < ?
      ORDER BY distance
    `;
    
    const [results] = await connection.execute(query, [latitude, longitude, latitude, raio]);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar ONGs próximas" });
  }
});

app.post("/buscar-empresas", async (req, res) => {
  const { latitude, longitude, raio, materiais, tipoTransacao } = req.body;

  try {
    const connection = await db;
    const query = `
      SELECT DISTINCT emp.*, 
      (6371 * acos(cos(radians(?)) * cos(radians(emp.latitude)) * cos(radians(emp.longitude) - radians(?)) 
      + sin(radians(?)) * sin(radians(emp.latitude)))) AS distance 
      FROM Usuario AS emp
      JOIN Usuario_tipoMaterial AS utm ON emp.id_usuario = utm.fk_id_usuario
      WHERE utm.fk_id_tipoMaterial IN (${materiais.join(",")}) 
        AND emp.tipo_transacao = ?  -- Filtra pelo tipo de transação (Compra, Vende ou Ambos)
        AND emp.fk_id_categoria = 1  -- Supondo que a categoria 1 representa empresas de reciclagem
      HAVING distance < ?
      ORDER BY distance
    `;
    
    const [results] = await connection.execute(query, [latitude, longitude, latitude, tipoTransacao, raio]);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar empresas próximas" });
  }
});

// // Endpoint para sugestão de novo ponto de coleta
// app.post("/sugerir-ponto", async (req, res) => {
//   const { endereco, cep, cidade, estado, materiais } = req.body;

//   try {
//     const connection = await db;

//     // Insere o ponto de coleta com status_ponto = FALSE
//     const [result] = await connection.execute(
//       `INSERT INTO Ponto_coleta (endereco, cep, cidade, estado, status_ponto) VALUES (?, ?, ?, ?, FALSE)`,
//       [endereco, cep, cidade, estado]
//     );
    
//     const pontoColetaId = result.insertId;

//     // Associa os tipos de materiais aceitos ao ponto de coleta sugerido
//     const materialQueries = materiais.map((materialId) => {
//       return connection.execute(
//         `INSERT INTO PontoColeta_TipoMaterial (fk_id_pontoColeta, fk_id_tipoMaterial) VALUES (?, ?)`,
//         [pontoColetaId, materialId]
//       );
//     });

//     await Promise.all(materialQueries);

//     res.json({ message: "Ponto de coleta sugerido com sucesso!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erro ao sugerir ponto de coleta" });
//   }
// });

// Função para validar o endereço usando a API de Geocoding do Google Maps
async function validarEndereco(endereco) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      endereco
  )}&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await axios.get(geocodeUrl);
  const data = response.data;

  if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
          valido: true,
          latitude: location.lat,
          longitude: location.lng,
          enderecoFormatado: data.results[0].formatted_address,
      };
  } else {
      return { valido: false };
  }
}

// Endpoint para sugestão de novo ponto de coleta com validação de endereço
app.post("/sugerir-ponto", async (req, res) => {
  const { endereco, cep, cidade, estado, materiais } = req.body;
  const enderecoCompleto = `${endereco}, ${cidade}, ${estado}, ${cep}`;

  try {
      // Valida o endereço
      const validacao = await validarEndereco(enderecoCompleto);

      if (!validacao.valido) {
          return res.status(400).json({ error: "Endereço inválido. Verifique as informações e tente novamente." });
      }

      const { latitude, longitude, enderecoFormatado } = validacao;
      const connection = await db;

      // Insere o ponto de coleta com status_ponto = FALSE
      const [result] = await connection.execute(
          `INSERT INTO Ponto_coleta (endereco, cep, cidade, estado, latitude, longitude, status_ponto) VALUES (?, ?, ?, ?, ?, ?, FALSE)`,
          [enderecoFormatado, cep, cidade, estado, latitude, longitude]
      );

      const pontoColetaId = result.insertId;

      // Associa os tipos de materiais aceitos ao ponto de coleta sugerido
      const materialQueries = materiais.map((materialId) => {
          return connection.execute(
              `INSERT INTO PontoColeta_TipoMaterial (fk_id_pontoColeta, fk_id_tipoMaterial) VALUES (?, ?)`,
              [pontoColetaId, materialId]
          );
      });

      await Promise.all(materialQueries);

      res.json({ message: "Ponto de coleta sugerido com sucesso! Aguarde a validação do administrador." });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao sugerir ponto de coleta" });
  }
});

// app.js
app.get("/pontos-sugeridos", async (req, res) => {
  try {
      const [rows] = await bd.execute(`
          SELECT p.id_pontoColeta, p.endereco, p.cep, p.cidade, p.estado, p.latitude, p.longitude,
              GROUP_CONCAT(t.nome_tipoMaterial) AS materiais
          FROM Ponto_coleta p
          JOIN PontoColeta_TipoMaterial ptm ON p.id_pontoColeta = ptm.fk_id_pontoColeta
          JOIN Tipo_material t ON ptm.fk_id_tipoMaterial = t.id_tipoMaterial
          WHERE p.status_ponto = FALSE
          GROUP BY p.id_pontoColeta
      `);
      res.json(rows);
  } catch (error) {
      console.error("Erro ao buscar pontos sugeridos:", error);  // Log detalhado do erro
      res.status(500).json({ error: "Erro ao buscar pontos sugeridos" });
  }
});

app.put("/aprovar-ponto/:id", async (req, res) => {
  const { id } = req.params;
  try {
      await bd.execute("UPDATE Ponto_coleta SET status_ponto = TRUE WHERE id_pontoColeta = ?", [id]);
      res.json({ message: "Ponto aprovado com sucesso!" });
  } catch (error) {
      console.error("Erro ao aprovar ponto:", error);
      res.status(500).json({ error: "Erro ao aprovar ponto" });
  }
});

app.delete("/excluir-ponto/:id", async (req, res) => {
  const { id } = req.params;
  try {
      await bd.execute("DELETE FROM PontoColeta_TipoMaterial WHERE fk_id_pontoColeta = ?", [id]);
      await bd.execute("DELETE FROM Ponto_coleta WHERE id_pontoColeta = ?", [id]);
      res.json({ message: "Ponto excluído com sucesso!" });
  } catch (error) {
      console.error("Erro ao excluir ponto:", error);
      res.status(500).json({ error: "Erro ao excluir ponto" });
  }
});

//novas atualizações

app.post("/adicionar-ponto", async (req, res) => {
  const { endereco, cep, cidade, estado, latitude, longitude, materiais } = req.body;

  try {
      // Insere o novo ponto de coleta no banco com status TRUE
      const [result] = await bd.execute(
          `INSERT INTO Ponto_coleta (endereco, cep, cidade, estado, latitude, longitude, status_ponto) VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
          [endereco, cep, cidade, estado, latitude, longitude]
      );

      const pontoColetaId = result.insertId;

      // Insere os tipos de materiais aceitos pelo ponto de coleta
      const materialQueries = materiais.map((materialNome) => {
          return bd.execute(
              `INSERT INTO PontoColeta_TipoMaterial (fk_id_pontoColeta, fk_id_tipoMaterial) 
               SELECT ?, id_tipoMaterial FROM Tipo_material WHERE nome_tipoMaterial = ?`,
              [pontoColetaId, materialNome]
          );
      });

      await Promise.all(materialQueries);

      res.json({ message: "Ponto de coleta adicionado com sucesso!" });
  } catch (error) {
      console.error("Erro ao adicionar ponto de coleta:", error);
      res.status(500).json({ error: "Erro ao adicionar ponto de coleta" });
  }
});


// app.post("/adicionar-ponto", async (req, res) => {
//   const { endereco, cep, cidade, estado, latitude, longitude, materiais } = req.body;

//   try {
//       //const connection = await db.getConnection();

//       // Insere o novo ponto de coleta no banco com status TRUE
//       const [result] = await bd.execute(
//           `INSERT INTO Ponto_coleta (endereco, cep, cidade, estado, latitude, longitude, status_ponto) VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
//           [endereco, cep, cidade, estado, latitude, longitude]
//       );

//       const pontoColetaId = result.insertId;

//       // Insere os tipos de materiais aceitos pelo ponto de coleta
//       const materialQueries = materiais.map((materialNome) => {
//           return bd.execute(
//               `INSERT INTO PontoColeta_TipoMaterial (fk_id_pontoColeta, fk_id_tipoMaterial) 
//                SELECT ?, id_tipoMaterial FROM Tipo_material WHERE nome_tipoMaterial = ?`,
//               [pontoColetaId, materialNome]
//           );
//       });

//       await Promise.all(materialQueries);

//       res.json({ message: "Ponto de coleta adicionado com sucesso!" });
//   } catch (error) {
//       console.error("Erro ao adicionar ponto de coleta:", error);
//       res.status(500).json({ error: "Erro ao adicionar ponto de coleta" });
//   }
// });

// Endpoint para buscar empresas pendentes de validação
app.get("/empresas-pendentes", async (req, res) => {
  try {
      const [rows] = await bd.execute(`
          SELECT id_usuario, email, nome_org, CNPJ, telefone, descricao, tipo_servico, tipo_transacao, endereco, cep, cidade, estado 
          FROM Usuario
          WHERE status_usuario = FALSE AND fk_id_categoria = 1
      `);
      res.json(rows);
  } catch (error) {
      console.error("Erro ao buscar empresas pendentes:", error);
      res.status(500).json({ error: "Erro ao buscar empresas pendentes" });
  }
});

// Endpoint para validar uma empresa (atualizar status e adicionar coordenadas)
app.put("/validar-empresa/:id", async (req, res) => {
  const { id } = req.params;
  const { endereco, cep, cidade, estado, latitude, longitude } = req.body;

  try {
      await bd.execute(
          `UPDATE Usuario SET 
              endereco = ?, 
              cep = ?, 
              cidade = ?, 
              estado = ?, 
              latitude = ?, 
              longitude = ?, 
              status_usuario = TRUE 
           WHERE id_usuario = ?`,
          [endereco, cep, cidade, estado, latitude, longitude, id]
      );
      res.json({ message: "Empresa validada e endereço atualizado com sucesso!" });
  } catch (error) {
      console.error("Erro ao validar empresa:", error);
      res.status(500).json({ error: "Erro ao validar empresa" });
  }
});

// Endpoint para buscar ONGs pendentes de validação
app.get("/ongs-pendentes", async (req, res) => {
  try {
      const [rows] = await bd.execute(`
          SELECT id_usuario, email, nome_org, CNPJ, telefone, descricao, tipo_servico, tipo_transacao, endereco, cep, cidade, estado 
          FROM Usuario
          WHERE status_usuario = FALSE AND fk_id_categoria = 2
      `);
      res.json(rows);
  } catch (error) {
      console.error("Erro ao buscar ONGs pendentes:", error);
      res.status(500).json({ error: "Erro ao buscar ONGs pendentes" });
  }
});

// Endpoint para validar uma ONG (atualizar status e adicionar coordenadas)
app.put("/validar-ong/:id", async (req, res) => {
  const { id } = req.params;
  const { endereco, cep, cidade, estado, latitude, longitude } = req.body;

  try {
      await bd.execute(
          `UPDATE Usuario SET 
              endereco = ?, 
              cep = ?, 
              cidade = ?, 
              estado = ?, 
              latitude = ?, 
              longitude = ?, 
              status_usuario = TRUE 
           WHERE id_usuario = ?`,
          [endereco, cep, cidade, estado, latitude, longitude, id]
      );
      res.json({ message: "ONG validada com sucesso e endereço atualizado!" });
  } catch (error) {
      console.error("Erro ao validar ONG:", error);
      res.status(500).json({ error: "Erro ao validar ONG" });
  }
});

// Resto do código
app.post("/cadastrar", async (req, res) => {
  const {
      email,
      senha,
      nome_org,
      CNPJ,
      telefone,
      descricao,
      tipo_servico,
      endereco,
      cep,
      cidade,
      estado,
      fk_id_categoria,
      materiais,
      tipo_transacao,
      status_usuario,
  } = req.body;

  try {
      const hashedPassword = await bcrypt.hash(senha, 10); // Hash da senha
      // Insere o usuário na tabela Usuario
      const [result] = await bd.execute(
          `INSERT INTO Usuario (email, senha, nome_org, CNPJ, telefone, descricao, tipo_servico, endereco, cep, cidade, estado, fk_id_categoria, tipo_transacao, status_usuario) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [email, hashedPassword, nome_org, CNPJ, telefone, descricao, tipo_servico, endereco, cep, cidade, estado, fk_id_categoria, tipo_transacao, status_usuario]
      );

      const usuarioId = result.insertId;

      // Insere os tipos de materiais aceitos pelo usuário na tabela Usuario_tipoMaterial
      const materialQueries = materiais.map((materialNome) => {
          return bd.execute(
              `INSERT INTO Usuario_tipoMaterial (fk_id_usuario, fk_id_tipoMaterial) 
               SELECT ?, id_tipoMaterial FROM Tipo_material WHERE nome_tipoMaterial = ?`,
              [usuarioId, materialNome]
          );
      });

      await Promise.all(materialQueries);

      res.json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

app.listen(8001, () => {
  console.log("Connected to backend!");
});

///////////////////////////////////////////////////////////

app.get("/perfil", authenticateToken, async (req, res) => {
  try {
      const userId = req.user.id; // Agora `req.user` deve estar definido
      const [rows] = await bd.execute(`SELECT * FROM Usuario WHERE id_usuario = ?`, [userId]);
      res.json(rows[0]);
  } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      res.status(500).json({ error: "Erro ao buscar perfil" });
  }
});

app.put("/atualizar-perfil", authenticateToken, async (req, res) => {
  try {
      const userId = req.user.id;
      const { email, senha, nome_org, CNPJ, telefone, descricao, tipo_servico, endereco, cep, cidade, estado, materiais } = req.body;
      
      const hashedPassword = senha ? await bcrypt.hash(senha, 10) : null;

      await bd.execute(
          `UPDATE Usuario SET 
              email = ?, 
              ${hashedPassword ? "senha = ?," : ""}
              nome_org = ?, 
              CNPJ = ?, 
              telefone = ?, 
              descricao = ?, 
              tipo_servico = ?, 
              endereco = ?, 
              cep = ?, 
              cidade = ?, 
              estado = ?, 
              status_usuario = FALSE 
          WHERE id_usuario = ?`,
          [
              email,
              ...(hashedPassword ? [hashedPassword] : []),
              nome_org,
              CNPJ,
              telefone,
              descricao,
              tipo_servico,
              endereco,
              cep,
              cidade,
              estado,
              userId,
          ]
      );

      await bd.execute(`DELETE FROM Usuario_tipoMaterial WHERE fk_id_usuario = ?`, [userId]);
      const materialQueries = materiais.map((materialNome) =>
          bd.execute(
              `INSERT INTO Usuario_tipoMaterial (fk_id_usuario, fk_id_tipoMaterial) 
               SELECT ?, id_tipoMaterial FROM Tipo_material WHERE nome_tipoMaterial = ?`,
              [userId, materialNome]
          )
      );
      await Promise.all(materialQueries);

      res.json({ message: "Perfil atualizado com sucesso!" });
  } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
});

app.delete("/excluir-conta", authenticateToken, async (req, res) => {
  try {
      const userId = req.user.id;
      await bd.execute(`DELETE FROM Usuario WHERE id_usuario = ?`, [userId]);
      res.json({ message: "Conta excluída com sucesso!" });
  } catch (error) {
      console.error("Erro ao excluir conta:", error);
      res.status(500).json({ error: "Erro ao excluir conta" });
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
      const [users] = await bd.execute("SELECT * FROM Usuario WHERE email = ?", [email]);
      const user = users[0];

      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) return res.status(401).json({ error: "Senha incorreta" });

      const token = jwt.sign({ id: user.id_usuario }, process.env.SECRET_KEY, { expiresIn: "1h" });
      res.json({ token });
  } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ error: "Erro ao fazer login" });
  }
});