const { GraphQLSchema } = require("graphql");
const {RootQueryType, RootMutateType} = require("./rootTypes")

schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutateType
});

module.exports = schema;