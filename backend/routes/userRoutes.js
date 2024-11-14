// backend/routes/userRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

// Obter perfil do usuário
router.get("/perfil", authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.execute("SELECT * FROM Usuario WHERE id_usuario = ?", [userId]);
        res.json(rows[0]);
    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        res.status(500).json({ error: "Erro ao buscar perfil" });
    }
});

// Atualizar perfil do usuário
router.put("/atualizar-perfil", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { email, senha, nome_org, CNPJ, telefone, descricao, tipo_servico, endereco, cep, cidade, estado, materiais } = req.body;

    try {
        const hashedPassword = senha ? await bcrypt.hash(senha, 10) : null;

        await db.execute(
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

        // Verifique se 'materiais' está definido e é um array
        if (!Array.isArray(materiais)) {
            return res.status(400).json({ error: "Materiais deve ser um array." });
        }

        // Remover materiais antigos e inserir novos materiais
        await db.execute(`DELETE FROM Usuario_tipoMaterial WHERE fk_id_usuario = ?`, [userId]);
        const materialQueries = materiais.map((materialNome) =>
            db.execute(
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

// Excluir conta do usuário
router.delete("/excluir-conta", authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        await db.execute("DELETE FROM Usuario WHERE id_usuario = ?", [userId]);
        res.json({ message: "Conta excluída com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir conta:", error);
        res.status(500).json({ error: "Erro ao excluir conta" });
    }
});

export default router;
