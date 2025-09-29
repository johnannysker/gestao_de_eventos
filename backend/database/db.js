const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Carrega as variáveis do .env

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("✅ Conectado ao MongoDB Atlas");
      })
      .catch((err) => {
        console.error("❌ Erro ao conectar no MongoDB Atlas:", err.message);
      });
  }
}

module.exports = new Database();

