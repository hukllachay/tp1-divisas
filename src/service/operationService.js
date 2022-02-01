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


        Util({
            nombre: "Anthony Onori",
            correo: `anthony.onori97@gmail.com`,
            mensaje: "Confirmación de operación"
        })
        
        return result;

        // if (result.affectedRows > 0) 
        //     return result;
        // else
        //     return result;

        //item.id = result.affectedRows > 0 ? result.insertId : 0;

    };

}

module.exports = OperationService;