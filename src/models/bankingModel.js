var pool = require('./database');

const BankingModel = function() {

    this.Save = async (item) => {
        var result = await pool.query('CALL usp_cuentabancaria_add(?,?,?,?,?,?)', [item.banco_id, item.nombre, item.nrocuenta, item.dolar, item.usuario, item.estado])
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log("hubo error: ", err);
                result(err, null);
                return;
            });

        return result;
    }
    this.Delete = async (item) => {
        var result = await pool.query('CALL usp_cuentabancaria_delete(?)', [item.id ])
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log("hubo error: ", err);
                result(err, null);
                return;
            });

        return result;
    }

    this.Details = async (item) => {
        var bancos = pool.query('CALL usp_cuentabancaria_buscarporusuario(?)', [item.usuario_id]);

    }

}

module.exports = BankingModel;