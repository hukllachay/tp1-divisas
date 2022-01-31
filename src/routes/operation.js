var express = require('express');
var soap = require('soap');
var router = express.Router();

var OperationService = require('../service/operationService');
var BankService = require('../service/bankService');
var BankAccountService = require('../service/bankAccountService');

/* GET home page. */

router.get('/', async function (req, res, next) {
  var data = { title: 'Iniciar operación de cambio de divisas' };

  var bankService = new BankService();
  var bankAccountService = new BankAccountService();

  //Trae lista de bancos y cuentas del usuario
  var bankResult = await bankService.List();
  var bankAccountResult = await bankAccountService.SearchByUser(3); // 3 = usuario_id

  data.bancos = bankResult;
  data.cuentasBancarias = JSON.stringify(bankAccountResult);
  //console.log(bankAccountResult);

  //Consumo del servicio desde el cliente
  var url = 'http://192.190.42.160/ServicioDivisa/CambioActual.asmx?wsdl';
  soap.createClientAsync(url).then((client) => {
    return client.DivisaActual({}, function (arg, arg2) {
      data.ratio = arg2.DivisaActualResult;

      res.render('operation', { data: data });
    });
  });

  // prueba guardar operación
  // setTimeout(() => {
  //   var operationService = new OperationService();
  //   var item = {
  //     sourceAccountId: 1,
  //     targerAccountId: 3,
  //     sourceAmount: 100,
  //     exchangeRate: 3.85,
  //     targetAmount: 38.5,
  //     operationDate: new Date(Date.now()),
  //     userId: 1
  //   };
  //console.log(item);

  //   operationService.Save(item);
  // }, 5000);

  //res.render('operation', { data: data });
});

router.post('/save', async (request, response) => {
  var data = await request.body;
  var item = data.item;

  item.operationDate = new Date(Date.now());
  item.userId = 1;

  console.log(item, "item");

  var operationService = new OperationService();

  var result = await operationService.Save(item);
  console.log(result, "result");
})


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

  if (alertMessages.length > 0) {
    alert(alertMessages.join('\n'));
    return false;
  }

  return true;
}

module.exports = router;
