import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer'


const Checkout = () => {

  const [tabler,setTabler] = useState()
  const navigate = useNavigate()

  const [reloader,setReloader] = useState(true)

  const [address,setAddress] = useState()
  const [addr,setAddr] = useState("none")


  function generateRandomNumber() {
    const min = Math.pow(10, 15); // Smallest 16-digit number
    const max = Math.pow(10, 16) - 1; // Largest 16-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber
    }

    // function axiosfunc()
    // {
    //   const rand = generateRandomNumber()
    //   axios.post(`${sessionStorage.getItem("urls")}/getordernumber`,{order_number : rand}).then((response) => {
    //     if(response.data.length == 0)
    //     {
    //       return rand
    //     }
    //     else{
    //       axiosfunc()
    //     }
    //   })
    // }

    function submitter()
    {
      if(document.getElementById("selected_address").value == "none")
      {
        toast.warning("Select an Address to deliver",{position:"top-center"})
      }
      else{
      let rand = generateRandomNumber()
      axios.post(`${sessionStorage.getItem("urls")}/getordernumber`,{order_number : rand}).then((response) => {
        if(response.data.length != 0)
        {
          submitter() 
        }
        else{
          axios.post(`${sessionStorage.getItem("urls")}/addorders`,{order_number : rand, address : document.getElementById("selected_address").value, token: sessionStorage.getItem("token")}).then((response2) => {
            toast.success("Your order has been placed",{position:"top-center"})
            axios.post(`${sessionStorage.getItem("urls")}/deleteallcart`,{token: sessionStorage.getItem("token")}).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
            console.log(err)})
            setReloader(reloader == true ? false : true)
          }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
          console.log(err)})

        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
      }

    }

  useEffect(() => {
    if(sessionStorage.getItem("token") == null)
    {
      navigate("/login",{state:"yes"})
    }
    else{
      axios.post(`${sessionStorage.getItem("urls")}/getcart`,{token : sessionStorage.getItem("token")}).then((response) => {
        let total = 0
        response.data.forEach(element => {
          total += (parseFloat(element.price) * parseInt(element.count))
        });
        document.getElementById("total").innerHTML = total
        setTabler(response.data.map((data,index) => <tr>
          <td>{index + 1}</td>
          <td style={{width:"10%"}}><img style={{width:"100%"}} src={require(`../uploads/${data.image}`)} /></td>
          <td>{data.name}</td>
          <td>{data.price} x {data.count} {data.unit_name} = {parseFloat(data.price) * parseInt(data.count)}</td>
          <td><button className='btn btn-sm btn-outline-danger'>X</button></td>
        </tr>))
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})

      axios.post(`${sessionStorage.getItem("urls")}/getlocations`,{token : sessionStorage.getItem("token")}).then((response) => {
        if(response.data.length == 0)
        {
          // alert("Add location to order")
          navigate("/profile",{state:"yes"})
        }
        else{
          setAddress(response.data.map((data,index) => <option value={data.id}>{data.address}</option>))
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})

    }

  },[reloader])
  return(<div>
    <Header title="Checkout" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='container text-center'>
      <form>
        <div data-aos="fade-up" className='row border border-success p-3'>
          <div className='col-sm-3'></div>
          <div className='col-sm-6'><label>Select Delivery Address</label><select className='form-control inputs' defaultValue={"none"} id="selected_address">
            <option disabled value={"none"}>--Select--</option>
            {address}
            </select></div>
          <div className='col-sm-3'></div>

        </div>
      </form>
      <br /><br />
      <div className='row'> 
        <div className='col-sm-12'>
          <div className='row'>
            <table data-aos="flip-up" className='table'>
              <thead>
                <th>S.no</th>
                <th>Image</th>
                <th>Item</th>
                <th>Price * Count</th>
                <th>Remove From Orders</th>
              </thead>
              <tbody>
            {tabler}
            <tr>
              <td><h5>Total : </h5></td>
              <td></td>
              <td></td>
              <td><h5 id='total'></h5></td>
              <td></td>

            </tr>
            </tbody>
            </table>
              <center><button onClick={submitter} className='btn btn-sm btn-success p-3'>Order Now</button></center>
          </div>
        </div>
      </div>
    </div>
    <br /><br /><br />
    <Footer />
  </div>
);
}

Checkout.propTypes = {};

Checkout.defaultProps = {};

export default Checkout;
