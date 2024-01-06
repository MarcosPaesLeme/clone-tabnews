import database from "../../../../infra/database";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1");
  console.log(result);
  return response.status(200).json({ chave: "tocando no HTTP" });
}

export default status;
