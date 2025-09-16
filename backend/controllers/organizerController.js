const bcrypt = require("bcrypt");
const Organizer = require("../models/Organizer.js");
const mongoose = require("mongoose");

// Criar um organizador
const createOrganizer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingOrganizer = await Organizer.findOne({ email });
    if (existingOrganizer) return res.status(400).json({ error: "E-mail já cadastrado" });


    const hashedPassword = await bcrypt.hash(password, 10);
    const organizer = new Organizer({ name, email, password: hashedPassword });
    await organizer.save();

    res.status(201).json(organizer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos os organizadores
const getOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find();
    res.status(200).json(organizers);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


// Buscar organizador por ID
const getOrganizerById = async (req, res) => {
  try {

    const { id } = req.params;

    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const organizer = await Organizer.findById(req.params.id);
    if (!organizer) {
      return res.status(404).json({ error: "Organizador não encontrado" });
    }
    res.status(200).json(organizer);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


// Atualizar um organizador
const updateOrganizer = async (req, res) => {
  try {

    const { id } = req.params;

    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { name, email } = req.body;
    const organizer = await Organizer.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
    if (!organizer) {
      return res.status(404).json({ error: "Organizador não encontrado" });
    }
    res.status(200).json(organizer);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


// Deletar um organizador
const deleteOrganizer = async (req, res) => {
  try {

    const { id } = req.params;

    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const organizer = await Organizer.findByIdAndDelete(req.params.id);
    if (!organizer) {
      return res.status(404).json({ error: "Organizador não encontrado" });
    }

    res.status(200).json({ message: "Organizador deletado com sucesso" });
    return true;
    
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

module.exports = { createOrganizer, getOrganizers, getOrganizerById, updateOrganizer, deleteOrganizer };
