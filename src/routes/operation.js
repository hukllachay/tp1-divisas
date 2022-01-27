var express = require('express');
var soap = require('soap');
var router = express.Router();

var OperationService = require('../service/operationService');
var BankService = require('../service/bankService');

/* GET home page. */

router.get('/', async function (req, res, next) {
  var ratio = 0;
  var data = {};

  var bankService = new BankService();
  var bankResult = await bankService.List();

  // if (validate === false)
  //   res.render('operation', { data: data });

  data.bancos = bankResult;
  console.log(bankResult);

  // Consumo del servicio desde el cliente
  var url = 'http://192.190.42.160/ServicioDivisa/CambioActual.asmx?wsdl';
  await soap.createClientAsync(url).then((client) => {
    return client.DivisaActual({}, function (arg, arg2) {
      ratio = arg2.DivisaActualResult;
      data = {
        ratio: ratio
      }
    });
  });

  data.title = 'Iniciar operación de cambio de divisas'
  res.render('operation', { data: data });
});


router.get('/:step', function (req, res, next) {
  const data = {
    title: 'Operación - DotCom Money Exchange - Paso ' + req.params.step,
  }
  res.render('operation', { data: data });
});

router.post('/:step/:id', function (req, res, next) {
  res.send('');
  //  res.render('operation', { data: data});

});


function validate(bank, accounts) {
  var alertMessages = [];
  if (typeof bank === 'string')
  alertMessages.push(bank);
  if (typeof accounts === 'string')
  alertMessages.push(accounts);

  if (alertMessages.length > 0){
    alert(alertMessages.join('\n'));
    return false;
  }

  return true;
}

module.exports = router;
