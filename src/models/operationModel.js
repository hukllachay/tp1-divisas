var pool = require('./database');

const OperationModel = function() {
    this.Save = async (item) => {
        var result = await pool.query('CALL usp_operacion_guardar(?,?,?,?,?,?,?)', [item.pcuentaorigen_id, item.pcuentadestino_id, item.pmontoorigen, item.ptipocambio, item.pmontodestino, item.fechaoperacion, item.usuario_id ])
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log("hubo error: ", err);
                result(err, null);
                return;
            });

        return result;
    }
}

module.exports = OperationModel;