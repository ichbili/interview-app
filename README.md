## Frontend Integration by ichbili
* Use: `npm run dev` to run developement
* I added CORS middleware on the backend
* Ensure that you have an environement variable on the client side `SKIP_PREFLIGHT_CHECK=true`: it's a tweek to manage different versions of `babel-loader` in the client and the backend
* Still a lot of styling to do
* React Login and signup are ok
* Next step it's to integrate fullstack session mangement
* Any question?


# Backend Interview

This is a backend for React/GraphQL interviews

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before you can use the backend, you need to install these packages/tools:

```
yarn
nodemon
knex
PostgreSQL
```

### How to use

Once you install the packages and tools above, cd into the project directory and run

```
yarn
```

Once it finishes installing related packages, run

```
yarn start
```

then open a browser and navigate to :

```
http://localhost:3000/graphiql
```

Now you can run your GraphQL queries and mutations.
