// importar al modulo de la base de datos
const db = require("../database");

//Crear lista de bancos
const listaBancos = async (req, res) => {
  const bancos = await db.query("CALL usp_banco_listar()");
  // console.log(bancos);
  return bancos;
};

module.exports = { listaBancos };
