import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';
import axios from 'axios';
import { toast } from 'react-toastify';


const AdminUnits = () => {

  const [tabler, setTabler] = useState()
  const [reloader,setReloader] = useState(true)

  function editor(e,id)
  {
    e.preventDefault()
    axios.post(`${sessionStorage.getItem("urls")}/updateunits`,{name : e.target.name.value, unit_id : id}).then((response) => {
      toast.success("Edited",{position:"top-center"})
      setReloader(reloader == true ? false : true)
    })

  }

  function adder(e)
  {
    e.preventDefault()
    axios.post(`${sessionStorage.getItem("urls")}/addunits`,{name : e.target.unit.value}).then((response) => {
      toast.success("Added",{position:"top-center"})
      setReloader(reloader == true ? false : true)
    })
  }

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/getunits`).then((response) => {
      if(response.data.length > 0)
      {
        setTabler(response.data.map((data,index) => <tr>
          <td>{index + 1}</td>
          {/* <td>{data.unit_name}</td> */}
          <td><form onSubmit={(e) => editor(e, data.id)}><input style={{display:"inline", width:"95%"}} className='form-control inputs' defaultValue={data.unit_name} name='name' /> <button style={{marginLeft:"-10%"}} type='submit' className='btn btn-sm btn-success'>Submit</button></form></td>
        </tr>))
      }
    })
  },[reloader])

  return(<div>
          <AdminHeader head="units" title="Units" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>
    <div className='container'>
      <div className='row'>
        <div className='col-sm-4'>
          <h3>Add Units</h3>
          <form onSubmit={(e) => adder(e)}>
            <input type='text' className='form-control inputs' name='unit' /> 
            <br />
            <button type="submit" className='btn btn-sm btn-success'>Submit</button>
          </form>
        </div>
        <div className='col-sm-8'>
          <table className='table'>
            <thead>
              <th>#</th>
              <th>Unit name</th>
            </thead>
            <tbody>
              {tabler}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}

AdminUnits.propTypes = {};

AdminUnits.defaultProps = {};

export default AdminUnits;
