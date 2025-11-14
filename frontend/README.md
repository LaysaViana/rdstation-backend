# Desafio Técnico - Recomendador de Produtos RD Station

📌 Sobre o Projeto

Este desafio técnico da RD Station consiste em integrar a lógica de recomendação de produtos em uma aplicação web pré-existente, como parte do processo seletivo para desenvolvedor front-end.

- Aplicação web construída em React.js
- Integração de dados via json-server
- Estilização responsiva com Tailwind CSS

# 🎯 Objetivo

- 🔹 Criar código limpo, legível e de fácil manutenção
- 🔹 Implementar lógica de recomendação de produtos baseada nas preferências do usuário.
- 🔹 Garantir boa performance e cobertura de todos os casos de uso.
- 🔹 Integrar a funcionalidade ao front-end existente de forma modular e extensível

# 🛠 Tecnologias Utilizadas

| Tecnologia                    | Função                  |
| ----------------------------- | ----------------------- |
| React.js                      | Front-end               |
| json-server                   | Simulação de API REST   |
| Tailwind CSS                  | Layout e responsividade |
| Node.js versão 18 ou superior | Ambiente de execução    |
| Yarn                          | Gerenciador de pacotes  |

# ⚙ Requisitos Funcionais do desafio

- Receber preferências do usuário via formulário
- Retornar recomendações conforme as preferências selecionadas
- Modo SingleProduct: retorna um produto
- Modo MultipleProducts: retorna lista de produtos
- Em caso de empate, retornar o último produto válido
- Lidar com diferentes tipos de preferências
- Código modular, legível e extensível

# Como Executar o Projeto

Pré-requisitos
Node.js versão 18.3 ou superior
Yarn instalado

# Instalar dependências

```bash
yarn install
```

# Execute o script de instalação:

```bash
./install.sh
```

# Executando o Projeto

#### Frontend e Backend

```bash
yarn start
```

#### Executar individualmente

```bash
# Backend
yarn start:backend

# Frontend
yarn start:frontend
```

A aplicação disponível em:

- **Frontend:** <http://localhost:3000>
- **Backend API:** <http://localhost:3001>

# Scripts Disponíveis

| Scripts                       | Descrições                                |
| ----------------------------- | ----------------------------------------- |
| `yarn dev`                    | Inicia frontend e backend simultaneamente |
| `yarn start:frontend`         | Inicia apenas o frontend (porta 3000)     |
| `yarn start:backend`          | Inicia apenas o backend (porta 3001)      |
| `yarn test:frontend`          | Executa os testes unitários               |
| `yarn test:coverage:frontend` | Executa testes com cobertura              |

# Layout - Contemplando Theme Claro / Theme Escuro

![Screenshot tema claro](./.github/demo/screen.png)
![Screenshot tema escuro](./.github/demo/screen-dark.png)
![Screenshot recomendação](./.github/demo/recomendacao-unica.png)
![Screenshot tema claro](./.github/demo/recomendacao-multi.png)

## 🎯 Critérios de Aceite

1. Receber preferências do usuário via formulário
2. Retornar recomendações baseadas nas preferências
3. Modo "SingleProduct": retornar um produto
4. Modo "MultipleProducts": retornar lista de produtos
5. Em caso de empate, retornar o último produto válido
6. Lidar com diferentes tipos de preferências
7. Serviço modular e extensível

## 🎨 Critérios Extras - UI/UX

- Melhorias de layout e tela no geral
- Aplicar RD Station fontes (DM Sans e RedHatDisplay)
- Criar um switch para escolha de tema
- Adicionar logo da RD Station no layout

### Integração Contínua (GitHub Actions)

O projeto utiliza **GitHub Actions** para automatizar verificações de qualidade a cada push ou pull request.

### Executando os Testes

```bash
# Executar todos os testes
yarn test

# Executar testes com cobertura
yarn test:coverage

# Executar testes em modo watch
yarn test --watch
```

## Desenvolvido por

Laysa Viana
