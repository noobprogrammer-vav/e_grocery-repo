import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../../components/Assets/logo.jpg';
import flag from '../../components/Assets/flag.png'
import { useLocation, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import { toast } from 'react-toastify';



const Header = (props) => {

  const navigate = useNavigate()
  const [cates,setCates] = useState()
  const [cates2,setCates2] = useState()



  const toggleMenu = () => {
    if(document.getElementById("inner_ham").style.display == "block")
    {
      document.getElementById("inner_ham").style.display = "none"
    }
    else{
      document.getElementById("inner_ham").style.display = "block"
    }
  };


  const url = useLocation().pathname

  function logouter()
  {
    if( sessionStorage.getItem("token") != undefined)
    {
      axios.post(`${sessionStorage.getItem("urls")}/deletetoken`,{token : sessionStorage.getItem("token")}).then((response) => {
        sessionStorage.removeItem("token")
        navigate("/",{state:"Log-out Successful"})
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      navigate("/login",{state:"yes"})
    }

  }
  console.log(url)

  function scroller_function()
  {
    let navbar = document.getElementById("navbar")
    if(navbar != null)
    {
      if (window.pageYOffset > navbar.offsetTop) {
        navbar.classList.add("sticked")
  
      } else {
        navbar.classList.remove("sticked")
  
      }
    }
  }

  window.onscroll = function() {scroller_function()}

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/getcategory`).then((response) => {
      setCates(response.data.map((data,index) => <span className='options' onClick={() => navigate("/shop",{state:[data.id,data.name]})}>{data.name}</span>))
      setCates2(response.data.map((data,index) => <li className='options' onClick={() => navigate("/shop",{state:[data.id,data.name]})}>{data.name}</li>))

    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])
  return(<div>

<div style={{backgroundColor:"#89C74A"}}>
  <div className='row'style={{backgroundColor:"#89C74A"}}>
  <div className='col-sm-3' style={{color:'white'}}>
  {/* <i className="fa fa-envelope">info@example.com</i> | <i class="fa fa-phone">0000 - 123456789</i> */}
  {/* <p className='p-3'>Contact us</p> */}
  </div>
  <div className='col-sm-6 text-center '>
    {/* <h2 style={{color:"white"}}>GROCA Grocery Mart</h2> */}
  </div>
<div className='col-sm-1'></div>
  <div className='col-sm-2 p-1' style={{color:'white',marginLeft:''}}>
  <i className="fa fa-twitter m-2"></i>
  <i className="fa fa-facebook-square m-2"></i>
  <i className="fa fa-pinterest m-2" ></i>
  <i className="fa fa-instagram m-2"></i>
  </div>
  </div>
</div><br></br>
<div id='navbar' data-aos="zoom-out-up">
  <div className='row'>
    <div className='col-sm-2'>
      <img onClick={() => navigate("/")} src={logo}/>
    </div>
    <div className='col-sm-8 text-center cates' style={{overflow:"auto"}}>{cates}</div>
    <div style={{cursor:"pointer"}} className='col-sm-8 ham'>
      <center><i className="fa fa-bars m-3 options" onClick={toggleMenu}></i></center>
      <div className='row' style={{display:"none"}} id='inner_ham'>
      {cates2}
      </div>
    </div>

    <div style={{cursor:"pointer"}} className='col-sm-2'>
    <i onClick={() => navigate("/profile")} class="fa fa-user m-3 options"></i>
    <i onClick={() => navigate("/cart")} class="fa fa-shopping-cart m-3 options"></i>
    <i onClick={() => navigate("/favorites")} class="fa fa-heart m-3 options" ></i>
    <i onClick={logouter} class="fa fa-sign-out m-3 options" ></i>
    </div>
  </div>
  <br />
</div>
<br />
<div data-aos="zoom-in-up" className='p-4 text-center' style={{backgroundColor:"#89C74A"}}>
<h1 style={{color:'white'}}>{props.title}</h1>
<h4 style={{color:'white'}}>{url != "/" ? `home ${url}` : ""}</h4>
</div><br /><br /><br />
  </div>
);
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
