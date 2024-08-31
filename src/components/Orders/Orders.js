import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';


const Orders = () => {

  const navigate = useNavigate()
  const [state,setState] = useState("getonprogress") //getcanceled, getcompleted
  const [tabler,setTabler] = useState()
  const [onecolor,setOnecolor] = useState("green")


  function deleter(od_no)
  {
    axios.post(`${sessionStorage.getItem("urls")}/cancelorders`,{token : sessionStorage.getItem("token"), order_number : od_no}).then((response) => {
      axios.post(`${sessionStorage.getItem("urls")}/getordernumber`,{order_number : od_no}).then((response2) => {
        for (let index = 0; index < response2.data.length; index++) {
          const element = response2.data[index];
          axios.post(`${sessionStorage.getItem("urls")}/increaseitem`,{item_id : element.item_id, quantity : element.count}).then((response2) => {}).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
          console.log(err)})
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
      toast.warning("Order Cancelled",{position:"top-center"})
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  function addratings(e,id)
  {
    e.preventDefault()
    axios.post(`${sessionStorage.getItem("urls")}/addratings`,{token : sessionStorage.getItem("token"), item_id : id, rating : e.target.rate.value}).then((response) => {
      if(response.data == 1062)
      {
        toast.warning("Feedback was already given for this Item",{position:"top-center"})
      }
      else{
        toast.success("Thank you for your Feedback",{position:"top-center"})
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }
  

  useEffect(() => {
    if(sessionStorage.getItem("token") == null)
    {
      navigate("/login",{state : "yes"})
    }
    else{

      axios.post(`${sessionStorage.getItem("urls")}/${state}`,{token : sessionStorage.getItem("token")}).then((response) => {
        if(response.data.length > 0)
        {
          setTabler(response.data.map((data,index) => <tr>
            <td>{index + 1}</td>
            <td >{data.order_number}</td>
            {/* <td onClick={() => navigate("/details",{state: data.item_id})} style={{width:"50%"}}><img width={"70%"} src={require(`../uploads/${data.image}`)} /></td> */}
            <td onClick={() => navigate("/details",{state: data.item_id})}>{data.name}</td>
            <td>Rs.{data.price}</td>
            <td>{data.count} {data.unit_name}</td>
            <td onClick={() => navigate("/details",{state: data.item_id})}>Rs.{parseFloat(data.price) * parseInt(data.count)}</td>
            {state == "getonprogress" ? <td><button onClick={() => deleter(data.order_number)} className='btn btn-sm btn-outline-danger'>X</button></td> : state == "getcompleted" ? <td style={{width:"200%"}}><form onSubmit={(e) => addratings(e,data.item_id)}><button style={{float:"right"}} className='btn btn-sm btn-success'>Submit</button><input style={{width:"70%"}} type='number' onChange={(e) => e.target.value > 5 ? document.getElementsByName("rate")[0].value = 5 : ""} className='form-control inputs' name='rate' /></form></td> : ''}
          </tr>))
        }
        else{
          setTabler("No Orders yet")
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }



  },[state])

  function tabs(e)
  {
    setOnecolor("")
    if(e == "getonprogress")
    {
      document.getElementById("getcompleted1").style.color = "black"
      document.getElementById("getcanceled1").style.color = "black"

    }
    else if(e == "getcompleted")
    {
      document.getElementById("getonprogress1").style.color = "black"
      document.getElementById("getcanceled1").style.color = "black"
    }
    else{
      document.getElementById("getonprogress1").style.color = "black"
      document.getElementById("getcompleted1").style.color = "black"
    }
    document.getElementById(`${e}1`).style.color = "green"
    setState(e)
    // document.getElementById(`${e}1`).style.height = "5px"

  }

  return(<div>
    <Header title="My Orders" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <br /><br /><br />
    <div className='container'>
        <div data-aos="fade-up" className='row'>
        <div id='getonprogress' style={{cursor:"pointer"}} onClick={() => tabs("getonprogress")} className='col-sm-4'>Track Orders<hr style={{border: `3px solid ${onecolor}`}} id='getonprogress1' /></div>
        <div id='getcompleted' style={{cursor:"pointer"}} onClick={() => tabs("getcompleted")} className='col-sm-4'>Completed Orders<hr style={{border: "3px solid"}} id='getcompleted1' /></div>
        <div id='getcanceled' style={{cursor:"pointer"}} onClick={() => tabs("getcanceled")} className='col-sm-4'>Cancelled Orders<hr style={{border: "3px solid"}} id='getcanceled1' /></div>
        </div>
        <table data-aos="flip-left" className='table'>
          <thead>
            <th>S.no</th>
            <th>Order<br />number</th>
            {/* <th>Image</th> */}
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            {state == "getonprogress" ? <th>Cancel Order</th> : state == "getcompleted" ? <th>Add Ratings</th> : ''}
          </thead>
          <tbody>
            {tabler}
          </tbody>
        </table>
      </div>
    <br /><br /><br />
    <Footer />
    {/* <center><hr style={{width:"55%"}} /></center> */}

  </div>
);
}

Orders.propTypes = {};

Orders.defaultProps = {};

export default Orders;
