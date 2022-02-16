const DocumentTypeModel = require("../models/documentTypeModel.js");

const DocumentTypeService = function() {
    this.List = async () => {
        var documentTypeModel = new DocumentTypeModel();
        var items = [ {
            id: '0',
            name: '-- Seleccione --'
        }];
        var results = await documentTypeModel.List();

        if (results == null) 
            items[0].name = '-- Sin datos --';
        else {
            results.forEach(x => {
                items.push({
                    id: x.id,
                    name: x.nombre
                });
            });
        }

        return items;
    }

}

module.exports = DocumentTypeService;