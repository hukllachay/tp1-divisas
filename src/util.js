const nodemailer = require("nodemailer");

const util = (informacion) => {

    return new Promise((resolve, reject) => {
        if (informacion.correo != undefined) {
            resolve(envio_mail(informacion));
        } else {
            reject(function (informacion) {
                console.log("Error")
            });
        }
    })
}
const envio_mail = (objParams) => {
    /**
     * Podemos usar el parametro para configurar toda la trama del envio
     */
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",//"smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true, // true for 465, false for other ports
        auth: {
            user: 'anthony.onori@hotmail.com',
            pass: 'M9xl4jdp'
        }
    });

    transporter.sendMail({
        from: 'anthony.onori@hotmail.com',
        to: objParams.correo, //`anthony.onori97@gmail.com` //'mauchp0311@gmail.com',
        subject: objParams.asunto,//"Confirmación de operación - DOTCOM", // Subject line
        text: objParams.mensaje
    }, (err, info) => {
        console.log(err, "err");
        console.log(err, "info");
        if (err) {
            throw new Error("Error en el envio");
        }
        return `Envio exitoso `;
    });
}

module.exports = util;