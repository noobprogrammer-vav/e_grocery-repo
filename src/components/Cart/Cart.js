import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import axios from 'axios';
import IndexCards from '../Index_cards/Index_cards';
import Cartcard from '../Cartcard/Cartcard';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer'
import { toast } from 'react-toastify';



const Cart = () => {

  const [cards,setCards] = useState()
  const navigate = useNavigate()

  const [reloader,setReloader] = useState(true)

  function checkouter()
  {
    if(cards == "Cart is empty"){
      toast.warning("Add Items to cart",{position:"top-center"})
    }
    else{
      navigate("/checkout")
    }
  }

  function deleter(id,count)
  {
    axios.post(`${sessionStorage.getItem("urls")}/increaseitem`,{item_id : id, quantity : count}).then((response2) => {}).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
    axios.post(`${sessionStorage.getItem("urls")}/deletecart`,{token : sessionStorage.getItem("token"), item_id : id}).then((response) => {
      setReloader(reloader == true ? false : true)
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  function reducer(id,count)
  {
    if(parseInt(count) <= 1)
    {
      deleter(id,count)
    }
    else{
      axios.post(`${sessionStorage.getItem("urls")}/cartreducer`,{token : sessionStorage.getItem("token"), item_id : id}).then((response) => {
        axios.post(`${sessionStorage.getItem("urls")}/increaseitem`,{item_id : id, quantity : 1}).then((response2) => {
          setReloader(reloader == true ? false : true)
        })
      })
    }
  }

  function adder(id,qty,count)
  {
    if(parseInt(count) + 1 > parseInt(qty))
    {
      toast.warning("Item Out of Stock",{position:"top-center"})
    }
    else{
      axios.post(`${sessionStorage.getItem("urls")}/cartadder`,{token : sessionStorage.getItem("token"), item_id : id}).then((response) => {
        axios.post(`${sessionStorage.getItem("urls")}/reduceitem`,{item_id : id, quantity : 1}).then((response2) => {
          setReloader(reloader == true ? false : true)
        })
      })
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem("token") == null)
    {
      navigate("/login",{state:"yes"})
    }
    else{
      axios.post(`${sessionStorage.getItem("urls")}/getcart`,{token : sessionStorage.getItem("token")}).then((response) => {
        if(response.data.length == 0)
        {
          setCards("Cart is empty")
          document.getElementById("total").innerHTML = 0
        }
        else{
          let total = 0
          for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];
            total += (parseFloat(element.price) * parseInt(element.count))
          }
          document.getElementById("total").innerHTML = total
          setCards(response.data.map((data,index) => <tr>
            <td>{index + 1}</td>
            <td>{data.name}</td>
            <td><img style={{width:"150px", height:"150px"}} src={require(`../uploads/${data.image}`)} /></td>
            <td><div className='row'><div className='col-sm-2'><span onClick={() => reducer(data.item_id,data.count)} className='btn btn-sm btn-outline-danger'>-</span></div><div className='col-sm-2'><span className='text-center'><h5>{data.count}</h5></span></div><div className='col-sm-2'><span onClick={() => adder(data.item_id,data.quantity,data.count)} className='btn btn-sm btn-outline-success'>+</span></div></div></td>
            <td>Rs.{data.price} x {data.count} {data.unit_name} = Rs.{parseFloat(data.price) * parseInt(data.count)}</td>
            <td><button onClick={() => deleter(data.item_id,data.count)} className='btn btn-sm btn-outline-danger'>Delete</button></td>
          </tr>))
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
//<div className='col-sm-4'><Cartcard count={data.count} name={data.name} summary={data.summary} image={data.image} id={data.id} price={data.price} /></div>
  },[reloader])


  return(<div>
    <Header title="My Cart" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <br /><br /><br />
    <div className='container'>
      <div data-aos="fade-up" className='row'>
        <div className='col-sm-4'><button onClick={() => navigate("/orders")} className='btn btn-sm btn-success p-3'>My Orders</button></div>
        <div className='col-sm-4'>
        </div>
        <div className='col-sm-4'></div>

      </div>
      <br /><br /><br />  
      <table data-aos="flip-right" className='table'>
        <thead>
          <th>S.no</th>
          <th>Name</th>
          <th>Image</th>
          <th>Count</th>
          <th>Price x Count</th>
          <th>Remove from Cart</th>
        </thead>
        <tbody>
          {cards}
          <tr>
            <td><h4>Total : </h4></td>
            <td></td>
            <td></td>
            <td></td>
            <td><h4 id='total'>0</h4></td>
            <td></td>

          </tr>
        </tbody>
      </table>
      <center><button onClick={checkouter} className='btn btn-sm btn-success p-3'>Checkout</button></center>
    </div>
    <br /><br /><br />
    <Footer />
  </div>
);
}

Cart.propTypes = {};

Cart.defaultProps = {};

export default Cart;
