import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from "../Footer/Footer"
import axios from 'axios';
import loginimage from '../Assets/loginimage.jpg'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {

  const [userip, setUserIp] = useState()

  const nav_data = useLocation().state

  useEffect(() => {
    console.log(nav_data)
    sessionStorage.removeItem("admin")
    if(nav_data == "yes")
    {
      toast.warning("Login to access",{position:"top-center"})
    }
    axios.get("https://geolocation-db.com/json/").then((response) => setUserIp(response.data.IPv4)).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])

  const navigate = useNavigate()

  function submitter(e)
  {
    e.preventDefault()
    const formData = {
      email: e.target.email.value,
      password: e.target.pwd.value,
      ip: userip
    }
    if(formData.email == "admin@gmail.com" && formData.password == "admin")
    {
      navigate("/admin")
      sessionStorage.setItem("admin","true")
    }
    else{
      axios.post(`${sessionStorage.getItem("urls")}/login`,formData).then((response) => {
        if(response.data.length > 0)
        {
          axios.post(`${sessionStorage.getItem("urls")}/validate`,{token: response.data}).then((response2) => {
            if(response2.data.length > 0)
            {
              axios.post(`${sessionStorage.getItem("urls")}/updatetoken`,{token: response.data}).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
              console.log(err)})
            }
            else{
              axios.post(`${sessionStorage.getItem("urls")}/addtoken`,{token: response.data}).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
              console.log(err)})
            }
          }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
          console.log(err)})
          sessionStorage.setItem("token", response.data)
          navigate("/")
        }
        else{
          toast.error("Incorrect Credentials",{position:"top-center"})
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
  }


  function mobilechecker(e)
  {
    if(e.target.value.length > 10)
    {
      document.getElementById("mobile").value = e.target.value.slice(0,10)
    }
  }

  function signmeup(e)
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
        console.log(response.data)
        if(response.data == "1062")
        {
          toast.warning("Email is Already present",{position:"top-center"})
        }
        else{
          toast.success("Welcome",{position:"top-center"})
          toast.info("Login to Continue",{position:"top-center"})
          window.location.reload(true)
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      toast.warning("Enter valid mobile Number",{position:"top-center"})
    }
  }


  function tabs(tab)
  {
    if(tab == "login")
    {
      document.getElementById("signup_head").classList.remove("active")
      document.getElementById("signup_content").classList.remove("show")
      document.getElementById("signup_content").classList.remove("active")

      document.getElementById("login_head").classList.add("active")
      document.getElementById("login_content").classList.add("show")
      document.getElementById("login_content").classList.add("active")

      document.getElementById("login_h").style.color = "orange"

      document.getElementById("signup_h").style.color = "black"



    }
    else{
      document.getElementById("login_head").classList.remove("active")
      document.getElementById("login_content").classList.remove("show")
      document.getElementById("login_content").classList.remove("active")

      document.getElementById("signup_head").classList.add("active")
      document.getElementById("signup_content").classList.add("show")
      document.getElementById("signup_content").classList.add("active")

      document.getElementById("login_h").style.color = "black"

      document.getElementById("signup_h").style.color = "orange"

    }
  }
  
  return(<div>
    <Header title="Login / Signup"/>
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='container '>
      <div className='card p-5'>
        <div className='row'>
          <div className='col-sm-6'>
            <img data-aos="zoom-in" src={loginimage} style={{width:"100%"}} className='rounded rounded-5' />
          </div>
          <div data-aos="zoom-out" className='col-sm-6'>
            <nav>
              <div className="nav nav-tabs text-center text-uppercase" id="nav-tab" role="tablist">
                <div className="col-sm-6 active" style={{cursor:"pointer"}} onClick={() => tabs("login")} id="login_head" data-bs-toggle="tab" data-bs-target="#login_content" type="button" role="tab" aria-controls="login_head" aria-selected="true"><h3 style={{color:"orange"}} id='login_h'>Login<center><hr style={{border: "4px solid",width:"90%"}} /></center></h3></div>
                <div className="col-sm-6 " style={{cursor:"pointer"}} onClick={() => tabs("signup")} id="signup_head" data-bs-toggle="tab" data-bs-target="#signup_content" type="button" role="tab" aria-controls="signup_head" aria-selected="false"><h3 id='signup_h'>Signup<center><hr style={{border: "4px solid",width:"90%"}} /></center></h3></div>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="login_content" role="tabpanel" aria-labelledby="login_content">
                <br />
              <form className='p-5' onSubmit={(e) => submitter(e)}>
                <label>Email</label>
                <input defaultValue={""} className='form-control inputs' required type='email' name='email' /><br />
                <label>Password</label>
                <input defaultValue={""} className='form-control inputs' required type='password' name='pwd' />
                <br />
                <center><button className='btn btn-sm btn-success' type='submit'>Submit</button></center>
              </form>
              </div>
              <div className="tab-pane fade" id="signup_content" role="tabpanel" aria-labelledby="signup_content">
              <br />
                <form onSubmit={(e) => signmeup(e)}>
                  <label>Name</label>
                  <input defaultValue={""} className='form-control inputs' required type='text' name='name' /><br />
                  <label>Mobile</label>
                  <input className='form-control inputs'  minLength={10} required onChange={(e) => mobilechecker(e)} type='number' id='mobile' name='mobile' /><br />
                  <label>Email</label>
                  <input className='form-control inputs' required pattern="[^ @]*@[^ @]*" type='email' name='email' /><br />
                  <label>Password</label>
                  <span><input style={{display:"inline"}} className='form-control inputs' minLength={8} required type='password' name='pwd' /><i style={{color:"#89c74a", marginLeft:"-5%"}} title='Requires atleast 1 uppercase, lowercase, numeral, symbol' className='fa fa-info-circle' /></span>
                  <center><br /><button className='btn btn-sm btn-success' type='submit'>Submit</button> <button className='btn btn-sm btn-secondary' type='submit'>Reset</button></center>
                </form>
              </div>
            </div>
          {/* <div className='row'>
            <div id='login' style={{cursor:"pointer"}} onClick={() => tabs("login")} className='col-sm-6'><h3 style={{color: orange}}>Login</h3><hr style={{border: `3px solid ${orange}`}} id='login1' /></div>
            <div id='signup' style={{cursor:"pointer"}} onClick={() => tabs("signup")} className='col-sm-6'><h3>Signup</h3><hr style={{border: "3px solid"}} id='signup1' /></div>
          </div>
          {state} */}
          </div>
        </div>
      </div>
    </div>
    <br /><br /><br />
    {/* <Footer /> */}
  </div>
);
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
