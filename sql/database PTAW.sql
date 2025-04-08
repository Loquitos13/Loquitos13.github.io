CREATE DATABASE IF NOT EXISTS ptaw;
USE ptaw;

CREATE TABLE Admins (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    nome_admin VARCHAR(255) NOT NULL,
    email_admin VARCHAR(255) NOT NULL UNIQUE,
    pass_admin VARCHAR(255) NOT NULL,
    contacto_admin VARCHAR(255) NOT NULL,
    funcao_admin VARCHAR(255) NOT NULL,
    data_criacao_admin DATETIME NOT NULL
);

CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(255) NOT NULL,
    email_cliente VARCHAR(255) NOT NULL UNIQUE,
    pass_cliente VARCHAR(255) NOT NULL,
    contacto_cliente VARCHAR(15) NOT NULL,
    morada_cliente VARCHAR(255) NOT NULL,
    nif_cliente VARCHAR(9) NOT NULL UNIQUE,
    ip_cliente VARCHAR(45) NOT NULL UNIQUE,
    imagem_cliente VARCHAR(255),
    id_gift INT,
    id_favoritos INT,
    id_boletim INT,
    id_google VARCHAR(255) UNIQUE,
    id_facebook VARCHAR(255) UNIQUE,
    data_criacao_cliente DATETIME NOT NULL
);

CREATE TABLE Dimensoes (
    id_dimensao INT AUTO_INCREMENT PRIMARY KEY,
    dimensao_tipo VARCHAR(255) NOT NULL,
    tamanho VARCHAR(255) NOT NULL
);

CREATE TABLE Cores (
    id_cor INT AUTO_INCREMENT PRIMARY KEY,
    nome_cor VARCHAR(255) NOT NULL,
    hex_cor VARCHAR(7) NOT NULL
);

CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    titulo_categoria VARCHAR(255) NOT NULL,
    descricao_categoria TEXT NOT NULL,
    id_dimensao INT NOT NULL,
    status_categoria BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_dimensao) 
        REFERENCES Dimensoes(id_dimensao)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE Produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    data_criacao_produto DATETIME NOT NULL,
    titulo_produto VARCHAR(255) NOT NULL,
    modelo3d_produto VARCHAR(255),
    descricao_produto TEXT NOT NULL,
    imagem_principal VARCHAR(255) NOT NULL,
    preco_produto DECIMAL(10, 2) NOT NULL,
    stock_produto INT NOT NULL,
    keywords_produto VARCHAR(255) NOT NULL,
    status_produto BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_categoria) 
        REFERENCES Categorias(id_categoria)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE ImagemProdutos (
    id_imagem_extra INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    imagem_extra VARCHAR(255) NOT NULL,
    imagem_extra_2 VARCHAR(255) NOT NULL,
    imagem_extra_3 VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_produto) 
        REFERENCES Produtos(id_produto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ProdutosVariantes (
    id_produto_variante INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    id_cor INT NOT NULL,
    promocao DECIMAL(5, 2) DEFAULT 0,
    FOREIGN KEY (id_produto) 
        REFERENCES Produtos(id_produto)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_cor) 
        REFERENCES Cores(id_cor)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE Carrinhos (
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    ip_cliente VARCHAR(45) NOT NULL UNIQUE,
    FOREIGN KEY (id_cliente) 
        REFERENCES Clientes(id_cliente)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE CarrinhoItens (
    id_carrinho_item INT AUTO_INCREMENT PRIMARY KEY,
    id_carrinho INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_carrinho) 
        REFERENCES Carrinhos(id_carrinho)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_produto) 
        REFERENCES Produtos(id_produto)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE Encomendas (
    id_encomenda INT AUTO_INCREMENT PRIMARY KEY,
    id_carrinho INT NOT NULL,
    preco_total_encomenda DECIMAL(10, 2) NOT NULL,
    fatura VARCHAR(255) NOT NULL,
    status_encomenda VARCHAR(50) NOT NULL,
    data_criacao_encomenda DATETIME NOT NULL,
    data_rececao_encomenda DATETIME,
    FOREIGN KEY (id_carrinho) 
        REFERENCES Carrinhos(id_carrinho)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE PagamentoCartao (
    id_cartao INT AUTO_INCREMENT PRIMARY KEY,
    numero_cartao VARCHAR(255) NOT NULL,
    validade_cartao VARCHAR(7) NOT NULL,
    cvv_cartao VARCHAR(4) NOT NULL,
    nome_cartao VARCHAR(255) NOT NULL
);

CREATE TABLE PagamentoMbway (
    id_mbway INT AUTO_INCREMENT PRIMARY KEY,
    telemovel_mbway VARCHAR(15) NOT NULL
);

CREATE TABLE PagamentoPaypal (
    id_paypal INT AUTO_INCREMENT PRIMARY KEY,
    email_paypal VARCHAR(255) NOT NULL
);

CREATE TABLE MetodoPagamento (
    id_metodo_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_cartao INT,
    id_mbway INT,
    id_paypal INT,
    FOREIGN KEY (id_cliente) 
        REFERENCES Clientes(id_cliente)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_cartao) 
        REFERENCES PagamentoCartao(id_cartao)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_mbway) 
        References PagamentoMbway(id_mbway)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_paypal) 
        References PagamentoPaypal(id_paypal)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_encomenda INT NOT NULL,
    id_metodo_pagamento INT NOT NULL,
    valor_pago DECIMAL(10, 2) NOT NULL,
    data_pagamento DATETIME NOT NULL,
    FOREIGN KEY (id_encomenda) 
        REFERENCES Encomendas(id_encomenda)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (id_metodo_pagamento) 
        REFERENCES MetodoPagamento(id_metodo_pagamento)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE Personalizacao (
    id_personalizacao INT AUTO_INCREMENT PRIMARY KEY,
    id_carrinho_item INT NOT NULL,
    imagem_escolhida VARCHAR(255) NOT NULL,
    modelo3d_personalizado VARCHAR(255) NOT NULL,
    mensagem_personalizada VARCHAR(255),
    preco_personalizacao DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_carrinho_item) 
        REFERENCES CarrinhoItens(id_carrinho_item)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Reviews (
    id_review INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_produto INT NOT NULL,
    comentario TEXT NOT NULL,
    classificacao INT NOT NULL,
    data_review DATETIME NOT NULL,
    FOREIGN KEY (id_cliente) 
        REFERENCES Clientes(id_cliente)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_produto) 
        REFERENCES Produtos(id_produto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);