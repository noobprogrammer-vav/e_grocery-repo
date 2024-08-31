import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../Header/Header';
import IndexCards from '../Index_cards/Index_cards';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { toast } from 'react-toastify';



const Favorites = () => {

  const [displayer,setDisplayer] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem("token") == null)
    {
      navigate("/login",{state : "yes"})
    }
    else{
      axios.post(`${sessionStorage.getItem("urls")}/getfavorites`,{token : sessionStorage.getItem("token")}).then((response) => {
        if(response.data.length == 0)
        {
          setDisplayer("No Favorites Yet")
        }
        else{
          setDisplayer(response.data.map((dat,index) => <div className='col-sm-4'><IndexCards id={dat.item_id} unit_name={dat.unit_name} image={dat.image} price={dat.price} name={dat.name} summary={dat.summary} /></div>))
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
  },[])
  return(<div>
    <Header title="My favorites"/>
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div data-aos="flip-left" className='container'>
      <div className='row'>
        {displayer}
      </div>
    </div>
    <br /><br /><br />
    <Footer />
  </div>
);
}

Favorites.propTypes = {};

Favorites.defaultProps = {};

export default Favorites;
