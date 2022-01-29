var pool = require('./database');

const OperationModel = function() {
    // this.nombre = operation.nombre;
    // this.apellidos = operation.apellidos;
    // this.correo = operation.correo;
    // this.direccion = operation.direccion;
    // this.id_usuario = operation.id_usuario;
    // this.id_tipo_documento = operation.id_tipo_documento;
    // this.contrasena = operation.contrasena;

    this.Save = async (item) => {
        //var result = await pool.query('CALL usp_operacion_guardar(?)', item)
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

    this.Detail = async (operacionId, result) => {
        var bancos = pool.query('CALL usp_banco_listar()');

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