drop table if exists participe;
drop table if exists depense;
drop table if exists voyage;
drop table if exists utilisateur;


create table utilisateur(
id_utilisateur SERIAL primary key,
prenom varchar(50),
nom varchar(50),
email varchar(100),
id_voyage integer
);

create table voyage(
id_voyage SERIAL primary key ,
titre varchar(50),
description varchar(100)
);

create table depense(
id_depense SERIAL  primary key ,
titre varchar(50),
description varchar(50),
montant decimal,
date_crea date,
id_voyage integer,
id_utilisateur integer);