import Participant from "../models/Participant.js";
import Event from "../models/Event.js";

// Criar um participante
export const createParticipant = async (req, res) => {
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
export const getParticipants = async (req, res) => {
  const participants = await Participant.find();
  res.json(participants);
};

// Buscar participante por ID
export const getParticipantById = async (req, res) => {
  const participant = await Participant.findById(req.params.id);
  if (!participant) return res.status(404).json({ error: "Participante não encontrado" });
  res.json(participant);
};

// Registrar um participante em um evento
export const registerParticipant = async (req, res) => {
  try {
    const { eventId } = req.body;
    const participant = await Participant.findById(req.params.id);
    const event = await Event.findById(eventId);

    if (!participant || !event) return res.status(404).json({ error: "Participante ou evento não encontrado" });

    // Adiciona o evento à lista do participante
    participant.registeredEvents.push(eventId);
    await participant.save();

    res.json({ message: "Inscrição realizada com sucesso", participant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um participante
export const updateParticipant = async (req, res) => {
  const { name, email } = req.body;
  const participant = await Participant.findByIdAndUpdate(req.params.id, { name, email }, { new: true });

  if (!participant) return res.status(404).json({ error: "Participante não encontrado" });
  res.json(participant);
};

// Deletar um participante
export const deleteParticipant = async (req, res) => {
  const participant = await Participant.findByIdAndDelete(req.params.id);
  if (!participant) return res.status(404).json({ error: "Participante não encontrado" });
  res.json({ message: "Participante deletado com sucesso" });
};