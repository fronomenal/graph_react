import {FaTrash} from "react-icons/fa";
import {useMutation} from "@apollo/client"
import {DELETE_CLIENT} from "../queries/clientMutations"

function ClientRow({client}) {
  const [delClient] = useMutation(DELETE_CLIENT, {variables:{id: client.id}});

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td><button className="btn btn-danger btn-sm" onClick={delClient}><FaTrash></FaTrash></button></td>
    </tr>
  )
}

export default ClientRow