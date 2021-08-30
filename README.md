# Advanced TodoList

## Description

-   built with typescript
-   designed according to hexagonal architecture principles
-   REST-api is going to be implemented with [Nest](https://github.com/nestjs/nest) framework

## dev notes

-   builder classes are used in non-classic way. They are just to compose corresponding entities in a single correct way. Thats why they dont implement classic builder interfaces like `{setName(), setAge(), etc()}`.
-   input/result in use cases like req/res, but separated from http context

## Roadmap / To be done:

-   ensure singleton scopes for injectable (when needed)
-   move secondary-ad/services to src-level
-   auto snake-case transform
-   use command-query. A command can be used to validate input
-   add DI container wrapper
-   extract mapper-feature to separate component
-   CQRS pattern
-   caching
-   dedicated password encryption
-   mfa
-   docker-compose infrastructure description
-   cloudformation template
-   terraform file
-   bunch of tests
    -   unit
    -   acceptance

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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Project is [MIT licensed](LICENSE).
