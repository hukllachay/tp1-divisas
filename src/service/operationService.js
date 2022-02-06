const OperationModel = require("../models/operationModel.js");
const Util = require("../util.js");

const OperationService = function() {

    this.Save = async (item) => {
        var operationModel = new OperationModel();

        var itemFormatted = {
            pcuentaorigen_id: item.sourceAccountId,
            pcuentadestino_id: item.targerAccountId,
            pmontoorigen: item.sourceAmount,
            ptipocambio: item.exchangeRate,
            pmontodestino: item.targetAmount,
            fechaoperacion: item.operationDate,
            usuario_id: item.userId
        }

        var result = await operationModel.Save(itemFormatted);

        var d = new Date,
        dformat = [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/')+' '+
                  [d.getHours(), d.getMinutes()].join(':');

        var moneyType = item.moneyType.split("_");

        Util({
            asunto: "Confirmación de operación - DOTCOM - " + dformat,
            nombre: "Anthony Onori",
            fechaoperacion: dformat,
            correo: `anthony.onori97@gmail.com`,
            mensaje: `
            ¡Felicidades! Se realizó la operación con exito. Se deposito ${item.targetAmount + ' - ' + moneyType[1]} en su cuenta ${item.bankText}.
            \n
            Resumen de operación:
            \n
            Fecha de operación: ${dformat}
            Cuenta Origen: ${item.bankText}
            Cuenta origen: ${item.sourceAccountText}
            Cuenta Destino: ${item.targerAccountText}
            Monto cobrado: ${item.sourceAmount + ' - ' + moneyType[0]}
            Monto despotiado: ${item.targetAmount + ' - ' + moneyType[1]}
            \n
            Atentamente el equipo de DOTCOM.
            `
        });      
        

        return result;
    };

}

module.exports = OperationService;