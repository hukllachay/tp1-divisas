var express = require("express");
var router = express.Router();
// importar modulo banking

/* GET home page. */
const db = require("../database");

//Crear lista de bancos
// const listaBancos = async (req, res) => {
//   return bancos;
// };

router.get("/", async function (req, res, next) {
  
  const bancos = await db.query("CALL usp_banco_listar()");
    console.log(bancos[0]);
    let id = 3;
  const cuentas = await db.query(`CALL usp_cuentabancaria_buscarporusuario(${id})`);
    console.log(cuentas[0]);
    const data = {
    title: "Inicio - DotCom Money Exchange",
    bancos: bancos[0],
    cuentas: cuentas[0],
  };
  res.render("banking", { data: data });
});

router.post("/save", function(req, res, next) {
  console.log("Goooood");
  res.send('');
  res.end();
  
});

module.exports = router;
