import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos'
import { toast } from 'react-toastify';



const IndexCards = (props) => {

  const [ratings,setRatings] = useState([0,0])
  const navigate = useNavigate()
  AOS.init()

  useEffect(() => {

    console.log(props.id)

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
          document.getElementById(`stars${props.id}${index}`).style.color = "gold"         
        }
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

  },[])


  return(<div data-aos="fade-up" className='text-center indexcard'>
    <div className='card p-3' style={{border:'2px solid #e9e9e9', height:'100%',width:'100%',paddingTop:'3%'}}>
      <div ><img className='rounded rounded-5 index_card_image' src={require(`../uploads/${props.image}`)} /></div><br></br>
      <h4 ><b>{props.name}</b></h4><br></br>
      <p>{props.summary}</p>
      <span id='stars'><i className="fa fa-star" id={`stars${props.id}1`} /> <i className="fa fa-star" id={`stars${props.id}2`} /> <i className="fa fa-star" id={`stars${props.id}3`} /> <i className="fa fa-star" id={`stars${props.id}4`} /> <i className="fa fa-star checked" id={`stars${props.id}5`} />({ratings[1]})</span><br></br>
      <h4 style={{color:'#89C74A'}}><b>Rs.{props.price} / {props.unit_name}</b></h4><br></br>
      <center><button onClick={() => navigate("/details",{state:props.id})} className=' btn rounded rounded-5 buttons index_buttons' style={{marginRight:'30%'}} >Add to Cart</button></center>
    </div>
  </div>
);
}

IndexCards.propTypes = {};

IndexCards.defaultProps = {};

export default IndexCards;
