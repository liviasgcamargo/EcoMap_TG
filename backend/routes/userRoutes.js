// backend/routes/userRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import db from "../db.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

// Obter perfil do usuário, incluindo materiais aceitos
router.get("/perfil", authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const [userRows] = await db.execute("SELECT * FROM Usuario WHERE id_usuario = ?", [userId]);

        // Verificar se o usuário existe
        if (userRows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const user = userRows[0];

        // Obter materiais do usuário
        const [materialRows] = await db.execute(
            `SELECT tm.nome_tipoMaterial 
             FROM Usuario_tipoMaterial AS utm
             JOIN Tipo_material AS tm ON utm.fk_id_tipoMaterial = tm.id_tipoMaterial
             WHERE utm.fk_id_usuario = ?`, 
             [userId]
        );

        // Adicionar materiais ao objeto de usuário
        user.materiais = materialRows.map(row => row.nome_tipoMaterial);

        res.json(user);
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

        if (materiais.length > 0) {
            const materialQueries = materiais.map((materialNome) =>
                db.execute(
                    `INSERT INTO Usuario_tipoMaterial (fk_id_usuario, fk_id_tipoMaterial) 
                     SELECT ?, id_tipoMaterial FROM Tipo_material WHERE nome_tipoMaterial = ?`,
                    [userId, materialNome]
                )
            );
            await Promise.all(materialQueries);
        }

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
