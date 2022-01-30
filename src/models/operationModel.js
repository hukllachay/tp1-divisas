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