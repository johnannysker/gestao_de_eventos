import Organizer from "../models/Organizer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Criar um organizador
export const createOrganizer = async (req, res) => {
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
export const getOrganizers = async (req, res) => {
  const organizers = await Organizer.find();
  res.json(organizers);
};

// Buscar organizador por ID
export const getOrganizerById = async (req, res) => {
  const organizer = await Organizer.findById(req.params.id);
  if (!organizer) return res.status(404).json({ error: "Organizador não encontrado" });
  res.json(organizer);
};

// Atualizar um organizador
export const updateOrganizer = async (req, res) => {
  const { name, email } = req.body;
  const organizer = await Organizer.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
  if (!organizer) return res.status(404).json({ error: "Organizador não encontrado" });
  res.json(organizer);
};

// Deletar um organizador
export const deleteOrganizer = async (req, res) => {
  const organizer = await Organizer.findByIdAndDelete(req.params.id);
  if (!organizer) return res.status(404).json({ error: "Organizador não encontrado" });
  res.json({ message: "Organizador deletado com sucesso" });
};