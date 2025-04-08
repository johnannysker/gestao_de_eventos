const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

//rotas de login e registro
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;


