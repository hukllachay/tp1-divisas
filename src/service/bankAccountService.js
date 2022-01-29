const BankAccountModel = require("../models/bankAccountModel.js");

const BankAccountService = function() {
    this.SearchByUser = async (userId) => {
        var bankModel = new BankAccountModel();
        var items = [ {
            id: '0',
            name: '-- Seleccione --'
        }];
        var results = await bankModel.SearchByUser(userId);

        if (results == null) 
            items[0].name = '-- Sin datos --';
        else {
            results.forEach(x => {
                items.push({
                    id: x.id,
                    name: x.nombre,
                    bankid: x.banco_id,
                    isDollar: x.esdolares
                });
            });
        }

        return items;
    }

}

module.exports = BankAccountService;