const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Método para comparar a senha fornecida com a senha armazenada
organizerSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Organizer", organizerSchema);