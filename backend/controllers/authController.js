const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Organizer = require('../models/Organizer.js');
require('dotenv').config();

const secret = process.env.JWT_SECRET; 

const register = async (req, res) => {
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let organizer = await Organizer.findOne({ email });
        if (!organizer) return res.status(401).json({ error: 'Email ou senha incorretos' });

        const isPasswordCorrect = await organizer.isCorrectPassword(password); 
        if (!isPasswordCorrect) return res.status(401).json({ error: 'Email ou senha incorretos' });

        const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
        res.json({ organizer, token });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    login, register
};


