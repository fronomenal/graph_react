const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");

const Project = require("../models/Project")
const Client = require("../models/Client")

  const ClientType = new GraphQLObjectType({
    name: "Client",
    description: "This represents a single Client",
    fields: ()=> ({
        id: {type: GraphQLNonNull(GraphQLID)},
        projects: {
          type: GraphQLList(ProjectType),
          resolve: (parent)=> Project.findById(parent.id)
        },
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
  });

  const ProjectType = new GraphQLObjectType({
    name: "Project",
    description: "This represents a single project",
    fields: ()=> ({
        id: {type: GraphQLNonNull(GraphQLID)},
        clientId: {type: GraphQLNonNull(GraphQLID)},
        client: {
          type: ClientType,
          resolve: (parent)=> Client.findById(parent.clientId)
        },
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLBoolean}
    })
  });
  
  module.exports = {ProjectType,  ClientType};