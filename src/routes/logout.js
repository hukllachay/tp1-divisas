var express = require('express');
var router = express.Router();
var pool = require('../models/database');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

router.get('/', async function(req, res, next) {
  const data = {
    title:  'Login - DotCom Money Exchange',
    logout: 'logout'
  }
  localStorage.clear();
  res.render('login', { data:data, userInfo: undefined });
});

module.exports = router;
