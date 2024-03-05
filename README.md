# POC - API de Vagas

Código base para o exercício do programa Starter Web Full-Stack - Growdev

Módulo - Arquitetura de Software

## Configuração do projeto (localhost)

1. Replicar o arquivo .env.example em um arquivo .env
2. Setar as variáveis:

- a. PORT: valor numérico para a porta que o express irá rodar.
- b. DB_URL: string com a URL do banco de dados.

3. Rodar as migrations com o comando `yarn migration:run`
4. Rodar o servidor com o comando `yarn dev`

## Dev guideline

O projeto é baseado em features, sendo que cada feature possui uma arquitetura bem definida. A pasta `src/main` possui arquivos de configuração do projeto, enquanto o diretório `src/app` contém os arquivos referentes a aplicação em si, como as features, os models e os helpers.

### Features

Para cada feature deve ser criado o diretório: `src/app/features/<feature>`, sendo `<feature>` o nome da funcionalidade que será desenvolvida. Exemplo: para a feature User, criar o diretório `src/app/features/user`.

Cada feature é composta pelos seguintes componentes:

1. **Model**: define as modelagens necessárias para a feature, com base na POO pura (sem dependência externas, como BD). Os models devem ser escritos na pasta `src/app/models`.
2. **Entity**: define as modelagens ao nível de banco de dados (typeorm). Devem ser escritos na pasta `src/app/shared/entities`
3. **Repository**: camada de operações da feature com o banco de dados. Devem ser escritos na pasta `src/app/features/<feature>/repository`. Os métodos no repository seguem as seguintes regras:

- 3.1. O tipo de entrada de dados deve ser: (a) um model; ou (b) um DTO.
- 3.2 O tipo de retorno deve ser: (a) um model ou (b) um tipo primitivo (p.ex. boolean).
- 3.3 O tipo de retorno NUNCA deve ser uma Entity.

4. **Usecase**: camada de regras de negócio da feature. Devem ser escritos na pasta `src/app/features/<feature>/usecases`. Os usecases devem seguir as regras:

- 4.1. O tipo de entrada de dados deve ser um DTO.
- 4.2. O tipo de retorno de dados deve ser também um DTO (usar o método `.toJson()` do model).
- 4.3. O tipo de retorno de dados NUNCA deve ser um model ou - pior ainda - uma Entity.
- 4.4. O usecase pode chamar repositories e/ou outros usecases.
- 4.5. O usecase NUNCA deve saber o que é uma entity.

5. **Controller**: camada que recebe requisições das rotas de API e invocam os respectivos usecases. Devem ser escritos na pasta `src/app/features/<feature>/controllers`. Seguir as regras:

- 5.1. Receber `req`/`res` do express (não é necessário o uso de adapters).
- 5.2. SEMPRE usar um `try/catch` para capturar exceções no procesamento.
- 5.4. Usar os HTTP Helpers em `src/app/shared/util` para evitar repetição de código.
- 5.3. Em caso de exception, retornar erro `5xx` correspondente.
- 5.5. Em caso de falha, retornar erro `4xx` correspondente.
- 5.6. Em caso de sucesso, retornar erro `2xx` correspondente

6. **Validators**: abc.

7. **Routes**: Define arquivos com as rotas de API correspondentes a feature. Devem ser escritos na pasta `src/app/features/<feature>/routes`.

### Step-by-step: nova feature

Para construir **uma feature do zero**, tomando como base um requisito desta funcionalidade, seguir a sugestão abaixo:

1. Começar pela construção dos models
2. Definir as entities
3. Desenvolver o repository com o método correspondente à funcionalidade
4. Desenvolver o usecase do requisito
5. Desenvolver o controller do requisito
6. Desenvolver os validators para o requisito
7. Definir a rota do requisito
8. Cadastrar o arquivo de rotas na config do express
9. Criar/gerar as migrations
10. Rodar as migrations criadas
11. Rodar um teste do requisito no Postman/Insomnia

### Step-by-step: feature existente

Para construir um requisito em uma feature já existente, seguir a sugestão abaixo:

1. Criar/Atualizar os models, caso necessário
2. Criar/Atualizar as entities, se necessário
3. Desenvolver o método correspondente à funcionalidade no repository
4. Desenvolver o usecase do requisito
5. Desenvolver o controller do requisito
6. Desenvolver os validators para o requisito
7. Definir a rota do requisito
8. Criar/gerar migrations, em caso de mudança/criação de entities
9. Rodar as migrations, caso tenha sido criada no passo 9
10. Rodar um teste do requisito no Postman/Insomnia

## Modelagem

### Modelo lógico

<img src="docs/database/logical.png" height=360 alt="Modelo logico" />
