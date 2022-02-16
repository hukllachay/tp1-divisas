var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

/* GET home page. */
router.get('/', function(req, res, next) {
  var session = JSON.parse(localStorage.getItem('userSession'));
 
  var data = {
    title: 'Inicio - DoctCom Money Exchange',
    userInfo: session
  };
  
  res.render('home', { title: '', data: data });
});

module.exports = router;
