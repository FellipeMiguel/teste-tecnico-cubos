# CUBOS Movies

É um aplicativo web responsivo que consome a API do TMDB (The Movie Database). O aplicativo permite os usuários pesquisar por filmes e visualizar detalhes sobre cada filme, com uma experiência funcional e intuitiva.

## Funcionalidades

- **Pesquisa de Filmes:** Busca por título utilizando a API do TMDB
- **Detalhes Completos:** Visualização de informações detalhadas dos filmes:
  - Popularidade
  - Sinopse
  - Gêneros
  - Data de lançamento, duranção, situação e idioma origial
  - Orçamento, receita e lucro
  - Trailer oficial
- **Design Responsivo:** Adaptação perfeita para mobile e desktop
- **Sistema de Temas:** Alternância entre modo claro e escuro
- **Filtros Avançados:**
  - Ordenação por popularidade/nota
  - Filtragem por gênero
  - Filtragem por ano de lançamento

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/FellipeMiguel/teste-tecnico-cubos.git
```

2. Clone o repositório:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Uso

### Navegação Básica

1. **Página Inicial** (`/`):

   - **Pesquisar Filmes:**  
     Digite o nome do filme na barra de pesquisa no topo da página.
   - **Usar Filtros:**  
     Clique no ícone de filtro para:
   - Selecionar gênero(s)
   - Definir ano de lançamento
   - Ordenar por popularidade/nota
   - **Acessar Detalhes:**  
     Clique em qualquer card de filme para ver informações detalhadas.

2. **Página de Detalhes** (`/movie/:id`):
   - **Assistir Trailer:**  
     Se disponível, o trailer oficial será exibido no topo da página.
   - **Informações Financeiras:**  
     Verifique orçamento, receita e lucro na seção dedicada.
   - **Dados Técnicos:**  
     Consulte duração, data de lançamento e status de produção.
   - **Voltar à Home:**  
     Clique no logo ou use o botão "Voltar" do navegador.

## Capturas de Tela

### Página Inicial

| **Página inicial (Desktop)**                                                          | **Página inicial (Mobile)**                                                                                |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| <img src="./screenshots/home-dark-desktop.png" width="400" alt="Home no modo claro"/> | <img src="./screenshots/home-dark-mobile.png" width="200" alt="Home no modo escuro em dispositivo móvel"/> |
| _Barra de pesquisa, filtros e grid de filmes_                                         | _Layout adaptativo_                                                                                        |

### Página de Detalhes

| **Visão Geral (Desktop)**                                                        | **Trailer (Desktop)**                                                                        |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| <img src="./screenshots/movie-details.png" width="400" alt="Detalhes do filme"/> | <img src="./screenshots/movie-trailer.png" width="400" alt="Player de trailer incorporado"/> |
| _Informações técnicas e financeiras_                                             | _Trailer do filme em tela cheia_                                                             |

### Funcionalidades Chave

| **Filtros Ativos**                                                                 | **Paginação**                                                                     |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| <img src="./screenshots/filters.png" width="400" alt="Menu de filtros expandido"/> | <img src="./screenshots/pagination.png" width="400" alt="Controle de paginação"/> |
| _Filtragem por gênero e ano_                                                       | _Navegação entre páginas de resultados_                                           |

## Deploy

A aplicação está hospedada e pode ser acessada através do link:  
**🔗 [https://cubos-movies.vercel.app](https://cubos-movie-seven.vercel.app/)**

[![Vercel](https://img.shields.io/badge/Deploy_na_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://cubos-movies.vercel.app)

> _Nota: Para uso local ou desenvolvimento, siga as instruções de instalação acima._
