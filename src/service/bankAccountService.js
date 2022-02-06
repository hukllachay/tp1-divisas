const BankAccountModel = require("../models/bankAccountModel.js");

const BankAccountService = function() {
    this.SearchByUser = async (userId) => {
        var bankModel = new BankAccountModel();
        var accountDollar
        var accountSoles
        var items = {
            soles: [ { id: '0', name: '-- Seleccione --', bankid: 0} ],
            dollar: [ { id: '0', name: '-- Seleccione --', bankid: 0 } ]
        };

        var results = await bankModel.SearchByUser(userId);

        //items.soles[0].name = results == null ? '-- Sin datos --' : items.soles[0].name;
        //items.dolares[0].name = results == null ? '-- Sin datos --' : items.dolares[0].name;

        if (results == null) {
            items.soles[0].name = '-- Sin datos --';
            items.dollar[0].name = '-- Sin datos --';
        }
        else {
            results.forEach(x => {
                if (x.esdolares == 1)
                    items.dollar.push({
                        id: x.id,
                        name: x.nombre,
                        bankid: x.banco_id
                    });
                else
                    items.soles.push({
                        id: x.id,
                        name: x.nombre,
                        bankid: x.banco_id
                    });
            });
            items.soles[0].name = items.soles.length == 1 ? '-- Sin datos --' : items.soles[0].name;
            items.dollar[0].name = items.dollar.length == 1 ? '-- Sin datos --' : items.dollar[0].name;
        }

        return items;
    }

}

module.exports = BankAccountService;