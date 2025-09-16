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

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 

// Rotas RESTful
app.use("/api", loginRouter);
app.use("/api", organizerRoutes);
app.use("/api", eventRoutes);
app.use("/api", participantRoutes);



const port = 3000;
app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
