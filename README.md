# Animals

Create an app which allows you to perform a set of actions on animals. You can add, edit and retrieve animal records.

## Objectives

* Create an endpoint: /animals

GET
should return all animals previously send to the app

POST
should post an animal or animals to database

* Create an endpoint: /animals/:id

GET
should return an animal by id

PUT
should update animal info

DELETE
should delete animal from database


## Technologies

Project is created with:

* Node.js
* NestJs
* Express.js
* TypeScript
* Zod
	
## Setup
To run this project, install it locally using npm:

```
# Clone the project
$ git clone https://github.com/dzgierski19/AnimalsAPI.git

# Go to the project directory
$ cd ANIMALS-API

# Install dependencies
$ npm install

# Start the server
$ npm run start

```


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# migrations
$ npm run migrations

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

