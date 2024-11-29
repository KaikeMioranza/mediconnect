const { QueryTypes } = require('sequelize')
const ConnectionDB = require('../Database/connectionDB')

class datesPacientes{
    static async dates(req, res) {
        const connectDB = await ConnectionDB.conectar()
        const response = await connectDB.query(
            `
                SELECT
                    *
                FROM
                    cadastroteste
            `,
            {
                type: QueryTypes.SELECT
            }
        )
        dados = response.json()
        if(dados.lenght != ''){
            return res.status(200).json(dados)
        }else{
            return res.status(404).json({message: 'Não foi encontrado nenhum resultado.'})
        }
    }
}
module.exports = datesPacientes;