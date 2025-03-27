# #11 - React: **<https://rocketshoes-aszurar.vercel.app>**

**OBS**:

- Branch **[main](https://github.com/Aszurar/rocketshoes/tree/main)**:
  - Usamos o **JSON-Server** para simular a API e assim consumir os dados a partir do arquivo **server.json**.
  - Não é a branch usada para o deploy.
  - Definimos a porta para consumir pela porta 3333, por meio do ```http://localhost:3333``` definido na variável de ambiente **```VITE_API_URL```**.
- Branch **[feature/no-json-server](https://github.com/Aszurar/rocketshoes/tree/feature/no-json-server)**:
  - Consumimos diretamente o arquivo **server.json** passando o endereço dele na variável de ambiente **```VITE_API_URL```**
  - Com isso, usamos essa branch para o **deploy** já que estamos o server.json diretamente.
  - Aplicamos um delay no axios para simular a latência de uma API real por meio da variável ambiente **```VITE_ENABLE_API_DELAY```**.

<div align="center">
    <img src="https://i.imgur.com/qjBRiVS.png" width="1000" alt="Banner">
</div>

## RocketShoes

1. O projeto **RocketShoes** que simula um e-commerce de calçados, onde podemos **adicionar**, **remover** e **editar** itens no carrinho, além de **finalizar** a compra.
2. O site foi publicado com CI/CD por meio da plataforma **[Vercel](https://vercel.com/)**.
3. Acesse e teste o projeto em: **<https://rocketshoes-aszurar.vercel.app>**

  <div align="center">
    <h3><a href="https://rocketshoes-aszurar.vercel.app">RocketShoes</a></h3>

  </div>

<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/b020bc1b-dd79-4557-b93d-49b50af1e908/deploy-status)](https://app.netlify.com/sites/coffee-delivery-aszurar/deploys) [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) [![Vitest](https://img.shields.io/badge/-Vitest-739b1b?style=for-the-badge&logo=vitest&logoColor=white&link=https://www.typescriptlang.org/)](https://vitest.dev/) [![React](https://img.shields.io/badge/-React-%2320232a.svg?style=for-the-badge&logo=react&link=https://react.dev)](https://react.dev/) [![Chakra UI](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)](https://v2.chakra-ui.com/) [![ZUSTAND](https://img.shields.io/badge/-Zustand-453f39?style=for-the-badge&logo=zustand&logoColor=white)](https://tanstack.com/query/latest/docs/framework/react/overview)  [![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)](https://tanstack.com/query/latest/docs/framework/react/overview) [![AXIOS](https://img.shields.io/badge/-AXIOS-5a29e4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/ptbr/)  [![TypeScript](https://img.shields.io/badge/-TypeScript-%23007ACC?style=for-the-badge&logo=typescript&logoColor=white&link=https://www.typescriptlang.org/)](https://www.typescriptlang.org/) [![JavaScript](https://img.shields.io/badge/-JavaScript-%23323330.svg?style=for-the-badge&logo=javascript&link=https://www.javascript.com/)](https://www.javascript.com/) [![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white&link=https://developer.mozilla.org/pt-BR/docs/Web/HTML)](https://developer.mozilla.org/pt-BR/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&link=https://www.w3schools.com/css/)](https://www.w3schools.com/css/) [![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)](https://pnpm.io/pt/)
</div>

<div align="center">
        <h2>
          <a href="#information_source-sobre">Sobre</a>&nbsp;|&nbsp;
          <a href="#interrobang-motivo">Motivo</a>&nbsp;|&nbsp;
          <a href="#art-design">Design</a>&nbsp;|&nbsp;
          <a href="#seedling-requisitos-mínimos">Requisitos</a>&nbsp;|&nbsp;
          <a href="#rocket-tecnologias-utilizadas">Tecnologias</a>&nbsp;|&nbsp;
          <a
          href="#truck-entrega-e-distribuição-continua">CI/CD</a>&nbsp;|&nbsp;
          <a href="#package-como-baixar-e-executar-o-projeto">Baixar e Executar</a>&nbsp;
        </h2>
</div>

---

<div align="center">
    <img src="" width="500" alt="Gif mostrando o projeto">
</div>

<div align="center" >

**[Vídeo no Youtube]()**

</div>

---

## :information_source: Sobre

O projeto tem o intuito de simular um marketplace de calçados, onde podemos escolher entre vários tipos de calçados, a quantidade, adicionar ou remover do carrinho. Além disso, podemos ver o total do preço, quantidade e finalizar a compra.

- O objetivo desse projeto é praticar o **gerenciamento e manipulação de Estados** via **[Redux](https://redux.js.org/)** com o **[Redux Toolkit](https://redux-toolkit.js.org/)** e **[React Redux](https://react-redux.js.org/)**.
- Criamos 1 slice para o carrinho onde temos diversas ações que envolvem adicionar e remover itens do carrinho e persistir os dados no localStorage, além de calcular o total do preço dos produtos no carrinho.
- Além disso, abordamos o **[TanStack Query - React Query](https://tanstack.com/query/latest)** para o consumo de dados e o **[TanStack - Table](https://tanstack.com/table/latest)** para a criação da tabela produtos no carrinho.

- A acessibilidade foi levada em consideração, com o uso da lib **[axe-core](https://www.npmjs.com/package/@axe-core/react)** para testes e correções, assim como leitor de tela ChromeVox.

- O projeto é um desafio da trilha de **React** da **[Rocketseat](https://www.rocketseat.com.br/)**, sendo o 3º desafio dessa trilha.

### Tela inicial

<div style="display: flex; justify-content: center; align-items: center; gap: 12px;">
      <img src="https://i.imgur.com/41hyuD3.png" width="400" style="border-radius: 16px;" alt="Tela Inicial no tema claro"><img src="https://i.imgur.com/cCm0T4o.png" width="400" style="border-radius: 16px;" alt="Tela Inicial no tema escuro">
</div>

---

## :interrobang: Motivo

- O objetivo do projeto é aprender a usar o Chakra UI para criar interfaces, praticar o uso do **Zustand** para o **gerenciamento e manipulação do Estado** e praticamos o uso do **Vitest** para **testes unitários** nas funções de manipulação de dados. Além disso, praticamos o consumo de dados com **React Query** e **axios**.

### Funcionalidades

  1. Gerenciamento e manipulação de Estados com Zustand;
     - Criação de 4 stores simulando slices de um Redux:
       - Um para o carrinho;
       - Um para os pedidos;
       - Um para os endereços;
       - Um para o de pagamentos;
  2. Consumo de dados com React Query e axios melhorando o cache e a performance;
  3. Criação de interfaces com Chakra UI;
  4. Criação de testes unitários com Vitest;
  5. Animação com Framer Motion;
  7. Conseguimos adicionar, remover e editar itens no carrinho;
  8. Conseguimos adicionar, remover e editar endereços;
  9. Conseguimos adicionar um pedido já realizado anteriormente ao carrinho;
  10. Buscamos endereços via CEP;

### O que aprendi de novo?

  1. Criação de interfaces com Chakra UI;
  2. Animações com Framer Motion
  3. Simluação de Slices com Zustand

- **Carrinho**

<div align="center" >
  <img src="" width="400" alt="Tela Inicial">_<img src="" width="400" alt="Tela Inicial">
</div>

---

## :art: Design

- O Design foi disponibilizado pela Rocketseat, e pode ser acessado no link abaixo:

<div align="center">
  <h3><a href="">RocketShoes</a></h3>

  [![Design]()]()
</div>

---

## :seedling: Requisitos Mínimos

  1. NodeJS
  2. ReactJS
  3. Vite
  4. PNPM

- **Adição do endereço e método de pagamento**

<div align="center" >
      <img src="" width="400" alt="Tela de Checkout - tema light">_<img src="" width="400" alt="Tela de Checkout - tema light - preenchida">
      <img src="" width="400" alt="Tela de Checkout - tema dark">_<img src="" width="400" alt="Tela Inicial">
</div>

---

## :rocket: Tecnologias Utilizadas

- O projeto foi desenvolvido utilizando as seguintes tecnologias:

  1. **[axios](https://axios-http.com/ptbr/docs/intro)**
  2. **[axe-core/react](https://www.npmjs.com/package/@axe-core/react)**
  3. **[Chakra UI](https://v2.chakra-ui.com/)**
  4. **[Framer Motion](https://www.framer.com/motion/)**
  5. **[JavaScript](https://developer.mozilla.org/pt1.BR/docs/Web/JavaScript)**
  6. **[Json Server](https://github.com/typicode/json-server)**
  7. **[Netlify](https://www.netlify.com/)**
  8. **[NodeJS](https://nodejs.org/en/)**
  9. **[Phosphor Icons](https://phosphoricons.com/)**
  10. **[React](https://pt1.br.react.dev/)**
  11. **[React Hook Form](https://react-hook-form.com/)**
  12. **[Sonner](https://sonner.emilkowal.ski/)**
  13. **[PNPM](https://pnpm.io/pt/)**
  14. **[TypeScript](https://www.typescriptlang.org/)**
  15. **[Vite](https://vitejs.dev/)**
  16. **[Vitest](https://vitest.dev/)**
  17. **[zod](https://zod.dev/)**

- **Tela de finalização**

<div align="center" >
      <img src="" width="400" alt="Tela de finalização - tema claro">_<img src="" width="400" alt="tema escuro">
</div>

---

## :truck: Entrega e distribuição continua

**<https://rocketshoes-sand.vercel.app>**

- Para a publicação da aplicação foi por meio da plataforma **[Netlify](https://www.netlify.com/)** onde é possível publicar de forma rápida, fácil e simples projetos React que estão hospedados no GitHub, GitLab, dentre outras plataformas de repositório remoto de graça.
- Com isso, o CI/CD já é aplicado automaticamente por meio dessa plataforma definindo a branch de produção, sempre que houver uma atualização nela, será gerado uma nova versão do projeto e já publicado.
- Além disso, podemos customizar o próprio endereço do site, adicionar ferramentas dentre outras funcionalidades facilmente.

<div align="center">
   <img src="" width="1000" alt="Projeto publicado no Netlify">
</div>

- **Meus Pedidos**

<div align="center" >
      <img src="" width="400" alt="Tela de meus pedidos - tema claro">_<img src="" width="400" alt="Tela de meus pedidos - tema claro">
      <img src="" width="400" alt="Tela de meus pedidos - tema claro">_<img src="" width="400" alt="Tela de meus pedidos - tema claro">
</div>

---

## :package: Como baixar e executar o projeto

### Baixar

- Clonar o projeto:

  ```bash
   git clone https://github.com/Aszurar/rocketshoes.git
  ```

- É necessário ter o Node.js e um gerenciador de pacotes, como o Yarn, instalados em seu sistema. Se você ainda não os tem, siga estas instruções:
  - [Instalação do NodeJS](https://nodejs.org/en/)
  - [Instalação do PNPM](https://pnpm.io/pt/)

- Instalação das dependências:
  - Execute o comando abaixo dentro da pasta do projeto

    ```bash
      pnpm i
    ```

### Execução

- Caso tudo tenha sido instalado com sucesso, basta executar na raiz do projeto:
- Caso esteja na branch **```feature/json-server```**:
  - Terminal 1: Executando front-end

    ```bash
      pnpm dev
    ```

  - Terminal 2: Executando servidor json

    ```bash
      pnpm dev:server
    ```

- Caso esteja na branch **```main```**:

    ```bash
      pnpm dev
    ```

<div align="center">

Desenvolvido por :star2: Lucas de Lima Martins de Souza.

</div>
