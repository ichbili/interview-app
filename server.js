import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';

import { schema } from './schema';
import { resolvers } from './resolvers';
import knexConfig from './knexfile';
import { serializeUser } from './lib';

dotenv.config();

const knex = Knex(
  process.env.NODE_ENV === 'production'
    ? knexConfig.production
    : knexConfig.development,
);

Model.knex(knex);

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

const PORT = process.env.PORT || 4000;
dotenv.config({ path: 'variables.env' });
const app = express();

// Adding Cors middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  credential: true
}
app.use(cors(corsOptions));


// bodyParser is needed just for POST.
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema: myGraphQLSchema }),
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen( PORT, () => {
  console.log(`Listening through ${PORT}`);
});