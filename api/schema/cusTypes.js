const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLEnumType} = require("graphql");

const Project = require("../models/Project")
const Client = require("../models/Client")
  
CusEnumType = new GraphQLEnumType({
  name: "ProjectStatus",
  description: "Status of the current project",
  values: {
    "new": {value: "Not Started"},
    "progress": {value: "Started"},
    "completed": {value: "Completed"},
  }
})

  const ClientType = new GraphQLObjectType({
    name: "Client",
    description: "This represents a single Client",
    fields: ()=> ({
        id: {type: GraphQLNonNull(GraphQLID)},
        projects: {
          type: GraphQLList(ProjectType),
          resolve: (parent)=> Project.where("clientId").equals(parent.id)
        },
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLNonNull(GraphQLString)},
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
          resolve: (parent)=> parent.populate("clientId").clientId
        },
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        status: {type: GraphQLString}
    })
  });

  module.exports = {ProjectType,  ClientType, CusEnumType};