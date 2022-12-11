//PatchProjectForm
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../queries/projectMutations";
import { GET_CLIENTS } from '../queries/clientQueries';

export default function PatchProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case "Not Started":
        return "new";
      case "Started":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });

  const [patchProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status, clientId },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }

    patchProject(name, description, status, clientId);
  };

  return (
    <div className="accordion mt-5" id="project_patch">
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingOne">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
           <p className="lead">Update Project Details</p>
        </button>
      </h2>
      <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#project_patch">
        <div className="accordion-body">
          {!loading && !error && (<form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
            </div>
            <div className='mb-3'>
                      <label className='form-label'>Client</label>
                      <select
                        id='clientId'
                        className='form-select'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)} >
                        <option value=''>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}> {client.name} </option>
                        ))}
                      </select>
                    </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select  id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} >
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>)}
        </div>
      </div>
    </div>
  </div>
  );
}