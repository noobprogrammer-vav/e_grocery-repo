import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryCards from '../Category_cards/Category_cards';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';


const ItemDetails = () => {

  const nav_data = useLocation().state
  const [ratings, setRatings] = useState([0,0])
  const [description, setDescription] = useState()
  const [images,setImages] = useState()
  const [cards,setCards] = useState()
  const navigate = useNavigate()

  const [reloader,setreloader] = useState(true)

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/getoneitem/${nav_data}`).then((response) => {
      const data = response.data[0]
      // alert(data.quantity)
      document.getElementById("name").innerHTML = data.name
      document.getElementById("price").innerHTML = data.price
      document.getElementById("qty").innerHTML = parseInt(data.quantity)
      document.getElementById("unit").innerHTML = data.unit_name
      setDescription(<p dangerouslySetInnerHTML= { { __html: data.description }} />)

      axios.get(`${sessionStorage.getItem("urls")}/getcatitem/${data.category_id}`).then((response2) => {
        setCards(response2.data.map((dat,index) => <CategoryCards id={dat.item_id} image={dat.image} price={dat.price} name={dat.name} summary={dat.summary} />))
      })

    })

    axios.get(`${sessionStorage.getItem("urls")}/getoneitemimages/${nav_data}`).then((response) => {
      setImages(response.data.map((data,index) => <img className='rounded rounded-3' width={"100%"} height={"100%"} src={require(`../uploads/${data.image}`)} />))
    })

    axios.get(`${sessionStorage.getItem("urls")}/getratings/${nav_data}`).then((response) => {
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
    })

    if(sessionStorage.getItem("token") != null)
    {
      axios.post(`${sessionStorage.getItem("urls")}/checkfavorites`,{token : sessionStorage.getItem("token"), item_id : nav_data}).then((response) => {
        if(response.data.length == 0)
        {
          document.getElementById("favs").innerHTML = "Like"
        }
        else{
          document.getElementById("favs").innerHTML = "Unlike"

        }
      })
    }


  },[reloader])

  function addtocart()
  {
    if(sessionStorage.getItem("token") != null)
    {
      if(parseInt(document.getElementById("added").innerHTML) > 0)
      {
        const formData = {
          token : sessionStorage.getItem("token"),
          item_id : nav_data,
          count : parseInt(document.getElementById("added").innerHTML)
        }
        axios.post(`${sessionStorage.getItem("urls")}/cartcheck`,{token : sessionStorage.getItem("token"), item_id: nav_data}).then((response) => {
          if(response.data.length > 0)
          {
          axios.post(`${sessionStorage.getItem("urls")}/updatecart`,formData).then((response) => {toast.success("Added to Cart",{position:"top-center"})
            axios.post(`${sessionStorage.getItem("urls")}/reduceitem`,{item_id : nav_data, quantity : parseInt(document.getElementById("added").innerHTML)}).then((r) => setreloader(reloader == true ? false : true)) 
          })
          }
          else{
          axios.post(`${sessionStorage.getItem("urls")}/addtocart`,formData).then((response) => {toast.success("Added to Cart",{position:"top-center"})
            axios.post(`${sessionStorage.getItem("urls")}/reduceitem`,{item_id : nav_data, quantity : parseInt(document.getElementById("added").innerHTML)}).then((r) => setreloader(reloader == true ? false : true)) 
          })
          }
        }) 

      }
    }
    else{
      navigate("/login",{state:"yes"})
    }
    
  }

  function calc(type)
  {
    if(type == "add")
    {
      if(parseInt(document.getElementById("added").innerHTML) == parseInt(document.getElementById("qty").innerHTML))
      {
        toast.warning(`Only ${document.getElementById("qty").innerHTML} of ${document.getElementById("name").innerHTML}s available`,{position:"top-center"})
      }
      else{
        document.getElementById("added").innerHTML = parseInt(document.getElementById("added").innerHTML) + 1
      }
    }
    else{
      if(parseInt(document.getElementById("added").innerHTML) != 1)
      {
        document.getElementById("added").innerHTML = parseInt(document.getElementById("added").innerHTML) - 1
      }
    }
  }

  function favorites()
  {
    if(sessionStorage.getItem("token") != null)
    {
      const token = sessionStorage.getItem("token")
      axios.post(`${sessionStorage.getItem("urls")}/checkfavorites`,{token : token, item_id : nav_data}).then((response) => {
        if(response.data.length == 0)
        {
          axios.post(`${sessionStorage.getItem("urls")}/addfavorites`,{token : token, item_id : nav_data}).then((response1) => {
            setreloader(reloader == true ? false : true)
          }) 

        }
        else{
          axios.post(`${sessionStorage.getItem("urls")}/deletefavorites`,{token : token, item_id : nav_data}).then((response1) => {
            setreloader(reloader == true ? false : true)
          }) 

        }
      })
    }
    else{
      navigate("/login",{state:"yes"})
    }

  }

  return(<div >
    <Header title="Item details" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='container'>
    <div className='row'>
        <div data-aos="fade-right" className='col-sm-6' style={{}}>
         <Carousel>{images}</Carousel>
         </div>
         <div data-aos="fade-left" className='col-sm-6'>
          <h4 style={{color:'#89C74A', float:"right"}}><b>Rs. <span id='price'></span> / <span id='unit'></span></b></h4>
          <h1><b style={{color:"green"}} id='name'></b></h1>

    <br />
          <span id='stars'>({ratings[0]})<i className="fa fa-star" id='star1' /> <i className="fa fa-star" id='star2' /> <i className="fa fa-star" id='star3' /> <i className="fa fa-star" id='star4' /> <i className="fa fa-star checked" id='star5' />({ratings[1]})</span><br></br>
    <br />

          <h3><b>Quantity</b>: <button onClick={() => calc("sub")} className='btn btn-sm btn-outline-danger'>-</button> <span id='added'>1</span> <button onClick={() => calc("add")} className='btn btn-sm btn-outline-success'>+</button></h3><br></br>
          <h3><b >Availability: <span id='qty'></span></b></h3><br></br>
          <div className='row' style={{marginRight:'20%'}}>
            <div className='col-sm-6'>
              <br />
            <button onClick={addtocart} className=' btn btn- rounded rounded-5 button' style={{width:'70%'}} >Add to Cart</button>
            </div>
            <div className='col-sm-6'>
            <br />
            <button id='favs' onClick={favorites} className=' btn btn- rounded rounded-5 button' style={{width:'70%'}}>Like</button>
            </div>
          </div>
          <br /><br /><br />
          {description}

         </div>
    </div>
    <br />
    <div className='text-center'>
    <br />
    <h2>View few more of our Items</h2><br />
    <br />
    <div className='row'>
      {cards}
    </div>
    </div>
    </div>
    <br />
    <br />
    <br />
    <Footer />
  </div>
);
}

ItemDetails.propTypes = {};

ItemDetails.defaultProps = {};

export default ItemDetails;
