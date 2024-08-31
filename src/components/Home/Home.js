import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import IndexCards from '../Index_cards/Index_cards';
import axios from 'axios';
import lady from '../Assets/lady.png'
import { useLocation, useNavigate } from 'react-router-dom';
import randomColor from 'randomcolor';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slider1 from '../Assets/Slider-1.png';
import slider2 from '../Assets/slider-2.png';
import slider3 from '../Assets/slider-3.png';
import carrot from '../Assets/carrot.png'
import orange from '../Assets/orange.png'
import Footer from '../Footer/Footer';
import s1 from '../Assets/s1.png';
import s2 from '../Assets/s2.png';
import s3 from '../Assets/s3.png';
import s4 from '../Assets/s4.png';
import s5 from '../Assets/s5.png';
import { toast } from 'react-toastify';
import AOS from 'aos';
import Carousel from 'react-bootstrap/Carousel';
// import 'aos/dist/aos.css';





const Home = () => {
  const sliderRef = useRef(null);

  // const [ids,setIds] = useState()

  AOS.init()
  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
    
  };

  sessionStorage.setItem("urls","http://192.168.29.108:3001") //http://192.168.29.108:3001
  const [cards,setCards] = useState()
  const navigate = useNavigate()
  const [circle_categories,setCircle_categories] = useState()
  const [circle_categories_small,setCircle_categories_small] = useState()


  const nav_data = useLocation().state

  useEffect(() => {

    console.log(nav_data)
    if(nav_data != null)
    {
      toast.success(`${nav_data}`,{position:"top-center"})
    }

    axios.get(`${sessionStorage.getItem("urls")}/one_item_one_image`).then((response) => {
      setCards(response.data.map((data,index) => <div className='col-sm-4'><IndexCards name={data.name} summary={data.summary} image={data.image} id={data.item_id} unit_name={data.unit_name} price={data.price} /></div>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    axios.get(`${sessionStorage.getItem("urls")}/getcategory`).then((response) => {
      setCircle_categories(response.data.map((data,index) => <span style={{ display: 'inline', width: '250px', paddingTop:"4%" }} onClick={() => navigate("/shop",{state:[data.id,data.name]})}><div id='category_colors' style={{backgroundColor:`${randomColor({luminosity: 'light', hue: 'green'})}`}} className='rounded-5 p-3 text-center buttons'><img src={require(`../uploads/${data.image}`)} /><h4>{data.name}</h4></div></span>))
      setCircle_categories_small(response.data.map((data,index) => <div className='col-sm' onClick={() => navigate("/shop",{state:[data.id,data.name]})}><br /><div id='category_colors' style={{backgroundColor:`${randomColor({luminosity: 'light', hue: 'green'})}`}} className='rounded-5 p-3 text-center buttons'><img src={require(`../uploads/${data.image}`)} /><h4>{data.name}</h4></div></div>))

    })
  },[])

  return(<div>
    <Header id="my_header" head="home" title="Home" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='slides'>
      <Carousel slide={true}>
        <Carousel.Item>
          <img src={require("../Assets/Slider-1.png")} text="First slide" />
          <Carousel.Caption>
          <div className='container'>
            <div className='row banner p-4 rounded slide_card'>
                <h5 className='h4s' style={{color:'black'}}>100% Healthy and Affordable</h5><br></br>
                <h1 className='h4s' style={{color:'#89C74A'}}><b>Organic<br></br>Vegetables </b></h1><br></br><br></br>
                <h4 className='h4s'><b style={{color:'black'}}>Small changes big Difference</b></h4><br></br>
                <button onClick={() => navigate("/shop")} className=' btn btn-rounded rounded-5 slider_button ' >Shop Now</button>
            </div>
          </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={require("../Assets/slider-2.png")} text="Second slide"/>
          <Carousel.Caption>
          <div className='card slide_card' style={{border:'5px solid green',height:'60%',width:'40%',marginTop:'-50%',backgroundColor:'#FDE85F',marginLeft:'45%',padding:'2%'}}>
            <div className='text-center'>
              <h4 className='h4s'><b>GROCA</b></h4><br></br>
              <h1 className='h4s' style={{color:'red'}}><b>Vegetable 100% <br></br>Organic</b></h1><br></br>
              <p>Natural Health care ingredieants</p><br></br>
              <h4 className='h4s'><b>50% OFF</b></h4><br></br><br></br>
              <button onClick={() => navigate("/shop")} className='btn btn-light rounded rounded-5 sliders_button'>Shop Now</button>
            </div>
          </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={require("../Assets/slider-3.png")} text="Third slide"/>
          <Carousel.Caption>
          <div className='container slide_card'style={{marginLeft:'30%',marginTop:'-35%',padding:'5%'}}>
              <h4 className='h4s'>Natural Health Care ingredieants</h4><br></br>
              <h1 className='h4s' style={{color:'#D08126'}}><b>Grocery Shopping</b></h1><br></br>
              <h4 className='h4s'><b>Save upto 30% Off</b></h4><br></br>
            <button onClick={() => navigate("/shop")} className=' rounded rounded-5 sliderss_button '> Shop Now</button>
          </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
<br />


    <div className='container'>
    <div className='row'>
    <div className='col-sm-5 text-center  '>
      <div data-aos="fade-right" className='row' style={{backgroundColor:'#FFDFDF'}}>
        <div className='col-sm-7'>
        <img src={carrot} style={{height:'100%',width:'71%'}}/>
        </div>
        <div className='col-sm-5 p-5 veggies-fruits' style={{backgroundColor:'#F9B1AF'}}>
          <center><h5 style={{marginLeft:"-25%"}}><b>Veggies</b></h5></center><br></br>
          <p><b>100%</b> Organic<br></br>Products</p>
          <button onClick={() => navigate("/shop")} className='btn btn- rounded rounded-5 cardbutton'><b>Buy Now</b></button>
        </div>
      </div>

      </div>
      <div className='col-sm-2'></div>
      <div className='col-sm-5 text-center'>
      <div data-aos="fade-left" className='row' style={{backgroundColor:'#FFF08A'}}>
        <div className='col-sm-7'>
        <img src={orange} style={{height:'100%',width:'71%'}}/>
        </div>
        <div className='col-sm-5 p-5 veggies-fruits' style={{backgroundColor:'#FFDB4F'}}>
          <h5><b>Fruits</b></h5><br></br>
          <p><b>100%</b> Organic<br></br>Products</p>
          <button onClick={() => navigate("/shop")} className='btn btn- rounded rounded-5 cardbutton'><b>Buy Now</b></button>
        </div>
      </div>

      </div>
    </div>
    <br/>
    <div data-aos="flip-left" className='cats text-center'>
      <h2 style={{color:"green"}}><b>Our Products</b></h2>
      <br />
      <p>Try or category of products here</p>
      <br />
            <div className='category_circle_large' style={{ overflow: 'auto', width:"100%", flexDirection:"row" }}> 
              {circle_categories}
            </div>
            <div className='row category_circle_small' style={{marginLeft:"-10%", marginRight:"10%"}} > 
            <center>{circle_categories_small}</center>
              
            </div>
          </div>
    <br />
            <div className='row '>
              {cards}
            </div>
          </div><br />
    <div data-aos="flip-left" className='imagearea'>
          <img className='special_image' src={lady} />
          <div className='container'>
            <div className='row' style={{marginTop:'-30%', marginBottom:"15%"}}>
              <div className='col-sm-5 special_discount' >
                <p className='text-center special_head'style={{color:'#89C74A',wordSpacing:'3px'}}>Special Discount For All Grocery<br></br> Products</p><br></br>
                <p className='text-center'>Turpis tincidunt id aliquet risus feugiat. Pretium vulputate sapien nec sagittis aliquam. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Amet risus nullam eget felis eget nunc lobortis mattis aliquam.</p><br></br>
                <button onClick={() => navigate("/shop")} className=' btn btn- rounded rounded-5 button' >Buy Now</button>
              </div>
            </div>
          </div></div> 
          <div data-aos="flip-up" className='container' style={{marginBottom:"15%"}}>
      <Slider {...settings2}>
      <div>
        <div className='row'>
          <div className='col-sm-3'>
          <img src={s1}/>
          </div>
          <div className='col-sm-3'>
          <img src={s2}/>
          </div>
          <div className='col-sm-3'>
          <img src={s3}/>
          </div>
          <div className='col-sm-3'>
          <img src={s4}/>
          </div>
        </div>
      </div>
      <div>
      <div className='row'>
          <div className='col-sm-3'>
          <img src={s2}/>
          </div>
          <div className='col-sm-3'>
          <img src={s3}/>
          </div>
          <div className='col-sm-3'>
          <img src={s4}/>
          </div>
          <div className='col-sm-3'>
          <img src={s5}/>
          </div>
        </div>
      </div>
      <div>
      <div className='row'>
          <div className='col-sm-3'>
          <img src={s1}/>
          </div>
          <div className='col-sm-3'>
          <img src={s2}/>
          </div>
          <div className='col-sm-3'>
          <img src={s3}/>
          </div>
          <div className='col-sm-3'>
          <img src={s4}/>
          </div>
        </div>
      </div>
    </Slider>
    </div>
    <Footer />
  </div>
);
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
