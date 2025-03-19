const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js");
const WithAuth = require('../middleware/authMiddleware');

router.get("/events", eventController.getEvents);
router.get("/event/:id", eventController.getEventById);
router.post("/event", WithAuth,eventController.createEvent);
router.put("/events/:id", WithAuth,eventController.updateEvent);
router.delete("/events/:id", WithAuth,eventController.deleteEvent);

module.exports = router;