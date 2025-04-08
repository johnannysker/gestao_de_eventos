const express = require("express");
const router = express.Router();
const organizerController = require("../controllers/organizerController.js");
const WithAuth = require('../middleware/authMiddleware');

router.get("/organizers", organizerController.getOrganizers); 
router.get("/organizer/:id", organizerController.getOrganizerById); 
router.post("/organizer", WithAuth, organizerController.createOrganizer); 
router.put("/organizer/:id", WithAuth, organizerController.updateOrganizer); 
router.delete("/organizer/:id", WithAuth, organizerController.deleteOrganizer); 

module.exports = router;