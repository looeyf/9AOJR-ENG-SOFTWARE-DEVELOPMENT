# To-Do Service API - Engineering Software Development

Este é um projeto de API de To-Do desenvolvido como parte do curso de Engineering Software Development. A aplicação segue uma arquitetura em camadas (Controller, Service, Repository) e utiliza TypeScript com Express.

## Tecnologias Utilizadas

- **Node.js** (Ambiente de execução)
- **Express** (Framework web)
- **TypeScript** (Linguagem)
- **Jest** (Framework de testes)
- **Supertest** (Testes de integração HTTP)

## Estrutura do Projeto

A estrutura de pastas do projeto segue o padrão de responsabilidades:

- `src/@types`: Definições de tipos e interfaces TypeScript.
- `src/controllers`: Camada de entrada, lida com requisições HTTP e retorno de respostas.
- `src/services`: Camada de regras de negócio.
- `src/repositories`: Camada de persistência (atualmente em memória).
- `src/routes`: Definição das rotas da API.
- `src/app.ts`: Configuração do Express.
- `src/server.ts`: Ponto de entrada para iniciar o servidor.

## Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório.
2. No diretório raiz, instale as dependências:
   ```bash
   npm install
   ```

### Execução

- **Modo de Desenvolvimento (com auto-reload):**
  ```bash
  npm run dev
  ```
  O servidor estará rodando em `http://localhost:3000`.

- **Build de Produção:**
  ```bash
  npm run build
  npm start
  ```

## Como Testar

O projeto possui testes unitários e de integração implementados com Jest.

- **Executar todos os testes:**
  ```bash
  npm test
  ```

- **Executar testes em modo watch:**
  ```bash
  npm run test:watch
  ```

- **Verificar cobertura de testes:**
  ```bash
  npm run test:coverage
  ```

## Endpoints da API

- `GET /todos`: Lista todas as tarefas.
- `POST /todos`: Cria uma nova tarefa.
  - Body: `{ "title": "string", "description": "string" }`
- `PUT /todos/:id`: Atualiza o status de uma tarefa.
  - Body: `{ "isCompleted": boolean }`
- `DELETE /todos/:id`: Remove uma tarefa pelo ID.
