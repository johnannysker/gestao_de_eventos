const bcrypt = require("bcrypt");
const Organizer = require("../models/Organizer.js");
const mongoose = require("mongoose");

// Criar um organizador
const createOrganizer = async (name, email, password) => {

    const hashedPassword = await bcrypt.hash(password, 10);
    const organizer = new Organizer({
        name,
        email,
        password: hashedPassword
    });

    await organizer.save();

    return organizer;

};

// Listar todos os organizadores
const getOrganizers = async () => {
    return await Organizer.find();

};

// Buscar organizador por ID
const getOrganizerById = async (id) => {
    try{

        const organizer = await Organizer.findById(id);
        if (!organizer) {
            throw new Error("Organizador não encontrado" );
        }

        return organizer;

    }catch(error){
        throw new Error("Erro ao pesquisar organizer");
    }
};


// Atualizar um organizador
const updateOrganizer = async (id, name, email) => {
  try {

    const organizer = await Organizer.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!organizer) {
        throw new Error("Organizador não encontrado" );
    }
    return organizer;
  } catch (error) {
    throw new Error("Erro ao atualizar organizer");
  }
};


// Deletar um organizador
const deleteOrganizer = async (id) => {
  try {

    const organizer = await Organizer.findByIdAndDelete(id);
    if (!organizer) {
        throw new Error("Organizador não encontrado" );
    }
    return true;
    
  } catch (error) {
    throw new Error("Erro ao deletar organizer" );
  }
};

module.exports = { createOrganizer, getOrganizers, getOrganizerById, updateOrganizer, deleteOrganizer };
