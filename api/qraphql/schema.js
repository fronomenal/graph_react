const { GraphQLObjectType, GraphQLString, GraphQLList} = require("graphql")
const { projects, clients, ProjectType,  ClientType} = require("./../../data-store");

const RootQueryType = new GraphQLObjectType({
    name: "Root",
    description: "Root Query",
    fields: ()=> ({
        projects: {
            type: GraphQLList(ProjectType),
            description: "List of All Projects",
            resolve: ()=> projects
            
        },
        clients: {
            type: GraphQLList(ClientType),
            description: "List of All clients",
            resolve: () => clients
        }
    })
});

module.exports = RootQueryType;