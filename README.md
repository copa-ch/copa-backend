<p align="center">
  <a href="https://copa-api.now.sh/" target="blank">
    <img src="resources/image/banner.png" alt="COPA Logo" />
  </a>
</p>

<p>
<a href="https://travis-ci.org/copa-ch/copa-backend"><img src="https://travis-ci.org/copa-ch/copa-backend.svg?branch=master" alt="travis-ci" /></a>
<a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="Sematic-Release" /></a>
</p>

## Description

This app manages your tournaments and generates the schedules.

## Documentation

The API documentation is generated with Swagger.
[API Documnentation](https://copa-api.now.sh/docs/)

## Installation

We recommand using [Homebrew](https://brew.sh/index_de) on your MAC or chocco on windows.

Install the following prerequisites with `brew`

```bash
# install NodeJS
brew install node

# install yarn
brew install yarn

# install mysql database
brew install mysql

```

Now we can install our dependencies with the following command.

```bash
$ yarn install
```

### Create your .ENV file

Copy the `.env.examle` and rename it to `.env`. In this file collects all the global configurations.

### Database setup

Create a database with the name `copa`. Then run `yarn run db:setup`. This will migrate the database and seed some data into it.

### Mail setup

Change the vairables in the `.env` to correct mail server and user credentials.

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Testing the app

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
