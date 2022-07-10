const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");

const projects = [
    {
      id: '1',
      clientId: '1',
      name: 'eCommerce Website',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.',
      completed: false,
    },
    {
      id: '2',
      clientId: '2',
      name: 'Dating App',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.',
      completed: false,
    },
    {
      id: '3',
      clientId: '3',
      name: 'SEO Project',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.',
      completed: false,
    },
    {
      id: '4',
      clientId: '4',
      name: 'Design Prototype',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.',
      completed: true,
    },
    {
      id: '5',
      clientId: '5',
      name: 'Auction Website',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.',
      completed: false,
    },
  ];
  
  const clients = [
    {
      id: '1',
      name: 'Tony Stark',
      email: 'ironman@gmail.com',
      phone: '343-567-4333',
    },
    {
      id: '2',
      name: 'Natasha Romanova',
      email: 'blackwidow@gmail.com',
      phone: '223-567-3322',
    },
    {
      id: '3',
      name: 'Thor Odinson',
      email: 'thor@gmail.com',
      phone: '324-331-4333',
    },
    {
      id: '4',
      name: 'Steve Rogers',
      email: 'steve@gmail.com',
      phone: '344-562-6787',
    },
    {
      id: '5',
      name: 'Bruce Banner',
      email: 'bruce@gmail.com',
      phone: '321-468-8887',
    },
  ];

  const ClientType = new GraphQLObjectType({
    name: "Client",
    description: "This represents a single Client requested by a client",
    fields: ()=> ({
        id: {type: GraphQLNonNull(GraphQLID)},
        projects: {
          type: GraphQLList(ProjectType),
          resolve: (parent)=> projects.filter( proj => proj.id == parent.id)
        },
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
  });

  const ProjectType = new GraphQLObjectType({
    name: "Project",
    description: "This represents a single project requested by a client",
    fields: ()=> ({
        id: {type: GraphQLNonNull(GraphQLID)},
        clientId: {type: GraphQLNonNull(GraphQLID)},
        client: {
          type: ClientType,
          resolve: (parent)=> clients.find( client => client.id == parent.clientId)
        },
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        completed: {type: GraphQLBoolean}
    })
  });
  
  module.exports = { projects, clients, ProjectType,  ClientType};