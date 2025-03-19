import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
import conectandoDB from "./config/db.js";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import organizerRoutes from "./routes/organizerRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import participantRoutes from "./routes/participantRoutes.js";

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao MongoDB
conectandoDB();

// Inicializar o servidor Express
const app = express();
app.use(cors());
app.use(express.json());

// Rotas RESTful
app.use("/api/organizers", organizerRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/participants", participantRoutes);

// Configuração do Apollo Server (GraphQL)
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(" Servidor rodando:");
    console.log(" API REST: http://localhost:4000/api");
    console.log(" GraphQL Playground: http://localhost:4000/graphql");
  });
});