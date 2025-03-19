import express from "express";
import { getOrganizers, getOrganizerById, createOrganizer, updateOrganizer, deleteOrganizer } from "../controllers/organizerController.js";

const router = express.Router();

router.get("/", getOrganizers); // Buscar todos os organizadores
router.get("/:id", getOrganizerById); // Buscar um organizador por ID
router.post("/", createOrganizer); // Criar um novo organizador
router.put("/:id", updateOrganizer); // Atualizar um organizador
router.delete("/:id", deleteOrganizer); // Remover um organizador

export default router;