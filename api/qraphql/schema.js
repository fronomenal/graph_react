const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull} = require("graphql")
const { projects, clients, ProjectType,  ClientType} = require("./../../data-store");

const RootQueryType = new GraphQLObjectType({
    name: "Query",
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

const RootMutateType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation for Creates, Updates and Deletes",
    fields: ()=> ({
        createProject: {
            type: ProjectType,
            description: "Adds A Single Project",
            args: {
                clientId:{type: GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLNonNull(GraphQLString)},
                description:{type: GraphQLNonNull(GraphQLString)},
                completed:{
                    type: GraphQLString,
                    defaultValue: false
                }
            },
            resolve: (_,args)=> {
                const insert = {id: projects.length, clientId: args.clientId, name:args.name , description:args.description, completed:args.completed};
                projects.push(insert);
                return insert;
            }
            
        },
        createClient: {
            type: ClientType,
            description: "Adds A Single Client",
            args: {
                name:{type: GraphQLNonNull(GraphQLString)},
                email:{type: GraphQLNonNull(GraphQLString)},
                phone:{type: GraphQLNonNull(GraphQLString)},
            },
            resolve: (_,args)=> {
                const insert = {id: clients.length, name:args.name , email:args.description, phone:args.phone};
                clients.push(insert);
                return insert;
            }
        },
    })
});

module.exports = {RootQueryType, RootMutateType};