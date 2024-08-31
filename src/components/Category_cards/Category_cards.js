import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CategoryCards = (props) => {

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
          document.getElementById(`stars${index}`).style.color = "gold"    
        }
      }
    })
  },[])

  function nav(id)
  {
    navigate("/details",{state:id})
    window.location.reload(true)
  }

  return(<div style={{cursor:"pointer"}} data-aos="fade-up" className='col-sm-4 m-1'>
    <div onClick={() => nav(props.id)} className='sp_card p-3 rounded' style={{height:'100%',width:'100%',border:'1px solid green'}}>
        <div className='row'>
          <div className='col-sm-4'>
           <img className='rounded rounded-2 category_card_image' src={require(`../uploads/${props.image}`)} />
          </div>
          <div className='col-sm-2'></div>
          <div className='col-sm-6'>
           <h4>{props.name}</h4>
           <span id='starss'>({ratings[0]})<i className="fa fa-star" id='stars1' /> <i className="fa fa-star" id='stars2' /> <i className="fa fa-star" id='stars3' /> <i className="fa fa-star" id='stars4' /> <i className="fa fa-star checked" id='stars5' />({ratings[1]})</span><br></br>
           <h4 style={{color:'#89C74A'}}><b>Rs.{props.price}</b></h4><br></br>
          </div>
        </div>
        </div>
  </div>
);
}

CategoryCards.propTypes = {};

CategoryCards.defaultProps = {};

export default CategoryCards;
