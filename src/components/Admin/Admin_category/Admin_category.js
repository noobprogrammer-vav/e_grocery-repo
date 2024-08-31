import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';
import axios from 'axios';
import { toast } from 'react-toastify';


const AdminCategory = () => {


  const [tabler,setTabler] = useState()
  const [reloader,setReloader] = useState()

  const resetbtn = useRef()

  function submitter(e)
  {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name",e.target.name.value)
    formData.append("file", e.target.image.files[0])
    axios.post(`${sessionStorage.getItem("urls")}/addcategory`,formData).then((response) => {
      toast.success("Added",{position:"top-center"})
      setReloader(reloader == true ? false : true)
      resetbtn.current.click()
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})

    // console.log('e.target.image.files[0]', e.target.image.files[0])
  }

  function deleter(Id,state)
  {
     if(state == 0)
     {
        toast.success("Activated",{position:"top-center"})
     }
     else{
        toast.error("Deactivated",{position:"top-center"})
     }
     axios.get(`${sessionStorage.getItem("urls")}/deletecategory/${Id}`).then((response) => {
        setReloader(reloader == true ? false : true)
        }).catch((err) => {toast.error("Server Error",{position:"top-center"})
        console.log(err)})
  }

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/getallcategory`).then((response) => {
      if(response.data.length > 0)
      {
        setTabler(response.data.map((data,index) => <tr>
          <td>{index+1}</td>
          <td>{data.name}</td>
          <td><img src={require(`../../uploads/${data.image}`)} /></td>
          <td><p className={data.status == 0 ? "badge bg-danger" : "badge bg-success"}>{data.status == 0 ? "Deactive" : "Active"}</p></td>
          <td><button onClick={() => deleter(data.id,data.status)} className={data.status == 0 ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"}><i className={data.status == 0 ? "fa fa-check" : "fa fa-times"} /></button></td>
        </tr>))
      }
      else{
        setTabler("No Categories Available")
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
  },[reloader])

  return(<div>
    <AdminHeader head="category" title="Categories" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='container'>
      <h2>Add Category</h2>
      <form className='p-5' onSubmit={(e) => submitter(e)}>
        <input className='form-control inputs' placeholder='Category name' name='name'/><br />
        <input type='file' className='form-control inputs' placeholder='Category name' name='image'/><br />
        <center><button type='submit' className='btn btn-sm btn-success'>Submit</button> <button type='reset' ref={resetbtn} className='btn btn-sm btn-secondary'>Reset</button></center>
      </form>
      <br />
      <h2>All Categories</h2>
      <br />
      <table className='table table-stripped'>
        <thead>
          <th>S.no</th>
          <th>Category name</th>
          <th>Image</th>
          <th>Status</th>
          <th>Activate / Deactivate</th>
        </thead>
        <tbody>{tabler}</tbody>
      </table>
    </div>
  </div>
);
}

AdminCategory.propTypes = {};

AdminCategory.defaultProps = {};

export default AdminCategory;
