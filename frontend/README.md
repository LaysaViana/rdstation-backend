# Desafio Técnico - Recomendador de Produtos RD Station

[![DEMO](https://img.shields.io/badge/Acessar%20Projeto-4CAF50?style=for-the-badge)](https://rdstation-technical-challenge-front.vercel.app/)

## 📌 Sobre o Projeto

Este repositório contém a implementação do desafio técnico da RD Station, cujo objetivo é desenvolver um módulo de recomendação de produtos integrado a uma aplicação React já existente. Como parte do processo seletivo para Pessoa Engenheira de Software Frontend Júnior - React (vaga exclusiva para mulheres).

## A solução inclui:

- Aplicação web construída em React.js
- Integração de dados via json-server
- Estilização responsiva com Tailwind CSS
- Backend simulado via json-server
- Código modular, legível e facilmente extensível

## Objetivos do Desafio

- 🔹 Criar uma experiência clara e fluida para seleção de preferências
- 🔹 Implementar lógica de recomendação (Single e Multiple Products)
- 🔹 Garantir legibilidade, reutilização e facilidade de manutenção
- 🔹 Integrar o serviço ao frontend existente de forma não intrusiva
- 🔹 Tratar empates e diferentes categorias de preferências

# Demonstração

![Demonstração do Projeto](./public/desktop2.gif)

<p align="center">
  <img src="./public/mobile.gif" alt="Demonstração do Projeto" width="300" />
</p>

## Tecnologias Utilizadas

| Tecnologia                    | Função                  |
| ----------------------------- | ----------------------- |
| React.js                      | Front-end               |
| json-server                   | Simulação de API REST   |
| Tailwind CSS                  | Layout e responsividade |
| Node.js versão 18 ou superior | Ambiente de execução    |
| Yarn                          | Gerenciador de pacotes  |

# ⚙ Requisitos Funcionais

- Receber preferências e funcionalidades via formulário
- Recomendar produtos com base nos critérios informados
- Modo SingleProduct: retorna um único produto
- Modo MultipleProducts: retorna uma lista
- Em empates, retorna o último item válido
- Lidar com múltiplos tipos de preferências
- Organização modular e extensível do código

## Critérios de Aceite

1. Formulário funcional
2. Regras de recomendação implementadas
3. Suporte aos dois modos (individual e múltiplo)
4. Empate resolvido corretamente
5. Código limpo, reaproveitável e bem isolado
6. Facilidade de manutenção e extensões futuras

## UI/UX — Melhorias Adicionais

- Layout refinado com Tailwind + Glassmorphism
- Temas claro/escuro (switch integrado)
- Responsividade aprimorada para telas pequenas
- Logo e identidade visual inspirada na RD Station

## Possíveis Melhorias Futuras

- Deixar o header estático (sticky)
- Manter o cabeçalho fixo no topo melhora a navegação e garante acesso constante ao seletor de tema e elementos principais da interface, especialmente em telas menores.
- Estilizar a cor dos checkboxes

## Como Executar o Projeto

Pré-requisitos
Node.js versão 18.3 ou superior
Yarn instalado

## Instalar dependências

```bash
yarn install
```

## Execute o script de instalação:

```bash
./install.sh
```

## Executando o Projeto

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

### Integração Contínua

O projeto utiliza **GitHub Actions** para:

- Execução automática de testes
- Verificação de build
- Garantia de qualidade a cada push ou PR

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

Laysa Viana - 2025
