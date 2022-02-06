CREATE SCHEMA  `tp_divisa`;

use `tp_divisa`;

drop table if exists banco;

drop table if exists cuentabancaria;

drop table if exists operacion;

drop table if exists tipodocumento;

drop table if exists usuario;

/*==============================================================*/
/* Table: banco                                                 */
/*==============================================================*/
create table banco
(
   id                   int not null auto_increment,
   nombre               varchar(100),
   fecharegistro        datetime,
   estado               bool,
   primary key (id)
);

/*==============================================================*/
/* Table: cuentabancaria                                        */
/*==============================================================*/
create table cuentabancaria
(
   id                   int not null,
   banco_id             int,
   nombre               varchar(100),
   nrocuenta            int,
   esdolares            bool,
   usuario_id           int,
   fecharegistro        datetime,
   estado               bool,
   primary key (id)
);

/*==============================================================*/
/* Table: operacion                                             */
/*==============================================================*/
create table operacion
(
   id                   int not null auto_increment,
   cuentaorigen_id      int,
   cuentadestino_id     int,
   montoorigen          decimal(10,2),
   tipocambio           decimal(8,2),
   montodestino         decimal(10,2),
   fechaoperacion       datetime,
   usuario_id           int,
   fecharegistro        datetime,
   estado               bool,
   primary key (id)
);

/*==============================================================*/
/* Table: tipodocumento                                         */
/*==============================================================*/
create table tipodocumento
(
   id                   int not null auto_increment,
   nombre               varchar(100),
   fecharegistro        datetime,
   estado               bool,
   primary key (id)
);

/*==============================================================*/
/* Table: usuario                                               */
/*==============================================================*/
create table usuario
(
   id                   int not null auto_increment,
   nombre               varchar(100),
   apellidos            varchar(100),
   correo               varchar(100),
   contrasena           varchar(100),
   direccion            varchar(250),
   tipodocumento_id     int,
   numerodocumento      varchar(15),
   correoconfirmado     bool,
   fecharegistro        datetime,
   estado               bool,
   primary key (id)
);

alter table cuentabancaria add constraint fk_cuentabancaria_banco foreign key (banco_id)
      references banco (id) on delete restrict on update restrict;

alter table cuentabancaria add constraint fk_cuentabancaria_usuario foreign key (usuario_id)
      references usuario (id) on delete restrict on update restrict;

alter table operacion add constraint fk_operacion_cuentabancaria_destino foreign key (cuentadestino_id)
      references cuentabancaria (id) on delete restrict on update restrict;

alter table operacion add constraint fk_operacion_cuentabancaria_origen foreign key (cuentaorigen_id)
      references cuentabancaria (id) on delete restrict on update restrict;

alter table operacion add constraint fk_operacion_usuario foreign key (usuario_id)
      references usuario (id) on delete restrict on update restrict;

alter table usuario add constraint fk_usuarios_tipodocumento foreign key (tipodocumento_id)
      references tipodocumento (id) on delete restrict on update restrict;