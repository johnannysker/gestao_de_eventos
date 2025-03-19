import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Event from "../models/Event.js";
import Organizer from "../models/Organizer.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const resolvers = {
  Query: {
    events: async () => await Event.find().populate("organizer"),
    event: async (_, { id }) => await Event.findById(id).populate("organizer"),
    organizers: async () => await Organizer.find(),
    organizer: async (_, { id }) => await Organizer.findById(id),
  },

  Mutation: {
    createEvent: async (_, { title, description, organizerId }, context) => {
      const user = authMiddleware(context);
      if (!user) throw new Error("Acesso negado! Faça login.");

      try {
        const organizer = await Organizer.findById(organizerId);
        if (!organizer) throw new Error("Organizador não encontrado.");

        const event = new Event({ title, description, organizer: organizerId });
        await event.save();
        return await event.populate("organizer");
      } catch (error) {
        throw new Error(error.message);
      }
    },

    createOrganizer: async (_, { name, email, password }) => {
      const existingOrganizer = await Organizer.findOne({ email });
      if (existingOrganizer) throw new Error("Este e-mail já está cadastrado.");

      const hashedPassword = await bcrypt.hash(password.trim(), 10);
      const organizer = new Organizer({ name, email, password: hashedPassword });

      await organizer.save();
      return organizer;
    },

    loginOrganizer: async (_, { email, password }) => {
      const organizer = await Organizer.findOne({ email });
      if (!organizer) throw new Error("Organizador não encontrado.");

      const isMatch = await bcrypt.compare(password.trim(), organizer.password.trim());
      if (!isMatch) throw new Error("Senha incorreta.");

      const token = jwt.sign(
        { id: organizer.id, email: organizer.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { token, organizer };
    }
  }
};

export default resolvers;