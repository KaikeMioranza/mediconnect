const mysql = require('mysql2/promise');

class connectDB {
  // Método para estabelecer a conexão com o banco de dados
  static async conectar() {
    try {
      const connection = await mysql.createConnection({
        host: process.env.host,
        user: 'root',
        password: 'masterkey',
        database: 'medic'
      });

      console.log('Conexão com o MySQL estabelecida com sucesso!');
      return connection; // Retorna a instância de conexão para uso posterior
    } catch (err) {
      console.error('Erro ao conectar ao MySQL:', err);
      throw err; // Lança o erro para ser tratado externamente
    }
  }
}

module.exports = connectDB;
