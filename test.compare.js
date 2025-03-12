import bcrypt from "bcrypt";

const testHash = async () => {
  const senhaTeste = "123456";
  const hashTeste = await bcrypt.hash(senhaTeste, 10);

  console.log("🔹 Hash de Teste:", hashTeste);

  const resultado = await bcrypt.compare(senhaTeste, hashTeste);
  console.log("🔹 bcrypt.compare() de teste:", resultado);
};

testHash();