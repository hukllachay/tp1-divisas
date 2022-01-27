var express = require('express');
var soap = require('soap');
var router = express.Router();

var pool = require('../database');

/* GET home page. */

router.get('/', async function(req, res, next) {
  var ratio = 0;
  var bancos = await pool.query('CALL usp_bancolistar()');
  console.log(bancos[0]);
  // Consumo del servicio desde el cliente
  var url = 'http://192.190.42.160/ServicioDivisa/CambioActual.asmx?wsdl';
  soap.createClientAsync(url).then((client) => {
    return client.DivisaActual({}, function(arg, arg2) {
      ratio = arg2.DivisaActualResult;
      const data = {
        title: 'Iniciar operación de cambio de divisas', //'Operación - DotCom Money Exchange',
        ratio: ratio,
        bancos: bancos[0]
      }
      res.render('operation', { data: data });
    });
  });
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
