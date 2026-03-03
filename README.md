# Flux - Aplicação Social de Perfis

O Flux é uma aplicação web full-stack para gerenciamento de perfis de usuário e interação social. Possui um backend construído com Node.js e Express, e um frontend desenvolvido com um framework JavaScript moderno.

## Funcionalidades

-   Autenticação de usuário (cadastro e login) com JWT.
-   Criação, Leitura, Atualização e Exclusão (CRUD) de perfis de usuário.
-   Rotas seguras para usuários autenticados.
-   API RESTful para comunicação cliente-servidor.

## Tecnologias Utilizadas

-   **Backend:** Node.js, Express.js, PostgreSQL, Prisma (ORM)
-   **Frontend:** React (Vite)
-   **Autenticação:** JSON Web Tokens (JWT)

---

## Como Começar

Siga estas instruções para colocar o projeto em funcionamento na sua máquina local para desenvolvimento e testes.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou mais recente recomendada)
-   [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
-   [Git](https://git-scm.com/)

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/fluxoficialll-lgtm/Flux340.git
    cd Flux340
    ```

2.  **Instale as Dependências do Backend:**
    O projeto já vem com as dependências na pasta `node_modules`. Se precisar reinstalar:
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente (Essencial):**

    O servidor backend precisa de uma URL de conexão para se comunicar com o banco de dados.

    -   Na pasta raiz do projeto, crie um arquivo chamado `.env`.
    -   Adicione a seguinte linha a este arquivo, substituindo com a sua URL de banco de dados real, se for diferente:

    ```
    DATABASE_URL="postgres://flux_user:mT7oN0I1He811sAbpP5rS438SmswB2fG@dpg-cp616b779t8c73do5gvg-a.oregon-postgres.render.com/flux_db_e5et"
    ```

    **Atenção:** Este arquivo é **obrigatório** para o servidor iniciar. Ele não é enviado para o GitHub por razões de segurança.

### Executando a Aplicação

1.  **Inicie o Servidor Backend:**
    A partir da pasta raiz, execute:
    ```bash
    npm start
    ```
    O servidor deverá iniciar em `http://localhost:3001`.

2.  **Inicie o Frontend:**
    O frontend está configurado para ser servido pelo mesmo servidor backend. Basta acessar a URL no seu navegador.

---
