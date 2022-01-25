var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  const data = {
    title:  'Inicio - DotCom Money Exchange',
    ratio: "3.85"
  }
  res.render('operation', { data: data });
});

router.get('/:step', function(req, res, next) {
  const data = {
    title:  'Operación - DotCom Money Exchange - Paso ' +req.params.step ,
  }
    res.render('operation', { data: data});
  });

  router.post('/:step/:id', function(req, res, next) {
    res.send('');
    //  res.render('operation', { data: data});

  });

module.exports = router;
