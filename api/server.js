const express = require("express");
const { graphqlHTTP} = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const {RootQueryType, RootMutateType} = require("./qraphql/schema")

if (!process.env.NODE_ENV) require("dotenv").config();

schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutateType
});

const app = express();

app.use("/graphql", graphqlHTTP({
    graphiql: (process.env.NODE_ENV == "development") ? true : false,
    schema,
}));

app.listen(process.env.PORT, ()=> {
    console.log("listening on port: 8080")
});