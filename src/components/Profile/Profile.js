import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';


const Profile = () => {

  const navigate = useNavigate()
  const nav_data = useLocation().state
  const [addresstable,setAddresstable] = useState()
  const [reloader,setReloader] = useState(true)

  function deleter(id)
  {
    axios.post(`${sessionStorage.getItem("urls")}/deletelocation/${id}`).then((response) => {
      toast.success("Deleted Successfully",{position:"top-center"})
      setReloader(reloader == true ? false : true)
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  useEffect(() => {
    if(nav_data == "yes")
    {
      toast.info("Add a location to Order")
    }
    const token = sessionStorage.getItem("token")
    if(token == null)
    {
      navigate("/login",{state:"yes"})
    }
    else{
      axios.post(`${sessionStorage.getItem("urls")}/getuser`,{token : token}).then((response) => {
        document.getElementById("name").value = response.data[0].name
        document.getElementById("mobile").value = response.data[0].mobile
        document.getElementById("email").value = response.data[0].email
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})

      axios.post(`${sessionStorage.getItem("urls")}/getlocations`,{token : sessionStorage.getItem("token")}).then((response) => {
        if(response.data.length == 0)
        {
          // alert("Add location to order")
          setAddresstable("No Address Added")
        }
        else{
          setAddresstable(response.data.map((data,index) => <tr>
            <td>{index + 1}</td>
            <td>{data.address}</td>
            <td><span onClick={() => deleter(data.id)} className='btn btn-sm btn-outline-danger'><i className='fa fa-trash' /></span></td>
          </tr>))
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})

    }
  },[reloader])

  function submitter(e)
  {
    e.preventDefault()
    const formData = {
      name : e.target.name.value,
      email : e.target.email.value,
      mobile : e.target.mobile.value,
      address : e.target.address.value,
      token : sessionStorage.getItem("token")
    }
    // console.log('formData', formData)
    axios.post(`${sessionStorage.getItem("urls")}/edituser`,formData).then((response) => {
      toast.success("Edited",{position:"top-center"})
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  function addaddress(e)
  {
    e.preventDefault()
    const formData = {
      address : e.target.address.value,
      token : sessionStorage.getItem("token")
    }
    // console.log('formData', formData)
    axios.post(`${sessionStorage.getItem("urls")}/addlocation`,formData).then((response) => {
      toast.success("Address Added",{position:"top-center"})
      if(nav_data == "yes")
      {
        navigate("/checkout")
      }
      setReloader(reloader == true ? false : true)

    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  return(<div>
    <Header title="My Profile" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='container'>
      <div className='row'>
        <div data-aos="fade-up" className='col-sm-8'>
        <form onSubmit={(e) => submitter(e)}>
          <input placeholder='Name' className='form-control inputs' id='name' name='name' /><br />
          <input placeholder='Mobile' className='form-control inputs' id='mobile' name='mobile' /><br />
          <input placeholder='Email' className='form-control inputs' id='email' name='email' /><br />

          <center><button type='submit' className='btn btn-sm btn-success'>Submit</button></center>
        </form>
        <h3>Add Address</h3>
        <form onSubmit={(e) => addaddress(e)}>
          <textarea placeholder='Address' className='form-control inputs' name='address' /><br />
          <center><button type='submit' className='btn btn-sm btn-success'>Submit</button></center>
        </form>
        </div>
        <div className='col-sm-4'>
          <table className='table'>
            <thead>
              <th>#</th>
              <th>Address</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {addresstable}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br /><br /><br />
    <Footer />
  </div>
);
}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
