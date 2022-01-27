const OperationModel = require("../models/operationModel.js");

const OperationService = function() {

    this.Create = async (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: "El contenido no puede estar vacio!"
            });
        }
        const usuario = new Usuario({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            direccion: req.body.direccion,
            id_usuario: req.body.id_usuario,
            id_tipo_documento: req.body.id_tipo_documento,
            contrasena: req.body.contrasena
        });

        Usuario.create(usuario, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al momento de crear el Usuario."
                });
            else res.send(data);
        });
    };

    this.FindOne = async (req, res) => {
        Usuario.findById(req.params.usuarioId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.usuarioId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Customer with id " + req.params.usuarioId
                    });
                }
            } else res.send(data);
        });
    };
}

module.exports = OperationService;