INSERT INTO `roles`
VALUES (1, 'ROLE_ADMIN') ON DUPLICATE KEY
UPDATE ROLE = 'ROLE_ADMIN';
INSERT INTO `roles`
VALUES (2, 'ROLE_USER') ON DUPLICATE KEY
UPDATE ROLE = 'ROLE_USER';

INSERT INTO `users` (`user_id`, `active`, `email`, `last_name`, `name`, `password`, `user_name`)
VALUES (1, b'1', 'admin@localhost', 'Do Sistema', 'Adminstrador',
        '$2a$10$A5c6LmhsiFydP7IKJ3QIcu433x2Ow5Q.Jgw8GmgJ4q1freC/eyOO6', 'admin') ON DUPLICATE KEY
UPDATE user_name = 'admin';

INSERT INTO `users` (`user_id`, `active`, `email`, `last_name`, `name`, `password`, `user_name`)
VALUES (2, b'1', 'user@localhost', 'Do Sistema', 'User', '$2a$10$A5c6LmhsiFydP7IKJ3QIcu433x2Ow5Q.Jgw8GmgJ4q1freC/eyOO6',
        'user') ON DUPLICATE KEY
UPDATE user_name = 'user';

INSERT INTO `user_role` (`user_id`, `role_id`)
VALUES ('1', '1') ON DUPLICATE KEY
UPDATE role_id = '1';
INSERT INTO `user_role` (`user_id`, `role_id`)
VALUES ('2', '2') ON DUPLICATE KEY
UPDATE role_id = '2';

INSERT INTO `caracteristica_produto` (`id_caracteristica_produto`, `nome_caracteristica_produto`)
VALUES (1, 'Frango + Veggie') ON DUPLICATE KEY
UPDATE nome_caracteristica_produto = 'Frango + Veggie';
INSERT INTO `caracteristica_produto` (`id_caracteristica_produto`, `nome_caracteristica_produto`)
VALUES (2, 'Sobremesas') ON DUPLICATE KEY
UPDATE nome_caracteristica_produto = 'Sobremesas';
INSERT INTO `caracteristica_produto` (`id_caracteristica_produto`, `nome_caracteristica_produto`)
VALUES (3, 'Acompanhamentos') ON DUPLICATE KEY
UPDATE nome_caracteristica_produto = 'Acompanhamentos';
INSERT INTO `caracteristica_produto` (`id_caracteristica_produto`, `nome_caracteristica_produto`)
VALUES (4, 'Carne Grelhada') ON DUPLICATE KEY
UPDATE nome_caracteristica_produto = 'Carne Grelhada';
INSERT INTO `caracteristica_produto` (`id_caracteristica_produto`, `nome_caracteristica_produto`)
VALUES (5, 'As Mais Pedidas') ON DUPLICATE KEY
UPDATE nome_caracteristica_produto = 'As Mais Pedidas';
