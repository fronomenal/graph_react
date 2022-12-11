import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
  mutation addProject( $name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID) {
    postProject(  name: $name, description: $description, status: $status, clientId: $clientId  ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject( $id: ID!, $name: String, $description: String, $status: ProjectStatus, $clientId: ID ) {
    patchProject( id: $id, name: $name, description: $description, status: $status, clientId: $clientId ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT};