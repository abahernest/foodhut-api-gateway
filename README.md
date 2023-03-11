## Description

[FoodHut App](https://github.com/abahernest/foodhut-api-gateway) Base API Gateway for FoodHut; A simple food ordering application.

### Microservices

[Order Processing Service](https://github.com/abahernest/foodhut-order-processing-microservice) Order creation and updates.

[Dispatch Service Service](https://github.com/abahernest/foodhut-dispatch-microservice) Updates dispatch status of the order.

### Shared Repository For gRPC Protocol Buffer Files

[Proto Repo](https://github.com/abahernest/foodhut-grpc-proto) Proto files shared across the api gateway and 2 microservices

### Project Technical Areas

1. TypeScript ✅
2. NestJs ✅
3. Type ORM ✅
4. gRPC ✅
5. AWS Fargate ❌
6. Unit Testing & Mocking using Jest ❌

### Decisions Made & Explanation

1. The Base Service Handles all 4 Http Requests (Add Order, Update Order, Fetch All Order, Delete Order); 2 of which ( Add Order, Update Order Address) are routed to the Order-Processing Service and Dispatch Service through a gRPC connection.

2. The API Gateway Recieves the Order information and sends to the Order-Processing Service to Process the Order.

3. The same controller in the Api Gateway also sends the `id` of the created Order to the Dispatch Service For Tracking.

4. I implemented a cronJob in the Order-Processing Service to update the `status` of the Order to 'processing` after 5 minutes and `completed` after 10 minutes of Order creation

5. I also implemented a cronJob in the Dispatch Service to update the `dispatched` field of the Order to `true` after 7 minutes of receiving the created Order ID.

6. The Endpoint to Update Order `address` fails gracefully if the order status is `completed` or dispatched field is `true`.

7. The Api Gateway handles request to `Fetch All Orders` and `Delete Orders`.

8. I implemented a `Soft Delete` for Orders such that deleted orders aren't removed from the DB. Instead a `deletedAt` field is set to the date the request was made.

9. I ensured the 3 services connected to a central postgres database, with the Api Gateway in charge of making migrations.

10. I used a shared repository to distribute the proto files among the 3 services. With a script in the `package.json` file, the github repo is installed as a package in the `node_modules` folder. Hence, providing a single source of truth for our proto files.

## Postman Doc

[Postman Doc](https://documenter.getpostman.com/view/11044390/2s93JtQ44t)


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
