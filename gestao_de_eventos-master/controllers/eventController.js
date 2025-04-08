const Event = require("../models/Event.js");
const Organizer = require("../models/Organizer.js");
const mongoose = require('mongoose');

// Criar um evento
const createEvent = async (req, res) => {
  try {

    const { title, description, organizerId } = req.body;

    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(organizerId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const organizer = await Organizer.findById(organizerId);
    if (!organizer) return res.status(404).json({ error: "Organizador não encontrado" });

    const event = new Event({ title, description, organizer: organizerId, participants: [], });
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos os eventos
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "name email")
    .populate("participants", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


// Buscar evento por ID
const getEventById = async (req, res) => {
  try {

    const { id } = req.params;

    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const event = await Event.findById(req.params.id).populate("organizer", "name email");
    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


// Atualizar um evento
const updateEvent = async (req, res) => {
  try {

    const { id } = req.params;

    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { title, description } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


// Deletar um evento
const deleteEvent = async (req, res) => {
  try {

    const { id } = req.params;

    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.status(200).json({ message: "Evento deletado com sucesso" });
    return true;

  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


module.exports = { createEvent, getEvents, getEventById, updateEvent, deleteEvent };