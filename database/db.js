import mongoose from "mongoose";

const conectandoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB conectado!");
  } catch (error) {
    console.error(" Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};

export default conectandoDB;