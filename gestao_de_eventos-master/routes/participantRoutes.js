const express = require("express");
const router = express.Router();
const participantController = require("../controllers/participantController.js");
const WithAuth = require('../middleware/authMiddleware');

router.get("/participants", participantController.getParticipants);
router.get("/participant/:id", participantController.getParticipantById);
router.post("/participant", WithAuth, participantController.createParticipant);
router.post("/participants/:id/register", WithAuth, participantController.registerParticipant);
router.put("/participant/:id", WithAuth, participantController.updateParticipant);
router.delete("/participant/:id", WithAuth, participantController.deleteParticipant);

module.exports = router;