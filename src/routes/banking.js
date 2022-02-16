var express = require("express");
const BankingModel = require("../models/bankingModel");
var router = express.Router();
const db = require("../models/database");

var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

/* GET home page. */

//Crear lista de bancos
// const listaBancos = async (req, res) => {
//   return bancos;
// };

router.get("/", async function (req, res, next) {
  

  var session = JSON.parse(localStorage.getItem('userSession'));
  console.log("session ",session);
  console.log("session id ",session.id);
  const bancos = await db.query("CALL usp_banco_listar()");
  const cuentas = await db.query(`CALL usp_cuentabancaria_buscarporusuario(${session.id})`);

  
    const data = {
    title: "Inicio - DotCom Money Exchange",
    bancos: bancos[0],
    cuentas: cuentas[0],
  };
  res.render("banking", { data: data });
  
});

// router.get("/getCuentas/:id", async function (req, res, next) {
  
//   let id=req.params.id;
//   console.log(id);
//     // console.log(cuentas[0]);
//     const data = {
//     title: "Inicio - DotCom Money Exchange",
  
//   };

// });

router.post("/save", async function(req, res, next) {
  var data = await req.body;
  var item = data.item;

  // item.operationDate = new Date(Date.now());
  item.usuario = 3;

  console.log(item, "item");

  var bankingModel = new BankingModel();

  var result = await bankingModel.Save(item);
  if (result != null && res.statusCode == 200) {
    //return body;
    res.success = true;
    console.log(res, "res");
  }
  else{
    console.log(error, "error");
    res.send({
      messagge: "Ocurrio un error al guardar",
      success: false
    });  
  }

  res.send(result);
  
})
router.post("/delete", async function(req, res, next) {
  var data = await req.body;
  var item = data.item;
  

  console.log(item, "item");

  var bankingModel = new BankingModel();

  var result = await bankingModel.Delete(item);
  if (result != null && res.statusCode == 200) {
    //return body;
    res.success = true;
    console.log(res, "res");
  }
  else{
    console.log(error, "error");
    res.send({
      messagge: "Ocurrio un error al eliminar",
      success: false
    });  
  }

  res.send(result);
})
   

module.exports = router;
