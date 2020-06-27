# Service and Repository Patterns with Typescript

A simple CRUD project in Node, Express and Typescript to practice concepts like SOLID principles and architectural patterns.

### Prerequisites

Node.js and a package manager like npm or yarn.

### Installing

Run `npm install` or `yarn` to install all the dependencies.
Run `npm run dev` or `yarn dev:server` to run the server.

## Getting Started

The following endpoints can be tested with this server:

To list github repositories:
    GET http://localhost:3333/transactions

To create a repository (the body receives title (string), value (number) and type ('income' | 'outcome')):
    POST http://localhost:3333/transactions

## Running the tests

Run `npm test` or `yarn test` to run all the automated tests.
