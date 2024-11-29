const { QueryTypes } = require('sequelize');
const connectDB = require('../Database/connectionDB'); // Ajuste o caminho conforme necessário


class controllerCad {
   static async verifyCad(req, res) {
      
      try {
         if (!req.body.cpf) {
            return res.status(400).json({ error: 'CPF não fornecido no corpo da requisição' });
          }
         // Executar a consulta no banco de dados com o mysql2
         const connectionDB = await connectDB.conectar()
         const [rows] = await connectionDB.query(
            `SELECT 
               * 
            FROM 
               cadastroteste 
            WHERE 
               cpf = '${req.body.cpf}'`,
            {
               type: QueryTypes.SELECT
            }
         );
         // Verificar se o resultado foi encontrado
         if (rows.length > 0) {
            res.status(200).json("Paciente encontrado"); // Retorna os resultados encontrados
         } else {
            res.status(404).json({ message: 'Nenhum registro encontrado para o CPF fornecido.' });
         }

      } catch (error) {
         console.error('Erro ao verificar cadastro:', error.message);
         res.status(500).json({ error: 'Erro interno do servidor' });
      } 
      }
   }


module.exports = controllerCad;
