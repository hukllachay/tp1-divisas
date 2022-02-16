var pool = require('./database');

const DocumentTypeModel = function() { 

    this.List = async () => {
        var result = await pool.query('CALL usp_tipodocumento_listar()')
            .then((result) => {
                return result[0];
            }).catch((err) => {
                console.log("Error DocumentTypeModel: ", err);
                //result(err, null);
                return null;
            });
        return result;
    }

}

module.exports = DocumentTypeModel;