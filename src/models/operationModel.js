var pool = require('./database');

const OperationModel = function() {
    // this.nombre = operation.nombre;
    // this.apellidos = operation.apellidos;
    // this.correo = operation.correo;
    // this.direccion = operation.direccion;
    // this.id_usuario = operation.id_usuario;
    // this.id_tipo_documento = operation.id_tipo_documento;
    // this.contrasena = operation.contrasena;

    this.Create = async (newOperation) => {
        var result = await pool.query('CALL usp_bancolistar()')
            .then((result) => {
                return result[0];
            }).catch((error) => {
                console.log("hubo error: ", err);
                result(err, null);
                return;
            });

        return result;
    }

    this.FindById = async (operacionId, result) => {
        var bancos = pool.query('CALL usp_bancolistar()');

    }

}

module.exports = OperationModel;


/*
Operation.create = (newOperation, result) => {
    pool.query('CALL usp_bancolistar()')
        .then((result) => {
            
        }).catch((error) => {
            console.log("hubo error: ", err);
            result(err, null);
            return;
        });

    // sql.query("INSERT INTO usuarios SET ?", newOperation, (err, res) => {
    //     if (err) {
    //         console.log("hubo error: ", err);
    //         result(err, null);
    //         return;
    //     }

    //     console.log("usuario creado: ", { id: res.insertId, ...newOperacion });
    //     result(null, { id: res.insertId, ...newUsuario });
    // });
};

Operation.findById = (operacionId, result) => {
    var bancos = pool.query('CALL usp_bancolistar()');
    // sql.query(`SELECT * FROM usuarios WHERE id_usuario = ${usuarioId}`, (err, res) => {
    //     if (err) {
    //         console.log("error: ", err);
    //         result(err, null);
    //         return;
    //     }

    //     if (res.length) {
    //         console.log("found usuario: ", res[0]);
    //         result(null, res[0]);
    //         return;
    //     }

    //     // not found Customer with the id
    //     result({ kind: "not_found" }, null);
    // });
};*/