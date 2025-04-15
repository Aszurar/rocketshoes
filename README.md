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
    <img src="https://i.imgur.com/yovUHTu.png" width="1000" alt="Banner">
</div>

## RocketShoes

1. O projeto **RocketShoes** que simula um e-commerce de calçados, onde podemos **adicionar**, **remover** e **editar** itens no carrinho, além de **finalizar** a compra.
2. O site foi publicado com CI/CD por meio da plataforma **[Vercel](https://vercel.com/)**.
3. Acesse e teste o projeto em: **<https://rocketshoes-aszurar.vercel.app>**

  <div align="center">
    <h3><a href="https://rocketshoes-aszurar.vercel.app">RocketShoes</a></h3>


https://github.com/user-attachments/assets/6be6142d-5320-400b-855b-1a9b92096823


  </div>

<div align="center">

[![GitHub deployments](https://img.shields.io/github/deployments/Aszurar/rocketshoes/production?logo=vercel&logoColor=white&label=Vercel&labelColor=black)](https://vercel.com/aszurars-projects/rocketshoes) [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) [![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)](https://www.cypress.io/) [![Vitest](https://img.shields.io/badge/-Vitest-739b1b?style=for-the-badge&logo=vitest&logoColor=white&link=https://www.typescriptlang.org/)](https://vitest.dev/) [![React](https://img.shields.io/badge/-React-%2320232a.svg?style=for-the-badge&logo=react&link=https://react.dev)](https://react.dev/) [![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)](https://motion.dev/) [![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)  [![TanStack Query](https://img.shields.io/badge/-TanStack_React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)](https://tanstack.com/query/latest) [![TanStack Virtual](https://img.shields.io/badge/-TanStack_React%20Virtual-a854f7?style=for-the-badge&logo=react%20query&logoColor=white)](https://tanstack.com/virtual/latest) [![TanStack Table](https://img.shields.io/badge/-TanStack_React%20Table-3c82f6?style=for-the-badge&logo=react%20query&logoColor=white)](https://tanstack.com/table/latest) [![AXIOS](https://img.shields.io/badge/-AXIOS-5a29e4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/ptbr/)  [![TypeScript](https://img.shields.io/badge/-TypeScript-%23007ACC?style=for-the-badge&logo=typescript&logoColor=white&link=https://www.typescriptlang.org/)](https://www.typescriptlang.org/) [![JavaScript](https://img.shields.io/badge/-JavaScript-%23323330.svg?style=for-the-badge&logo=javascript&link=https://www.javascript.com/)](https://www.javascript.com/) [![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white&link=https://developer.mozilla.org/pt-BR/docs/Web/HTML)](https://developer.mozilla.org/pt-BR/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&link=https://www.w3schools.com/css/)](https://www.w3schools.com/css/) [![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)](https://pnpm.io/pt/)
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
    <img src="https://i.imgur.com/Q06HxsN.gif" width="500" alt="Gif mostrando o projeto">
</div>

<div align="center" >

**[Vídeo no Youtube](https://www.youtube.com/watch?v=psCze1_Xr1Q)**

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

<div align="center" gap=12>
      <img src="https://i.imgur.com/xhupl3M.png" width="400" alt="Tela Inicial no tema claro"><img src="https://i.imgur.com/nKG5XdQ.png" width="400" alt="Tela Inicial no tema escuro">
</div>

---

## :interrobang: Motivo

- O objetivo do projeto é:

  1. Praticar o uso do **Redux** para o **gerenciamento e manipulação do Estado** do carrinho
      - Usamos o **[Redux Toolkit](https://redux-toolkit.js.org/)** em conjunto com o **[React Redux](https://react-redux.js.org/)** implementação do reducer e actions do carrinho.
  2. Usamos o **[TanStack Query](https://tanstack.com/query/latest)** para o consumo de dados e otimização com **gerenciamento de cache** em conjunto com **[axios](https://axios-http.com/ptbr/docs/intro)**.
  3. Usamos o  **[TanStack - Table](https://tanstack.com/table/latest)** para a criação da tabela produtos no carrinho com **ordenação**, **busca** e **paginação** dos itens e uma manipulação mais robusta e componente agnóstico, que pode ser usado em qualquer projeto e tabela.
  4. Usamos o **[TanStack - React Virtual](https://tanstack.com/virtual/latest)** para **otimização** de listagens e criamos 2 componentes agnósticos de **virtualização** de listagens:
      1. **```<VirtualizedGridList/>```** - Para renderização listagens organizadas em grid, **+ de 1 coluna**.
      2. **```<VirtualizedList/>```** - Para renderização listagens organizadas em flex-col, **1 coluna**.
  5. Usamos o **[React Router Dom](https://reactrouter.com/home)** para a navegação entre as páginas.
  6. Usamos do **[Vitest](https://vitest.dev/)** para **testes unitários** nas funções de **manipulação** do Estado global no Redux.
  7. Usarmos o **[Cypress](https://www.cypress.io/)** para realizar **testes(E2E)** e automatizá-los pelo **[GitHub Actions](https://github.com/features/actions)**.
  8. Usamos o **[framer-motion](https://motion.dev/)** para implementação de animações de layouts básicas.
  9. Criamos a interface com **[shadcn/ui](https://ui.shadcn.com/)** e **[tailwindcss](https://tailwindcss.com/docs/installation/using-vite)** e usamos **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** em conjunto com  **[clsx](https://github.com/lukeed/clsx)** e **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)**.
  10. Melhoramos o SEO do projeto com **[React-Helmet-Async](https://github.com/staylor/react-helmet-async#readme)**
  11. Melhoras a acessibilidade usando o **[@axe-core/react](https://github.com/dequelabs/axe-core-npm?tab=readme-ov-file#readme)** para revisar os elementos e componentes com as diretrizes de acessibilidade estabelecidas no **[WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)** estabelecidas pelo **[W3C](https://www.w3.org/)**.

### O que aprendi de novo?

  1. Criação de **tabelas funcionais** com **[TanStack - Table](https://tanstack.com/table/latest)**
  2. Criação de **listagens virtuais** com **[TanStack - React Virtual](https://tanstack.com/virtual/latest)**
  3. Animações de **saída de layout** com **[framer-motion](https://motion.dev/)**
  4. Animações só com **[TailwindCSS](https://tailwindcss.com/)**
  5. Configuração do **[Cypress](https://www.cypress.io/)** para projetos Vite.

### Carrinho

<div align="center">
  <img src="https://i.imgur.com/iTdHrik.png" width="400" alt="Carrinho cheio no modo claro">_<img src="https://i.imgur.com/rFqQI5Q.png" width="400" alt="Carrinho cheio no modo escuro">
</div>

<div align="center">
    <img src="https://i.imgur.com/2XfQCcr.png" width="400" alt="Carrinho vazio no modo claro">_<img src="https://i.imgur.com/tf5EW4A.png" width="400" alt="Carrinho vazio no modo escuro">
</div>

---

## :art: Design

- Não temos um figma do design em si, mas é do desafio Rocketshoes da trilha React da Rocketseat

<div align="center">
  <h3>RocketShoes</h3>
</div>

---

## :seedling: Requisitos Mínimos

  1. NodeJS
  2. ReactJS
  3. Vite
  4. PNPM

### Tela de Finalização

<div align="center" >
      <img src="https://i.imgur.com/YKLmLEb.png" width="400" alt="Tela de finalização - tema claro">_<img src="https://i.imgur.com/kj95g9S.png" width="400" alt="tema escuro">
</div>

---

## :rocket: Tecnologias Utilizadas

- O projeto foi desenvolvido utilizando as seguintes tecnologias:

  1. **[axios](https://axios-http.com/ptbr/docs/intro)**
  2. **[axe-core/react](https://www.npmjs.com/package/@axe-core/react)**
  3. **[Framer Motion](https://www.framer.com/motion/)**
  4. **[JavaScript](https://developer.mozilla.org/pt1.BR/docs/Web/JavaScript)**
  5. **[Json Server](https://github.com/typicode/json-server)**
  6. **[NodeJS](https://nodejs.org/en/)**
  7. **[Lucide Icons](https://phosphoricons.com/)**
  8. **[Lottie Files](https://lottiefiles.com/)**
  9. **[React](https://pt1.br.react.dev/)**
  10. **[React Helmet Async](https://github.com/staylor/react-helmet-async#readme)**
  11. **[React Router Dom](https://reactrouter.com/web/guides/quick-start)**
  12. **[React Redux](https://react-redux.js.org/)**
  13. **[Redux Toolkit](https://redux-toolkit.js.org/)**
  14. **[React Toastify](https://fkhadra.github.io/react-toastify/introduction)**
  15. **[TailwindCSS](https://tailwindcss.com/)**
  16. **[TanStack Query](https://tanstack.com/query/latest)**
  17. **[TanStack Table](https://tanstack.com/table/latest)**
  18. **[TanStack Virtual](https://tanstack.com/virtual/latest)**
  19. **[TypeScript](https://www.typescriptlang.org/)**
  20. **[Vercel](https://vercel.com/)**
  21. **[Vite](https://vitejs.dev/)**
  22. **[Vitest](https://vitest.dev/)**
  23. **[zod](https://zod.dev/)**

### Responsividade

<div align="center" >
      <img src="https://i.imgur.com/Hjfbmqf.png" width="200" alt="Tela inicial responsiva - tema claro">_<img src="https://i.imgur.com/gVaz9Pr.png" width="200" alt="Tela inicial responsiva - tema escuro">_<img src="https://i.imgur.com/gYAz0Pq.png" width="200" alt="Pesquisa responsiva - tema claro">_<img src="https://i.imgur.com/OcGKf2j.png" width="200" alt="Pesquisa responsiva - tema escuro">
</div>

<div align="center" >
      <img src="https://i.imgur.com/2K1hUz6.png" width="200" alt="Tela de carrinho responsiva - tema claro">_<img src="https://i.imgur.com/vydFSqM.png" width="200" alt="Tela  de carrinho responsiva - tema escuro">_<img src="https://i.imgur.com/efiFrJE.png" width="200" alt="Carrinho vazio responsiva - tema claro">_<img src="https://i.imgur.com/lbxO1Pa.png" width="200" alt="Carrinho vazio responsiva - tema escuro">
</div>

---

## :truck: Entrega e distribuição continua

**<https://rocketshoes-sand.vercel.app>**

- Para a publicação da aplicação foi por meio da plataforma **[Vercel](https://vercel.com/)** onde é possível publicar de forma rápida, fácil e simples projetos React e Next que estão hospedados no GitHub, GitLab, dentre outras plataformas de repositório remoto de graça.
- Com isso, o CI/CD já é aplicado automaticamente por meio dessa plataforma definindo a branch de produção(**[feature/no-json-server](https://github.com/Aszurar/rocketshoes/tree/feature/no-json-server)**), sempre que houver uma atualização nela, será gerado uma nova versão do projeto e já publicado.
- Além disso, podemos customizar o próprio endereço do site, adicionar ferramentas dentre outras funcionalidades facilmente.

<div align="center">
   <img src="https://i.imgur.com/tNtK2NE.png" width="1000" alt="Projeto publicado no Vercel">
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

- É necessário definir as variáveis de ambiente:
  
  ```bash
      VITE_API_URL=
      VITE_ENABLE_API_DELAY=
  ```

### Execução

- Caso tudo tenha sido instalado com sucesso, basta executar na raiz do projeto:
- Caso esteja na branch **[main](https://github.com/Aszurar/rocketshoes/tree/main)**
  - Terminal 1: Executando front-end

    ```bash
      pnpm dev
    ```

  - Terminal 2: Executando servidor json

    ```bash
      pnpm dev:server
    ```

- Caso esteja na branch **[feature/no-json-server](https://github.com/Aszurar/rocketshoes/tree/feature/no-json-server)**:

    ```bash
      pnpm dev
    ```

<div align="center">

Desenvolvido por :star2: Lucas de Lima Martins de Souza.

</div>
