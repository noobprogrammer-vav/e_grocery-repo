import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import IndexCards from '../Index_cards/Index_cards';
import Footer from "../Footer/Footer"
import { toast } from 'react-toastify';



const Shop = () => {

  const nav_data = useLocation().state

  const [categories,setCategories] = useState()
  const [slider,setSlider] = useState(100)
  const [cards,setCards] = useState()

  function filterer(e)
  {
    e.preventDefault()
    const formData = {
      category : e.target.category.value == "none" ? null : e.target.category.value.split(",")[0],
      price : e.target.price.value == 0 ? null : e.target.price.value
    }
    axios.post(`${sessionStorage.getItem("urls")}/filteritem`,formData).then((response) => {
      if(response.data.length == 0)
      {
        setCards("No Items are present for this Filter")
      }
      else{
        setCards(response.data.map((dat,index) => <div className='col-sm-6'><IndexCards id={dat.item_id} unit_name={dat.unit_name} image={dat.image} price={dat.price} name={dat.name} summary={dat.summary} /></div>))
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
    console.log('formData', formData)
    if(formData.category != null)
    {
      document.getElementById("shop_head").innerHTML = e.target.category.value.split(",")[1]
    }
    else{
      document.getElementById("shop_head").innerHTML = "All Items"
    }
  }

  useEffect(() => {
    window.scrollTo({top:0})
    axios.get(`${sessionStorage.getItem("urls")}/getcategory`).then((response) => {
      setCategories(response.data.map((data,index) => <option value={[data.id, data.name]}>{data.name}</option>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
    if(nav_data == null)
    {
      axios.get(`${sessionStorage.getItem("urls")}/one_item_one_image`).then((response2) => {
        setCards(response2.data.map((dat,index) => <div className='col-sm-6'><IndexCards id={dat.item_id} unit_name={dat.unit_name} image={dat.image} price={dat.price} name={dat.name} summary={dat.summary} /></div>))
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      axios.get(`${sessionStorage.getItem("urls")}/getcatitem/${nav_data[0]}`).then((response2) => {
        setCards(response2.data.map((dat,index) => <div className='col-sm-6 p-5'><IndexCards id={dat.item_id} unit_name={dat.unit_name} image={dat.image} price={dat.price} name={dat.name} summary={dat.summary} /></div>))
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    console.log(nav_data)

  },[nav_data])

  return(<div>
    <Header head="shop" title="Shop" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='container'>
      <div className='text-center p-2' style={{color:"#89C74A"}}><h2 id='shop_head'>{nav_data == null ? "All Items" : nav_data[1]}</h2></div>
      <div className='row p-1'>
        <div data-aos="fade-right" className='col-sm-3 p-5 border'>
          <form className='p-3' onSubmit={(e) => filterer(e)}>
          <h4>Sort By</h4>
          <br />

            <div className=''>
            <b>By Category</b>
              <select style={{width:"100%"}} name='category' className='form-control inputs' >
                <option value={"none"}>--Select--</option>
                {categories}
              </select>
            </div>
            <hr />
            <div className=''>
              <b>By Maximum Price</b>
              <span><input id='slider'defaultValue={100} name='price' onChange={(e) => setSlider(e.target.value)} style={{height:'2px', backgroundColor: "#d3d3d3", width:"100%"}} type='range' min={0} max={1000} step={100} className='inputs' /></span><span>{slider}</span>
            </div>
            <br />
            <button type='submit' className='btn btn-sm btn-success'>Submit</button>
          </form>
        </div>
        <div data-aos="fade-left" className='col-sm-9 border'>
          <div className='row p-4'>
            {cards}
          </div>
        </div>
      </div>
    </div>
    <br />
    <Footer />
  </div>
);
  }

Shop.propTypes = {};

Shop.defaultProps = {};

export default Shop;
