var express = require("express");
const BankingModel = require("../models/bankingModel");
var router = express.Router();
// importar modulo banking

/* GET home page. */
const db = require("../models/database");

//Crear lista de bancos
// const listaBancos = async (req, res) => {
//   return bancos;
// };

router.get("/", async function (req, res, next) {
  
  const bancos = await db.query("CALL usp_banco_listar()");
 
    const data = {
    title: "Inicio - DotCom Money Exchange",
    bancos: bancos[0],
  };
  res.render("banking", { data: data });
});

router.get("/getCuentas/:id", async function (req, res, next) {
  
  let id=req.params.id;
     console.log("---->",id);
  const cuentas = await db.query(`CALL usp_cuentabancaria_buscarporusuario(${id})`);
    // console.log(cuentas[0]);
    const data = {
    title: "Inicio - DotCom Money Exchange",
  
    cuentas: cuentas[0],
  };
  if(cuentas){
    res.success = true;
    
  }
});

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
