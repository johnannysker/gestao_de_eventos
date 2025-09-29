const WithAuth = require('../middleware/authMiddleware.js');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Event = require("../models/Event.js")
const Organizer = require("../models/Organizer.js")
const organizerControllerGraphQL = require('../controllers/organizerControllerGraphQL.js');

const resolvers = {
  Query: {
    organizers: async () => await organizerControllerGraphQL.getOrganizers(),
    organizer: async (_, { id }) => await organizerControllerGraphQL.getOrganizerById(id),
  },

  Mutation: {
    createOrganizer: async (_, { name, email, password }) => {
      const existingOrganizer = await Organizer.findOne({ email });
      if (existingOrganizer) throw new Error("Este e-mail já está cadastrado.");

      const hashedPassword = await bcrypt.hash(password.trim(), 10);
      const organizer = new Organizer({ name, email, password: hashedPassword });

      await organizer.save();
      return organizer;
    },

    updateOrganizer: async (_, { id, name, email }) => {
      return await organizerControllerGraphQL.updateOrganizer(id, name, email); 
    },

    deleteOrganizer: async (_, { id }) => {
      return await organizerControllerGraphQL.deleteOrganizer(id); 
    },

  }
};

module.exports = resolvers;