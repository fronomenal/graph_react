const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull} = require("graphql")
const { ProjectType,  ClientType} = require("./cusTypes");

const Project = require("../models/Project")
const Client = require("../models/Client")

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: ()=> ({
        project: {
            type: ProjectType,
            description: "Returns A Single Project",
            args: {id:{type: GraphQLID}},
            resolve: (_,args)=> Project.findById(args.id)
            
        },
        projects: {
            type: GraphQLList(ProjectType),
            description: "List of All Projects",
            resolve: ()=> Project.find()
            
        },
        clients: {
            type: GraphQLList(ClientType),
            description: "List of All clients",
            resolve: () => Client.find()
        },
        client: {
            type: ClientType,
            description: "Returns A Single Client",
            args: {id:{type: GraphQLID}},
            resolve: (_,args)=> Client.findById(args.id)
            
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
                const insert = new Project({id: projects.length, clientId: args.clientId, name:args.name , description:args.description, completed:args.completed});
                insert.save();
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
                "pass"
                return insert;
            }
        },
    })
});

module.exports = {RootQueryType, RootMutateType};