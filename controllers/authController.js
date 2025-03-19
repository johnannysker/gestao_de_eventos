const jwt = require('jsonwebtoken');
const Organizer = require('../models/Organizer.js');
require('dotenv').config();

const secret = process.env.JWT_SECRET; 

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const Organizer = new Organizer({ name, email, password });

    try {
        await Organizer.save();
        res.status(200).json(Organizer);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar organizador' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let Organizer = await Organizer.findOne({ email });
        if (!Organizer) return res.status(401).json({ error: 'Email ou senha incorretos' });

        Organizer.isCorrectPassword(password, (err, same) => {
            if (!same) return res.status(401).json({ error: 'Email ou senha incorretos' });

            const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
            res.json({ Organizer, token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

module.exports = {
    login, register
};


