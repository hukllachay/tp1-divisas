const OperationModel = require("../models/operationModel.js");

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

        item.id = result['OkPacket'].affectedRows > 0 ? insertId : 0;

        console.log(result, 'OperationService');
    };

}

module.exports = OperationService;