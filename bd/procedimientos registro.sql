-- //////////////////////// Inicio Procedimientos ///////////////////////////////////////

DELIMITER //
CREATE PROCEDURE usp_usuario_guardar(
	pnombre varchar(100),
	papellidos varchar(100),
    pcorreo varchar(100),
    pcontrasena varchar(100),
	pdireccion varchar(250),
    ptipodocumento_id int,
    pnumerodocumento varchar(15)
    -- correoconfirmado int
)
BEGIN

 INSERT INTO usuario(`nombre`, `apellidos`, `correo`, `contrasena`, `direccion`, `tipodocumento_id`, `numerodocumento`, `correoconfirmado`, `fecharegistro`, `estado`)
VALUES (pnombre, papellidos, pcorreo, pcontrasena, pdireccion, ptipodocumento_id, pnumerodocumento, 0, now(), 1);

select id, concat(nombre, ' ', apellidos) as nombre, correo from usuario where id = (SELECT LAST_INSERT_ID());

END //
DELIMITER;


DELIMITER //
CREATE PROCEDURE usp_usuario_confirmarcorreo(
	pid int
)
BEGIN
	update usuario set correoconfirmado = 1 where id = pid;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE usp_tipodocumento_listar()
BEGIN
	SELECT * FROM tipodocumento
    where estado = 1;
END //
DELIMITER ;


-- //////////////////////// Fin Procedimientos ////////////////////////////////////////

