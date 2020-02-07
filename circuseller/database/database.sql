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
    price int not null,
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
(`firstname`, `lastname`, `adress` , `password`, `email`) 
VALUES
('Val', 'Jul', '76 rue de la mouette 75010 Paris', 'test', '@test');
INSERT INTO `product`
(`title`, `content` , `price` , `pictur`) 
VALUES
('Maximus', 'Grand magicien illusioniste', '1449','https://zupimages.net/up/20/05/idow.jpg');
INSERT INTO `product`
(`title`, `content` , `price` , `pictur`) 
VALUES
('Gloria', 'Voltigeuse mondialement reconnus', '1249','https://zupimages.net/up/20/05/03gr.jpg');
INSERT INTO `product`
(`title`, `content` , `price` , `pictur`) 
VALUES
('Enrico', 'Voltigeur mondialement reconnus', '1529','https://zupimages.net/up/20/05/46p6.jpg');
INSERT INTO `product`
(`title`, `content` , `price` , `pictur`) 
VALUES
('Rigolo', 'Clown pour enfants et adultes', '719','https://zupimages.net/up/20/05/lsk0.jpg');
