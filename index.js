import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Event from './models/Event.js';
import Organizer from './models/Organizer.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import authMiddleware from './authMiddleware.js';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log(' MongoDB conectado'))
  .catch(err => console.log(' Erro ao conectar ao MongoDB:', err));

// Definição básica do GraphQL
const typeDefs = ` 
  type Organizer {
    id: ID!
    name: String!
    email: String!
    profile: Profile
  }
  
  type Profile {
    bio: String
    avatar: String
  }
  
  type Event {
    id: ID!
    title: String!
    description: String
    organizer: Organizer
    speakers: [Talk]
    participants: [Participant]
  }
  
  type Talk {
    id: ID!
    title: String!
    event: Event
    speaker: String
  }
  
  type Participant {
    id: ID!
    name: String!
    email: String!
    registeredEvents: [Event]
  }
  
  type Query {
    events: [Event]
    event(id: ID!): Event
    organizers: [Organizer]
    organizer(id: ID!): Organizer
  }
  
   # Payload do login, retornando o token e os dados do organizador
  type AuthPayload {
    token: String!
    organizer: Organizer!
  }
  
  type Mutation {
    createEvent(title: String!, description: String!, organizerId: ID!): Event
    createOrganizer(name: String!, email: String!, password: String!): Organizer
    
    # Mutation para login
    loginOrganizer(email: String!, password: String!): AuthPayload
  }
`;

const resolvers = {
  Query: {
    events: async () => await Event.find().populate("organizer"),
    event: async (_, { id }) => await Event.findById(id).populate("organizer"),
    organizers: async () => await Organizer.find(),
    organizer: async (_, { id }) => await Organizer.findById(id),
  },

  Mutation: {
    // Cria o evento
    createEvent: async (_, { title, description, organizerId }, context) => {
      // Aplicando autenticação corretamente
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

    // Cria o organizador
    createOrganizer: async (_, { name, email, password }) => {
      try {
        const existingOrganizer = await Organizer.findOne({ email });
        if (existingOrganizer) throw new Error("Este e-mail já está cadastrado.");

        const hashedPassword = await bcrypt.hash(password.trim(), 10);
        
        const organizer = new Organizer({ name, email, password: hashedPassword });
       
        await organizer.save();
        console.log("Organizador criado!");
        return organizer;

      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Login
    loginOrganizer: async (_, { email, password }) => {
      const testPasswordHash = async (plainPassword, hashedPassword) => {
        const isValid = await bcrypt.compare(plainPassword, hashedPassword);
        return isValid;
      };

      try {
        const organizer = await Organizer.findOne({ email });
    
        console.log(" Inicio do Login:");
        if (!organizer) throw new Error("Organizador não encontrado.");
    
        console.log(" Email Digitado:", email);    
        console.log(" Senha Digitada:", password);    
        const isMatch = await testPasswordHash(password.trim(), organizer.password.trim());
    
        if (!isMatch) throw new Error("Senha incorreta.");
    
        // Criar o token JWT
        const token = jwt.sign(
          { id: organizer.id, email: organizer.email },
          process.env.JWT_SECRET, // Pegando do .env
          { expiresIn: "1h" }
        );
    
        return { token, organizer };
      } catch (error) {
        console.error(" Erro no Login:", error.message);
        throw new Error(error.message);
      }
    }
  }
};

// Configuração do Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('🚀 Servidor rodando em http://localhost:4000/graphql');
  });
});