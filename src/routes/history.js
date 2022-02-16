var express = require('express');
var router = express.Router();
var OperationService = require('../service/operationService.js');
const db = require("../models/database");

var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
var session = JSON.parse(localStorage.getItem('userSession'));
var userId = session == null ? null : session.id;

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("xxxxxxx");
  console.log(session);
  if (session == null) {
    console.log("Usuario no logueado");
    res.redirect(301, 'http://localhost:8082/login');
    res.send(null);
  }
    //let usId = 1;
    //const resultadoDatos =  operationService.SearchByUser(usId);
    const operacionesdb = await db.query(`CALL usp_operaciones_listar(${userId})`);

  const data = {
    title:  'Cuentas - DotCom Money Exchange',
    error: 'sin error',
    vacio: 'SI',
    operaciones: operacionesdb[0],    
    userInfo: session
  };

  if(data.operaciones.length>0)
        data.vacio = 'NO';

  res.render('history', { data: data });
});


module.exports = router;
