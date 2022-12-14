import { useQuery, useMutation } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import ClientPatchModal from "./ClientPatchModal";

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner/>
  if (error) return <p>Something horrible happened</p>

  return (
    <>
      <div>{ !loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map( cl => <ClientRow key={cl.id} client={cl}></ClientRow> )}
          </tbody>
        </table>
      ) }
      </div>
      <div>
      {data.clients.map( cl => <ClientPatchModal key={cl.id} client={cl}></ClientPatchModal> )}
      </div>
    </>
  )
}

export default Clients