-- //////////////////////// Inicio Procedimientos ///////////////////////////////////////

DELIMITER //
CREATE PROCEDURE usp_banco_listar()
BEGIN
	SELECT * FROM `tp_divisa`.`banco`
    where estado = 1;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE usp_cuentabancaria_buscarporusuario(
pusuario_id int)
BEGIN
	SELECT * FROM `tp_divisa`.`cuentabancaria`
    where usuario_id = pusuario_id and estado = 1;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE usp_operacion_guardar(
	pcuentaorigen_id int,
	pcuentadestino_id int,
    pmontoorigen decimal,
    ptipocambio decimal,
	pmontodestino decimal,
    fechaoperacion datetime,
    usuario_id int
)
BEGIN
	
INSERT INTO `tp_divisa`.`operacion`(`cuentaorigen_id`,`cuentadestino_id`,`montoorigen`,`tipocambio`,`montodestino`,`fechaoperacion`,`usuario_id`,`fecharegistro`,`estado`)
VALUES(pcuentaorigen_id, pcuentadestino_id, pmontoorigen, ptipocambio, pmontodestino, fechaoperacion, usuario_id, now(), 1);
 
END //
DELIMITER ;


-- //////////////////////// Fin Procedimientos ////////////////////////////////////////

-- //////////////////////// Inicio Insert prueba ///////////////////////////////////////

INSERT INTO `tp_divisa`.`banco`(`nombre`,`fecharegistro`,`estado`)
VALUES ('BCP',now(), 1), ('ScotiaBank',now(), 1), ('Interbank',now(), 1);

INSERT INTO `tp_divisa`.`tipodocumento`(`nombre`,`fecharegistro`,`estado`)
VALUES ('DNI',now(), 1), ('CE',now(), 1);

INSERT INTO `tp_divisa`.`usuario`(`nombre`,`apellidos`,`correo`,`contrasena`,`direccion`,`tipodocumento_id`,`correoconfirmado`,`fecharegistro`,`estado`)
VALUES ('Usuario', 'Usuario', 'anthony.onori97@gmail.com', '1234', 'prueba', 1, 1, now(), 1);

INSERT INTO `tp_divisa`.`cuentabancaria`(`banco_id`,`nombre`,`nrocuenta`,`esdolares`,`usuario_id`,`fecharegistro`,`estado`)
VALUES (1, 'Cuenta soles BCP', 194854685468, 0, 1, now(), 1),
	(1, 'Cuenta soles Interbank', 194815651658, 0, 1, now(), 1),
    (1, 'Cuenta dolares BCP', 194858198488, 1, 1, now(), 1),
    (1, 'Cuenta dolares BCP 2', 1941356484984, 1, 1, now(), 1);

-- //////////////////////// Fin Insert prueba ///////////////////////////////////////
