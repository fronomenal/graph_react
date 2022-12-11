import {gql} from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    postClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation delClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`
const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $name: String, $email: String, $phone: String) {
    patchClient(id: $id, name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

export {DELETE_CLIENT, ADD_CLIENT, UPDATE_CLIENT};