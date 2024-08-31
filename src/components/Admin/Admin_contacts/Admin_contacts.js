import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';
import axios from 'axios';
import { toast } from 'react-toastify';


const AdminContacts = () => {

  const [tabler,setTabler] = useState()

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/getcontacts`).then((response) => {
      setTabler(response.data.map((data,index) => <tr>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>{data.mobile}</td>
        <td>{data.comment}</td>
        <td>{Date(data.created_at).toLocaleString()}</td>
      </tr>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])
  return(<div>
    <AdminHeader head="contacts" title="Contacts" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='container'>
      <table className='table'>
        <thead>
          <th>S.no</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Content</th>
          <th>Date</th>
        </thead>
        <tbody>
          {tabler}
        </tbody>
      </table>
    </div>

  </div>
);
}

AdminContacts.propTypes = {};

AdminContacts.defaultProps = {};

export default AdminContacts;
