const RegisterModel = require("../models/registerModel.js");
const Util = require("../util.js");

const RegisterService = function() {

    this.Save = async (item) => {
        var registerModel = new RegisterModel();

        var result = await registerModel.Save(item);

        if (result[0][0].id <= 0)
            return null;
        else
        {
            item.id = result[0][0].id;

            var d = new Date,
            dformat = [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/')+' '+
                      [d.getHours(), d.getMinutes()].join(':');
    
            Util({
                asunto: "Confirmación de registro - DOTCOM - " + dformat,
                nombre: (item.name + ' ' + item.lastName),
                fechaoperacion: dformat,
                correo: item.email,
                mensaje: `
                Estimado ${(item.name + ' ' + item.lastName)} es de nuestro agrado darle a bienvenida a DOTCOM Money Exchange
                Es necesario completar su registro para poder utilizar todos los servicios que disponemos debe activar su cuenta
                Para esto, active su cuenta desde el siguiente enlace: ${"http://localhost:8082/register/activate?id=" + item.id}
                \n
                Atentamente el equipo de DOTCOM.
                `
            });      
            
            return result;
        }

    };

    this.Confirmation = async (id) => {
        var registerModel = new RegisterModel();

        var result = await registerModel.Confirmation(id);

        console.log(result);
        if (result.affectedRows <= 0)
            result = null;
        //result[0][0].id;

        return result;
    };
}

module.exports = RegisterService;