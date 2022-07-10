const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} = require("graphql")
const { projects, clients, ProjectType,  ClientType} = require("./../../data-store");

const RootQueryType = new GraphQLObjectType({
    name: "Root",
    description: "Root Query",
    fields: ()=> ({
        project: {
            type: ProjectType,
            description: "Returns A Single Project",
            args: {id:{type: GraphQLID}},
            resolve: (_,args)=> projects.find( proj => proj.id == args.id )
            
        },
        projects: {
            type: GraphQLList(ProjectType),
            description: "List of All Projects",
            resolve: ()=> projects
            
        },
        clients: {
            type: GraphQLList(ClientType),
            description: "List of All clients",
            resolve: () => clients
        },
        client: {
            type: ClientType,
            description: "Returns A Single Client",
            args: {id:{type: GraphQLID}},
            resolve: (_,args)=> clients.find( client => client.id == args.id )
            
        },
    })
});

module.exports = RootQueryType;