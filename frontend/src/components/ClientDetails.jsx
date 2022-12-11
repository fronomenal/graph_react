import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

export default function ClientDetails({ client, pid }) {
  return (
    <>
      <h5 className='mt-5'>Client Information</h5>
      <ul className='list-group'>
        {client? <>
        <li className='list-group-item'> <FaIdBadge className='icon' /> {client.name} </li>
        <li className='list-group-item'> <FaEnvelope className='icon' /> {client.email} </li>
        <li className='list-group-item'>  <FaPhone className='icon' /> {client.phone} </li>
        </> 
        : <>
        <li className='list-group-item'>
          <p className="fw-bold">No Client For This Project</p>
          <p>Please assign one for the project</p>
          <span>ID is: {pid}</span>
          </li>
        </> }
      </ul>
    </>
  );
}