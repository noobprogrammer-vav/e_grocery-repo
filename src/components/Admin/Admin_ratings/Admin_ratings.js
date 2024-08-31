import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';
import axios from 'axios';
import { toast } from 'react-toastify';


const AdminRatings = () => {

  const [items,setItems] = useState()
  const [users,setUsers] = useState()
  const [ratings,setRatings] = useState()



  function submitter(e)
  {
    e.preventDefault()

    const formData = {user_id : e.target.user.value == "none" ? null : e.target.user.value, item_id : e.target.item.value == "none" ? null : e.target.item.value}
    if(formData.user_id == null && formData.item_id == null)
    {
      toast.warning("Select atleast 1 field",{position:"top-center"})
    }
    else{
      axios.post(`${sessionStorage.getItem("urls")}/ratingsfilter`, formData).then((response) => {
        if(response.data.length > 0)
        {
          setRatings(response.data.map((data,index) => <tr>
          <td>{index + 1}</td>
          <td>{data.user_name}</td>
          <td>{data.item_name}</td>
          <td>{data.rating}</td>
          <td>{Date(data.created_at)}</td>
    
        </tr>))
        }
        else{
          setRatings("No Ratings for this particular Filter")
        }
  
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }

  }

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/getallitem`).then((response) => {
      setItems(response.data.map((data,index) => <option value={data.id}>{data.name}</option>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
    axios.get(`${sessionStorage.getItem("urls")}/getallusers`).then((response) => {
      setUsers(response.data.map((data,index) => <option value={data.id}>{data.name}</option>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    axios.get(`${sessionStorage.getItem("urls")}/getallratings`).then((response) => {
      setRatings(response.data.map((data,index) => <tr>
        <td>{index + 1}</td>
        <td>{data.user_name}</td>
        <td>{data.item_name}</td>
        <td>{data.rating}</td>
        <td>{Date(data.created_at)}</td>

      </tr>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})


  },[])

  // style={{position:"fixed", zIndex:'100', marginLeft:"98%"}}
  return(<div>
    <AdminHeader head="ratings" title="Ratings" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='container'>
      <div className='row'>
        <div className='col-sm-2'>
          <h2>Filter</h2>
          <hr />
          <form onSubmit={(e) => submitter(e)}>
          <h5><b>By User</b></h5>
          <select name='user' defaultValue={"none"} className='form-control inputs' >
            <option value={"none"}>--Select--</option>
            {users}
          </select>
          <br />
          <h5><b>By Item</b></h5>
          <select name='item' defaultValue={"none"} className='form-control inputs' >
            <option value={"none"}>--Select--</option>
            {items}
          </select><br />
          <button type='submit' className='btn btn-sm btn-success'>Submit</button> <button type='reset' className='btn btn-sm btn-secondary'>Reset</button>
          </form>
        </div>
        <div className='col-sm-10'>
          <table className='table'>
            <thead>
              <th>S.no</th>
              <th>User Name</th>
              <th>Item Name</th>
              <th>Item Ratings</th>
              <th>Date</th>
            </thead>
            <tbody>
              {ratings}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
);
}

AdminRatings.propTypes = {};

AdminRatings.defaultProps = {};

export default AdminRatings;
