import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import logo from '../../Assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const AdminHeader = (props) => {

  useEffect(() => {
    document.getElementById(props.head).classList.add("option-active")
    if(sessionStorage.getItem("admin") != "true")
    {
      navigate("/login",{state:"yes"})
    }
  },[])

  function logouter()
  {
    sessionStorage.removeItem("admin")
    navigate("/login")
  }

  const navigate = useNavigate()

  return(<div>
    <div className='container'>
      <br />
      <div className='text-center border'><h1 style={{color:"green"}}>Admin {props.title}</h1></div>
      <br />

  <div className='row'>
    <div className='col-sm-2'>
      <img src={logo}/>
    </div>
    <div className='col-sm-10 text-center'>
      <span className='options' onClick={() => navigate("/admin")} id='home'><b>Home</b></span><span className='options' onClick={() => navigate("/admin/units")} id='units'><b>Units</b></span><span className='options' onClick={() => navigate("/admin/category")} id='category'><b>Categories</b></span><span className='options' onClick={() => navigate("/admin/items")} id='items'><b>Items</b></span><span className='options' onClick={() => navigate("/admin/orders")} id='orders'><b>Orders</b></span><span className='options' onClick={() => navigate("/admin/ratings")} id='ratings'><b>Ratings</b></span><span className='options' onClick={() => navigate("/admin/contacts")} id='contacts'><b>Contacts</b></span><span className='options' onClick={logouter}><i className='fa fa-sign-out' /></span>
    </div>
  </div>
  <br />

  <div className='row'>
  </div>
</div>
  </div>
);
  }

AdminHeader.propTypes = {};

AdminHeader.defaultProps = {};

export default AdminHeader;
