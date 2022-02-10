var express = require('express');
var router = express.Router();

var DocumentTypeService = require('../service/documentTypeService');
var ResgisterService = require('../service/registerService');

var resgisterService = new ResgisterService();

/* GET home page. */
router.get('/', async function(req, res, next) {
  var data = { title: 'Regsitro de usuario - DotCom Money Exchange'};

  var documentTypeService = new DocumentTypeService();

  //Trae lista de tipos de documento
  data.tipoDocumentos  = await documentTypeService.List();

  res.render('register', { data: data });
});

router.get('/activate', async function(req, res, next) {
  var data = { title: 'Confirmación - DotCom Money Exchange' };

  console.log(req.query.id);

  var result = await resgisterService.Confirmation(req.query.id);
 
  if (!result && response.statusCode == 200) {
    return body;
  }
  else{
    console.log(result);
  }

  res.render('activate', { data: data });
});

router.post('/save', async (request, response) => {
  var data = await request.body;
  var item = data.item;

  var result = await resgisterService.Save(item);
  
  if (result == null && response.statusCode != 200) {
    console.log(result);
  }

  response.send(result);
})

module.exports = router;
