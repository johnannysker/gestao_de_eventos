const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const resolvers = require("./resolvers/OrganizerResolver.js");
const { typeDefs } = require("./schemas/OrganizerSchema.js");
const loginRouter = require("./routes/authRoutes.js");
const organizerRoutes = require("./routes/organizerRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");
const participantRoutes = require("./routes/participantRoutes.js");
const { ApolloServer } = require('apollo-server-express');

const conectandoDB = require("./database/db.js");

// Inicializar o servidor Express
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 

// Rotas RESTful
app.use("/api", loginRouter);
app.use("/api", organizerRoutes);
app.use("/api", eventRoutes);
app.use("/api", participantRoutes);

//Função para inicializar o Apollo Server
const startServer = async () => {
  // Inicia o Apollo Server
  await server.start();

  // Aplica o middleware do Apollo Server no Express
  server.applyMiddleware({ app });

  const port = 4000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
};

