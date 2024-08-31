import React from 'react';
import PropTypes from 'prop-types';
import footerimage from '../Assets/footimage.png'
import footlogo from '../Assets/footlogo.png'
import { useNavigate } from 'react-router-dom';


const Footer = () => {

  const navigate = useNavigate()

  return(<div data-aos="fade-in">
    <center>
      <div className='row container rounded rounded-5' style={{backgroundColor:'#89C74A', marginBottom : '-2%', zIndex:"1", position:"relative"}}>
<div className='col-sm-3 p-2'>
  <div className='row'>
    <div className='col-sm-3'>
    <button className='btn btn-light rounded rounded-5 f11' ><i className="fa fa-truck"></i></button>
    </div>
    <div className='col-sm-9 fontt'>
      <h3><b>Free Shipping</b></h3><br></br>
      <h6><b>worldwide</b></h6>
    </div>
  </div>
</div>
<div className='col-sm-3 p-2'>
  <div className='row'>
    <div className='col-sm-3'>
    <button className='btn btn-light rounded rounded-5 f11' ><i className="fa fa-phone"></i></button>
    </div>
    <div className='col-sm-9 fontt'>
      <h3><b>Helpline</b></h3><br></br>
      <h6 ><b>+(0000) 1234567</b></h6>
    </div>
  </div>
</div>
<div className='col-sm-3 p-2'>
  <div className='row'>
    <div className='col-sm-3'>
    <button className='btn btn-light rounded rounded-5 f11' ><i className="fa fa-headphones"></i></button>
    </div>
    <div className='col-sm-9 fontt'>
      <h3><b>24X7 Support</b></h3><br></br>
      <h6><b>Free for customers</b></h6>
    </div>
  </div>
</div>
<div className='col-sm-3 p-2'>
  <div className='row'>
    <div className='col-sm-3'>
    <button className='btn btn-light rounded rounded-5 f11' ><i className="fa fa-exchange"></i></button>
    </div>
    <div className='col-sm-9 fontt'>
      <h3><b>Returns</b></h3><br></br>
      <h6><b>worldwide</b></h6>
    </div>
  </div>
</div>
      </div></center>

{/*       <img src={footerimage} style={{width:'100%'}}/>
  <div className='container' style={{marginTop:'-30%'}}>
    <div className='row'>
      <div className='col-sm-3'style={{color:'white'}}>
        <img src={footlogo}/><br></br><br></br>
        <div className='row'>
          <div className='col-sm-2'>
            <i className='fa fa-map-marker'></i>
          </div>
          <div className='col-sm-10'>
            <p>No: 58 A, East Madison Street, Baltimore, MD, USA 4508</p>
          </div>
        </div><br></br>
        <div className='row' >
          <div className='col-sm-2'>
            <i className='fa fa-phone'></i>
          </div>
          <div className='col-sm-10'>
            <p>423-845-6570</p>
          </div>
        </div><br></br>
        <div className='row'>
          <div className='col-sm-2'>
            <i className='fa fa-envelope'></i>
          </div>
          <div className='col-sm-10'>
            <p>random@gmail.com</p>
          </div>
        </div><br></br>
        <i className='fa fa-twitter m-2'></i><i className='fa fa-facebook m-2'></i><i className='fa fa-pinterest m-2'></i><i className='fa fa-instagram m-2'></i>
      </div>
      <div className='col-sm-3' style={{color:'white'}}>
        <h4><b>Help</b></h4><br></br><br></br>
        <p>Search</p>
        <p>Help</p>
        <p>Information</p>
        <p>Privacy Policy</p>
        <p>Shipping Information</p>

      </div>
      <div className='col-sm-3' style={{color:'white'}}>
        <h4><b>Support</b></h4><br></br><br></br>
        <p onClick={() => navigate("/contact")}>contactUs</p>
        <p>Aboutus</p>
        <p>carrers</p>
        <p>Refund and Return</p>
        <p>Deliveries</p>

      </div>
      <div className='col-sm-3' style={{color:'white'}}>
        <h4><b>Information</b></h4><br></br><br></br>
        <p>Search Terms</p>
        <p>Advanced Search</p>
        <p>Help and faqs</p>
        <p>Store Location</p>
        <p>Orders and Returns</p>

      </div>
    </div>
  </div> */}
<footer class="text-center text-lg-start bg-body-tertiary text-muted" >


  <section class="" style={{backgroundColor:'#FEF188',padding:'2%'}} >
    <div class="container text-center text-md-start mt-5" >
      <div class="row mt-3" >
        
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
        <img src={footlogo}/><br></br>
<br></br>
          <p><i class="fa fa-home me-3"></i>No: 58 A, East Madison Street, Baltimore, MD, USA 4508</p>
          <p>
          <p><i class="fa fa-phone me-3"></i> 423-845-6570</p>
            <i class="fa fa-envelope me-3"></i>
            random@email.com
          </p>
        </div>
        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
            Help
          </h6>
          <p>
            <a href="#!" class="text-reset">Search</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Help</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Informartion</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Privacy Policy</a>
          </p>
        </div>

       
        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
           Support
          </h6>
          <p>
            <a href="/contact" class="text-reset">contactUs</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Aboutus</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Carrers</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Refund and Returns</a>
          </p>
        </div>
        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
            Informartion
          </h6>
          <p>
            <a href="#!" class="text-reset">Search terms</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Advanced Search</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Help & FAQ</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Store Locarion</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Orders and Returns</a>
          </p>
        </div>

        
      </div>
    </div>
  </section>
  <div class="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
  © 2024, Groca (password: buddha) Powered by Shopify
  </div>
</footer>
  </div>
);
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
