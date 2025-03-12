import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) throw new Error("Não autorizado.");

  const token = authHeader.split("Bearer ")[1];
  if (!token) throw new Error("Token inválido.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Token expirado ou inválido.");
  }
};

export default authMiddleware;