var pool = require('./database');

const BankAccountModel = function() { 

    this.SearchByUser = async (userId) => {
        var result = await pool.query('CALL usp_cuentabancaria_buscarporusuario(?)', userId)
            .then((result) => {
                return result[0];
            }).catch((err) => {
                console.log("Error BankAccountModel: ", err);
                //result(err, null);
                return null;
            });
        return result;
    }
}

module.exports = BankAccountModel;