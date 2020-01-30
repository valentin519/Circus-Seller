drop database if exists circus;
create database circus;
use circus;

create table user 
(
    id int auto_increment primary key,
    firstname varchar(30) not null,
    lastname varchar(30) not null,
    adress varchar(130) not null,
    password varchar(30) not null,
    email varchar(30) not null,
    bio varchar(250) null,
    profile_pic varchar(200) null
);
create table product
(
    id int auto_increment primary key,
    title varchar(50) not null,
    content varchar(300) not null,
    pictur varchar(200) not null
);
create table panier
(
    id int auto_increment primary key,
    user_id int,
    product_id int,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);


