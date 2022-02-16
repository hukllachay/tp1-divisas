const OperationModel = require("../models/operationModel.js");

const HistoryService = function() {
    this.SearchByUser = async (userId) => {
        var oppModel = new OperationModel();
        
        //var results = await oppModel.SearchByUser(userId);
        
        var ret = new Object();

        ret.vacio = "SI"
        ret.items = [];
        //console.log(results);
        /*if (results != null) {
            ret.vacio = "NO"
            debugger;
            items = [];
            results.forEach(x => {
                var cambio = "Soles a Dolares";
                if(x.esdolares==0) cambio = "Dolares a Soles";
                ret.items.push({
                    id: x.id,
                    montoorigen: x.montoorigen,
                    fechaoperacion: x.fechaoperacion,
                    tipocambio: x.tipocambio,
                    montodestino: x.montodestino,
                    cambio: x.cambio
                });
            });
        }*/

        return ret;
    };

}

module.exports = HistoryService;