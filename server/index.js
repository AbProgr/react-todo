'use strict'

// ---------external modules---------
const express = require('express');
const express_graphql = require('express-graphql');
const cors = require('cors');

// --------internal modules----------
const db = require('./db');
const schema = require('./graphQl/schema');
const resolvers = require('./graphQl/resolvers');

// Create an express server and a GraphQL endpoint
const app = express();

// enable cors as react will be served on other page
app.use(cors());

// integrate graphql with express route
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

// start express server
app.listen(4000, () => console.log('Express GraphQL Server On localhost:4000/graphql'));

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});