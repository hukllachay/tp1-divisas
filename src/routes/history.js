var express = require('express');
var router = express.Router();
var OperationService = require('../service/operationService.js');
const db = require("../models/database");

/* GET home page. */
router.get('/', async function(req, res, next) {

  let usId = 1;
    //const resultadoDatos =  operationService.SearchByUser(usId);
    const operacionesdb = await db.query(`CALL usp_operaciones_listar(${usId})`);

  const data = {
    title:  'Cuentas - DotCom Money Exchange',
    error: 'sin error',
    vacio: 'SI',
    operaciones: operacionesdb[0]
  };

  try {    
    

    //data.cuentas = cuentas;
    //data.operaciones = operaciones[0];
    if(data.operaciones.length>0)
        data.vacio = 'NO';
  }
  catch(error)
  {
    data.error = error;
  }

  res.render('history', { data: data });
});


module.exports = router;
