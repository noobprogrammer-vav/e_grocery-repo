import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate()

  function mobilechecker(e)
  {
    if(e.target.value.length > 10)
    {
      toast.warning("Cannot exceed 10 Digits",{position:"top-center"})
      document.getElementById("mobile").value = e.target.value.slice(0,10)
    }
  }

  function submitter(e)
  {
    e.preventDefault()
    if(e.target.mobile.value.length == 10)
    {
      const formData = {
        name: e.target.name.value,
        email:e.target.email.value,
        mobile:e.target.mobile.value,
        password: e.target.pwd.value,
      }
      axios.post(`${sessionStorage.getItem("urls")}/signup`,formData).then((response) => {
        navigate('/login',{state:"no"})
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      toast.warning("Enter valid mobile Number",{position:"top-center"})
    }
  }

  return(<div>
        <Header />
    <div className='container '>
      <form onSubmit={(e) => submitter(e)}>
        <label>Name</label>
        <input className='form-control inputs' required type='text' name='name' />
        <label>Mobile</label>
        <input className='form-control inputs'  minLength={10} required onChange={(e) => mobilechecker(e)} type='number' id='mobile' name='mobile' />
        <label>Email</label>
        <input className='form-control inputs' required pattern="[^ @]*@[^ @]*" type='email' name='email' />
        <label>Password</label>
        <input className='form-control inputs' minLength={8} required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*_=+-])" type='password' name='pwd' /><br />
        <center><button className='btn btn-sm btn-success' type='submit'>Submit</button> <button className='btn btn-sm btn-secondary' type='submit'>Reset</button></center>
      </form>
    </div>
  </div>
);
}

Signup.propTypes = {};

Signup.defaultProps = {};

export default Signup;
