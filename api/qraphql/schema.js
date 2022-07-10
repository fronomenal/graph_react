const { GraphQLSchema, GraphQLObjectType, GraphQLString} = require("graphql")

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "HW",
        fields: ()=> ({
            message: {
                type: GraphQLString,
                resolve: ()=> "Hello, Graph World!"
            }
        })
    })
})

module.exports = schema;