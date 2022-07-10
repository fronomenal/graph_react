const express = require("express");
const { graphqlHTTP} = require("express-graphql");
const cors = require('cors');
const colors = require('colors');

const connectDB = require('./config/db');
const schema = require("./schema")

if (!process.env.NODE_ENV) require("dotenv").config();


const app = express();

connectDB();

app.use(cors());
app.use("/graphql", graphqlHTTP({
    graphiql: (process.env.NODE_ENV == "development") ? true : false,
    schema,
}));

app.listen(process.env.PORT, ()=> {
    console.log("listening on port: "+ process.env.PORT)
});