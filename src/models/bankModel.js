var pool = require('./database');

const BankModel = function() { 

    this.List = async () => {
        var result = await pool.query('CALL usp_banco_listar()')
            .then((result) => {
                return result[0];
            }).catch((err) => {
                console.log("Error BankModel: ", err);
                //result(err, null);
                return null;
            });
        return result;
    }

}

module.exports = BankModel;