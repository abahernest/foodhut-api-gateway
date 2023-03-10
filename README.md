## Description

[Nest](https://github.com/nestjs/nest) Base API Gateway for FoodHut; A simple food ordering application.

### Microservices

[Order Processing Service](https://github.com/abahernest/foodhut-order-processing-microservice) Order creation and updates.

[Dispatch Service Service](https://github.com/abahernest/foodhut-dispatch-microservice) Updates dispatch status of the order.

### Shared Repository For gRPC Protocol Buffer Files


[Proto Repo](https://github.com/abahernest/foodhut-grpc-proto) Proto files shared across the api gateway and 2 microservices

## Environment Setup

1. Ensure Node and Yarn are Installed

2. Ensure Protocol buffers are installed (Optional)

```bash
# for mac users
$ brew install protobuf

# for linux users
sudo apt install protobuf-compiler
```

3. Ensure Postgres Is Installed


## Installation & Project Setup

1. Install Dependencies
```bash
$ yarn install
```

2. Generate fresh protobuf files (Optional)
```bash
$ yarn proto:install && yarn proto:all
```

## Configure Database

1. Create a `.env` file from the data in `.env.example` file 

2. Update `.env` file with database information that you've configured for the project


## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## DB Migrations

```bash
# generate migration
$ yarn generate:migration -- db/migrations/<migration_name>

# run migration
$ yarn run:migration

# revert migration
$ yarn revert:migration
```
