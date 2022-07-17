<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição
- Api para análise de amostras toxicológicas, ela recebe a amostra e testa, contra um banco interno, se a concentração das substâncias é um retorno positivo ou negativo. 
- Armazena todas as amostras em um banco.

## Tecnologias usadas
- NodeJs v16.15
- Yarn v1.22
- Docker-compose v3.8
- MariaDB v10.7
- NestJS

## Instalação

```bash
$ yarn install
```

## Executando aplicação

- Copiar .env.example e preencher com informações do banco.
```bash
$ cp .env.example .env
```
- Subir o docker com o banco:
```bash
# subir banco
$ yarn db:up
```
- Após banco estar funcionando rodar um dos seguintes comandos:
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Testes

- Para testes alterar .env para DB_TEST=true, dessa forma ele irá deletar as tabelas em cada teste.
- __NÃO RODAR EM PRODUÇÃO__
- De preferência utilizar um banco diferente para os testes.
```bash
# e2e tests
$ yarn test:e2e
```
# Instruções

## Inserir amostra
- Para inserir uma amostra enviar uma requisição POST para /samples com os dados no seguinte formato:
```JSON
{
    "sample_code": "02383335",
    "cocaine": 0.678,
    "amphetamine": 0.1,
    "methamphetamine": 0.1,
    "mda": 0.1,
    "mdma": 0,
    "thc": 0.1,
    "morphine": 0.1,
    "codeine": 0.1,
    "heroine": 0.1,
    "benzoylecgonine": 1,
    "cocaethylene": 0,
    "norcocaine": 0
}
```
- Os dados podem ser enviados como x-www-form-urlencoded utilizando os mesmos nomes.
- Ele irá retornar o código da amostra, se é positiva e as substâncias positivas.

## Ver todas as amostras cadastradas
- Para ver amostras cadastradas fazer uma requisição GET para /samples.
- Ele irá retornar todas as amostras com código, data cadastrada e resultado.

## Ver uma amostra
- Para ver uma amostra específica fazer uma requisição GET para /samples/:codigo_amostra.
- Irá retornar a amostra com código, resultado e as substâncias positivas.
