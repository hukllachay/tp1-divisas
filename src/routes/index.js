var express = require('express');
var soap = require('soap');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var ratio = 0;
  // Consumo del servicio desde el cliente
  var url = 'http://192.190.42.160/ServicioDivisa/CambioActual.asmx?wsdl';
  soap.createClientAsync(url).then((client) => {
    return client.DivisaActual({}, function(arg, arg2){
      ratio = arg2.DivisaActualResult;
      const data = {
        title:  'Inicio - DotCom Money Exchange',
        ratio: ratio
      }
      res.render('index', { data: data });
    });
  });


});

module.exports = router;
