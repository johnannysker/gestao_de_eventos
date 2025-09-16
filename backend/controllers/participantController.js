const Participant = require("../models/Participant.js")
const Event = require("../models/Event.js")
const mongoose = require('mongoose');

// Criar um participante
const createParticipant = async (req, res) => {
  try {
    const { name, email } = req.body;

    const existingParticipant = await Participant.findOne({ email });
    if (existingParticipant) return res.status(400).json({ error: "E-mail já cadastrado" });

    const participant = new Participant({ name, email });
    await participant.save();

    res.status(201).json(participant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos os participantes
const getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


// Buscar participante por ID
const getParticipantById = async (req, res) => {
  try {

    const { id } = req.params;
    
    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }
    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


// Registrar um participante em um evento
const registerParticipant = async (req, res) => {
  try {

    const { id } = req.params;
    
    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { eventId } = req.body;
    const participant = await Participant.findById(req.params.id);
    const event = await Event.findById(eventId);

    if (!participant || !event) {
      return res.status(404).json({ error: "Participante ou evento não encontrado" });
    }

    // Adiciona o evento à lista do participante
    if (!event.participants.includes(participant._id)) {
      event.participants.push(participant._id);
      await event.save();
    }

    res.status(200).json({ message: "Inscrição realizada com sucesso", participant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Atualizar um participante
const updateParticipant = async (req, res) => {
  try {

    const { id } = req.params;
    
    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { name, email } = req.body;
    const participant = await Participant.findByIdAndUpdate(req.params.id, { name, email }, { new: true });

    if (!participant) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }

    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


// Deletar um participante
const deleteParticipant = async (req, res) => {
  try {

    const { id } = req.params;
    
    // Verificar se o ID tem o formato correto de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const participant = await Participant.findByIdAndDelete(req.params.id);
    if (!participant) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }

    res.status(200).json({ message: "Participante deletado com sucesso" });
    return true;
    
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};


module.exports = { createParticipant, getParticipants, getParticipantById, registerParticipant, updateParticipant, deleteParticipant };