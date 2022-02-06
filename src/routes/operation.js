var express = require('express');
var soap = require('soap');
var router = express.Router();

var OperationService = require('../service/operationService');
var BankService = require('../service/bankService');
var BankAccountService = require('../service/bankAccountService');

var userId = 1;
/* GET home page. */

router.get('/', async function (req, res, next) {
  var data = { title: 'Iniciar operación de cambio de divisas' };

  var bankService = new BankService();
  var bankAccountService = new BankAccountService();

  //Trae lista de bancos y cuentas del usuario
  var bankResult = await bankService.List();
  var bankAccountResult = await bankAccountService.SearchByUser(userId); // 3 = usuario_id

  data.bancos = bankResult;
  data.cuentasBancarias = JSON.stringify(bankAccountResult);

  //Consumo del servicio desde el cliente
  var url = 'http://192.190.42.160/ServicioDivisa/CambioActual.asmx?wsdl';
  soap.createClientAsync(url).then((client) => {
    return client.DivisaActual({}, function (arg, arg2) {
      data.ratio = arg2.DivisaActualResult;

      res.render('operation', { data: data });
    });
  });
});

router.post('/save', async (request, response) => {
  var data = await request.body;
  var item = data.item;

  item.operationDate = new Date(Date.now());
  item.userId = userId;

  var operationService = new OperationService();

  var result = await operationService.Save(item);
  
  if (result != null && response.statusCode == 200) {
    //return body;
    response.success = true;
    console.log(response, "response");
  }
  else{
    console.log(error, "error");
    response.send({
      messagge: "Ocurrio un error al guardar",
      success: false
    });  
  }

  response.send(result);
})


module.exports = router;
