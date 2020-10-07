Docker e Scripts

docker run --name escolinha -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=escolinha -p 5432:5432 -d postgres

Scripts - DB - Escolinha

CREATE TABLE clientes (
id varchar(250) PRIMARY KEY,
nome VARCHAR ( 250 ) NOT NULL,
email VARCHAR ( 255 ) UNIQUE NOT NULL
);

CREATE TABLE produtos (
id varchar(250) PRIMARY KEY,
nome VARCHAR ( 250 ) NOT NULL,
descricao VARCHAR ( 250 ) NOT NULL,
valor DECIMAL(15,2) NOT NULL
);

CREATE TABLE PEDIDOS (
id varchar(250) NOT NULL,
id_cliente varchar(250) NOT NULL,
data_hora TIMESTAMP NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_cliente) REFERENCES CLIENTES (id)
);

CREATE TABLE PEDIDOS_PRODUTOS (
id_pedido varchar(250) NOT NULL,
id_produto varchar(250) NOT NULL,
PRIMARY KEY (id_pedido, id_produto),
FOREIGN KEY (id_pedido) REFERENCES PEDIDOS (id),
FOREIGN KEY (id_produto) REFERENCES PRODUTOS (id)
);

CREATE TABLE usuarios (
id varchar(250) PRIMARY KEY,
nome VARCHAR ( 250 ) NOT NULL,
senha VARCHAR ( 250 ) NOT NULL,
email VARCHAR ( 255 ) UNIQUE NOT NULL
);
