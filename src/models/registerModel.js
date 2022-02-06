var pool = require('./database');

const RegisterModel = function() {
    this.Save = async (item) => {
        var result = await pool.query('CALL usp_usuario_guardar(?,?,?,?,?,?,?)', [item.name, item.lastName, item.email, item.password, item.address, item.documentTypeId, item.documentNumber ])
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log("hubo error en RegisterModel: ", err);
                result(err, null);
                return;
            });

        return result;
    }
}

module.exports = RegisterModel;