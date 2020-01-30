drop database if exists circus;
create database circus;
use circus;

create table user 
(
    id int auto_increment primary key,
    firstname varchar(30) not null,
    lastname varchar(30) not null,
    adress varchar(200) not null,
    password varchar(30) not null,
    email varchar(30) not null
);
create table product
(
    id int auto_increment primary key,
    title varchar(50) not null,
    content varchar(300) not null,
    price varchar(30) not null,
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

INSERT INTO `user`
(`firstname`, `adress` , `lastname`, `password`, `email`) 
VALUES
('Val', '76 rue de la mouette 75010 Paris' 'Jul', 'test', '@test');
INSERT INTO `product`
(`title`, `content` , `price` , `pictur`) 
VALUES
('Maximus', 'Grand magicien illusioniste' '1449.99', 'test','https://zupimages.net/up/20/05/idow.jpg');
