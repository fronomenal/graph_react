import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CLIENT } from '../queries/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function ClientPatchModal({client}) {

  const [name, setName] = useState(()=> client.name);
  const [email, setEmail] = useState(()=> client.email);
  const [phone, setPhone] = useState(()=> client.phone);

  const [patchClient] = useMutation(UPDATE_CLIENT, {
    variables: {id: client.id, name, email, phone },
    update(cache, { data: { patchClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      clients.map( client => { if (client.id === patchClient.id) return patchClient; else return client; } );
      cache.writeQuery({query: GET_CLIENTS, data: { clients }, });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }

    patchClient(name, email, phone);

    setName('');
    setEmail('');
    setPhone('');
  };
  return (
      
    <div className='modal fade' id={'clientUpdateModal_'+client.id} aria-labelledby='clientUpdateModalLabel' aria-hidden='divue' >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='clientUpdateModalLabel'>
              Update Client: {client.name}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={onSubmit}>
              <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Phone</label>
                <input
                  type='text'
                  className='form-control'
                  id='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button
                type='submit'
                data-bs-dismiss='modal'
                className='btn btn-secondary'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
