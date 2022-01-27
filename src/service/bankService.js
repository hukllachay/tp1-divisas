const BankModel = require("../models/bankModel.js");

const BankService = function() {
    this.List = async () => {
        var bankModel = new BankModel();
        var items = [ {
            id: '0',
            name: '-- Seleccione --'
        }];
        var results = await bankModel.List();

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

module.exports = BankService;