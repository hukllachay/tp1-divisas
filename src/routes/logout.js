var express = require('express');
var router = express.Router();
var pool = require('../models/database');


router.get('/', async function(req, res, next) {
  const data = {
    title:  'Login - DotCom Money Exchange',
    logout: 'logout'
  }
  res.render('login', { data:data, userInfo: undefined });
});

module.exports = router;
