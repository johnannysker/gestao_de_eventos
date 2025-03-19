import express from "express";
import { getOrganizers, getOrganizerById, createOrganizer, updateOrganizer, deleteOrganizer } from "../controllers/organizerController.js";

const router = express.Router();

router.get("/", getOrganizers); 
router.get("/:id", getOrganizerById); 
router.post("/", createOrganizer); 
router.put("/:id", updateOrganizer); 
router.delete("/:id", deleteOrganizer); 

export default router;