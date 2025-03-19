import Event from "../models/Event.js";
import Organizer from "../models/Organizer.js";

// Criar um evento
export const createEvent = async (req, res) => {
  try {
    const { title, description, organizerId } = req.body;

    const organizer = await Organizer.findById(organizerId);
    if (!organizer) return res.status(404).json({ error: "Organizador não encontrado" });

    const event = new Event({ title, description, organizer: organizerId });
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos os eventos
export const getEvents = async (req, res) => {
  const events = await Event.find().populate("organizer", "name email");
  res.json(events);
};

// Buscar evento por ID
export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate("organizer", "name email");
  if (!event) return res.status(404).json({ error: "Evento não encontrado" });
  res.json(event);
};

// Atualizar um evento
export const updateEvent = async (req, res) => {
  const { title, description } = req.body;
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true }
  );

  if (!event) return res.status(404).json({ error: "Evento não encontrado" });
  res.json(event);
};

// Deletar um evento
export const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ error: "Evento não encontrado" });
  res.json({ message: "Evento deletado com sucesso" });
};