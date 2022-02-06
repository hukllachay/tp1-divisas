var express = require('express');
var router = express.Router();

var DocumentTypeService = require('../service/documentTypeService');
var ResgisterService = require('../service/registerService');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var data = { };

  var documentTypeService = new DocumentTypeService();

  //Trae lista de tipos de documento
  data.tipoDocumentos  = await documentTypeService.List();

  res.render('register', { data: data });
});

router.post('/save', async (request, response) => {
  var data = await request.body;
  var item = data.item;

  console.log(item, "item front");

  var resgisterService = new ResgisterService();

  var result = await resgisterService.Save(item);
  
  if (!error && response.statusCode == 200) {
    return body;
  }
  else{
    console.log(error);
  }

  response.send(result);
})

module.exports = router;
