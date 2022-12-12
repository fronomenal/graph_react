const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull} = require("graphql")
const { ProjectType,  ClientType, CusEnumType} = require("./cusTypes");
const mg = require('mongoose');

const Project = require("../models/Project")
const Client = require("../models/Client")

async function validateClientID(id){
    if (!(mg.Types.ObjectId.isValid(id))) return false;
    return await Client.exists({ _id: id });
}

const RootQueryType = new GraphQLObjectType({
    name: "Queries",
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
    name: "Mutations",
    description: "Root Mutation for Creates, Updates and Deletes",
    fields: ()=> ({
        postProject: {
            type: ProjectType,
            description: "Adds A Single Project",
            args: {
                clientId:{type: GraphQLID},
                name:{type: GraphQLNonNull(GraphQLString)},
                description:{type: GraphQLNonNull(GraphQLString)},
                status:{type: CusEnumType}
            },
            resolve: async (_,args)=> {

                let cid = args.clientId;
                if (!(await validateClientID(cid))) cid = null;
                const insert = new Project({clientId: cid, name:args.name , description:args.description, status:args.status});
                await insert.save();
                return await insert.populate("clientId");
            }
            
        },
        putProject: {
            type: ProjectType,
            description: "Creates/Updates A Single Project by their ID",
            args: {
                id:{type: GraphQLNonNull(GraphQLID)},
                clientId:{type: GraphQLID},
                name:{type: GraphQLString},
                description:{type: GraphQLString},
                status:{type: CusEnumType}
            },
            resolve: async (_,args)=> {
                let update = await Project.findById(args.id);

                update ??= new Project();

                if(args.clientId) {
                    if (!(await validateClientID(args.clientId))) throw new Error("Invalid Client ID Provided");
                    update.clientId = args.clientId;
                }
                if(args.name) update.name = args.name;
                if(args.description) update.description = args.description;
                if(args.status) update.status = args.status;
    
                await update.save();
                return await update.populate("clientId");
            }
        },
        patchProject: {
            type: ProjectType,
            description: "Updates A Single Project by their ID",
            args: {
                id:{type: GraphQLNonNull(GraphQLID)},
                clientId:{type: GraphQLID},
                name:{type: GraphQLString},
                description:{type: GraphQLString},
                status:{type: CusEnumType}
            },
            resolve: async (_,args)=> {
                let update = await Project.findById(args.id);

                if (!update) throw new Error("No Project With id: " + args.id);

                if(args.clientId){
                    if (!(await validateClientID(args.clientId))) throw new Error("No Client With id: " + args.clientId)
                    update.clientId = args.clientId;
                }
                if(args.name) update.name = args.name;
                if(args.description) update.description = args.description;
                if(args.status) update.status = args.status;
    
                await update.save();
                return await update.populate("clientId");
            }
        },
        deleteProject: {
            type: ProjectType,
            description: "Removes A Single Project by their ID",
            args: {
                id:{type: GraphQLNonNull(GraphQLID)}
            },
            resolve: async (_,args)=> {
                let todel = await Project.findById(args.id);

                if (!todel) throw new Error("No Project With id: " + args.id);
    
                await todel.remove();
                return await todel.populate("clientId");
            }
        },
        postClient: {
            type: ClientType,
            description: "Adds A Single Client",
            args: {
                name:{type: GraphQLNonNull(GraphQLString)},
                email:{type: GraphQLNonNull(GraphQLString)},
                phone:{type: GraphQLNonNull(GraphQLString)},
            },
            resolve: async (_,args)=> {
                const insert = new Client({name:args.name , email:args.email, phone:args.phone});
                await insert.save();
                return insert;
            }
        },
        putClient: {
            type: ClientType,
            description: "Updates A Single Client by their ID",
            args: {
                id:{type: GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLString},
                email:{type: GraphQLString},
                phone:{type: GraphQLString},
            },
            resolve: async (_,args)=> {
                let update = await Client.findById(args.id);

                update ??= new Project();

                if (!update) throw new Error("No Project With id: " + args.id);

                if(args.name) update.name = args.name;
                if(args.email) update.email = args.email;
                if(args.phone) update.phone = args.phone;
    
                await update.save();
                return update;
            }
        },
        patchClient: {
            type: ClientType,
            description: "Creates/Updates A Single Client by their ID",
            args: {
                id:{type: GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLString},
                email:{type: GraphQLString},
                phone:{type: GraphQLString},
            },
            resolve: async (_,args)=> {
                let update = await Client.findById(args.id);

                if (!update) throw new Error("No Project With id: " + args.id);

                if(args.name) update.name = args.name;
                if(args.email) update.email = args.email;
                if(args.phone) update.phone = args.phone;
    
                await update.save();
                return update;
            }
        },
        deleteClient: {
            type: ClientType,
            description: "Removes A Single Client by their ID",
            args: {
                id:{type: GraphQLNonNull(GraphQLID)}
            },
            resolve: async (_,args)=> {
                let todel = await Client.findById(args.id);

                if (!todel) throw new Error("No Project With id: " + args.id);
                
                Project.updateMany({clientId: args.id}, {$set: {clientId: null}});
    
                await todel.remove();
                return todel;
            }
        },
    })
});

module.exports = {RootQueryType, RootMutateType};