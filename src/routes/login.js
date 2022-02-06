var express = require('express');
var router = express.Router();
var session = require('express-session');
var pool = require('../models/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = {
    title:  'Login - DotCom Money Exchange',
  }
  res.render('login', { data:data, userInfo: undefined });
});

router.post('/', async function(req, res, next) {

  let { user, password } = req.body;

  let data = {
    title:  'Login Failed - Dotcom DotCom Money Exchange',
    error: {code:1, message: 'Usuario o contraseña invalido'}
  }

  if(user == undefined
    || user == null
    || user == ""
    || password == undefined) {
    res.render('login', { data: data, userInfo: undefined });
    return;
  }

  const SQL = `SELECT * FROM usuario WHERE correo = '${user}'`;
  let result = await pool.query(SQL);
 
  if(!result || result.length <= 0){
    data.title = 'Login Failed';
    data.error.message = 'Credenciales inválidas!, inténtelo de nuevo.';
    return res.render('login', { data: data, userInfo: undefined });
  }

  let { id, nombre, apellidos, correo, contrasena, correoconfirmado, estado } = result[0];
  if(correo === user && contrasena === password) {
    if(correoconfirmado !== 1) {
      data.title = 'Login Failed';
      data.error.message = 'El correo electrónico no está confirmado.';
      return res.render('login', { data: data, userInfo: undefined });
    }

    if(estado !== 1) {
      data.title = 'Login Failed';
      data.error.message = 'No estas autorizado';
      return res.render('login', { data: data, userInfo: undefined });
    }
    data.title = 'Success';
    data.error = undefined;

    res.render('login', { data, userInfo: { id, nombre, apellidos }});
  }

  console.log("user: " + user);
  console.log("password: " + password);

  //res.redirect('/home');
 
  //res.send("api login");
 
});
module.exports = router;
