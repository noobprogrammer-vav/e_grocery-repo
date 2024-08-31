import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';



const Cartcard = (props) => {
  const [ratings,setRatings] = useState([0,0])
  const navigate = useNavigate()

  useEffect(() => {

    axios.get(`${sessionStorage.getItem("urls")}/getratings/${props.id}`).then((response) => {
      if (response.data.length > 0)
      {
        console.log(response.data[0].rating)
        let total_rating = 0
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          total_rating += element.rating
        }
        total_rating = total_rating/response.data.length
        setRatings([total_rating,response.data.length])
        for (let index = 1; index < Math.ceil(total_rating)+1; index++) {
          document.getElementById(`star${index}`).style.color = "gold"         
        }
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

  },[])

  function deleter()
  {
    // deletecart
    axios.post(`${sessionStorage.getItem("urls")}/deletecart`,{token : sessionStorage.getItem("token"), item_id : props.id}).then((response) => {
      window.location.reload(true)
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }


  return(<div data-aos="fade-up" onClick={() => navigate("/details",{state:props.id})} className='text-center'>
    <div className='card p-3' style={{border:'1px solid black',backgroundColor:'white',height:'100%',width:'100%',paddingTop:'3%'}}>
      <img className='rounded rounded-5' src={require(`../uploads/${props.image}`)} /><br></br>
      <h4 ><b>{props.name}</b></h4><br></br>
      <p>{props.summary}</p>
      <span id='stars'>({ratings[0]})<i className="fa fa-star" id='star1' /> <i className="fa fa-star" id='star2' /> <i className="fa fa-star" id='star3' /> <i className="fa fa-star" id='star4' /> <i className="fa fa-star checked" id='star5' />({ratings[1]})</span><br></br>
      <h4 style={{color:'#89C74A'}}><b>Rs.{props.price} x {props.count} = {parseFloat(props.price) * parseFloat(props.count)}</b></h4><br></br>
      <button onClick={deleter} className='btn btn-danger rounded rounded-5' >Delete</button> 
    </div>
  </div>
);
}

Cartcard.propTypes = {};

Cartcard.defaultProps = {};

export default Cartcard;
