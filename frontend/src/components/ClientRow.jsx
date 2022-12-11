import {FaTrash, FaEdit} from "react-icons/fa";
import {useMutation} from "@apollo/client";
import {DELETE_CLIENT} from "../queries/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

function ClientRow({client}) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables:{id: client.id},
    update(cache, {data: {deleteClient}}){
      const {clients} = cache.readQuery({query:GET_CLIENTS});
      cache.writeQuery({query: GET_CLIENTS, data: {clients: clients.filter(client => client.id !== deleteClient.id)}});
    }});

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm me-1" onClick={deleteClient}><FaTrash></FaTrash> </button>
        <button type='button'
          data-bs-toggle='modal'
          data-bs-target={'#clientUpdateModal_'+client.id} 
          className="btn btn-danger btn-sm">
            <FaEdit></FaEdit>
        </button>
        </td>
    </tr>
  )
}

export default ClientRow;