import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const Contact = () => {

  const resetbtn = useRef()

  function submitter(e)
  {
    e.preventDefault()
    if(e.target.mobile.value.length == 10)
    {
      const formData ={
        name : e.target.name.value,
        email : e.target.email.value,
        mobile : e.target.mobile.value,
        comment : e.target.comment.value
      }
      axios.post(`${sessionStorage.getItem("urls")}/addcontacts`,formData).then((response) => {
        toast.success("We will contact you soon",{position:"top-center"})
        resetbtn.current.click()
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
  }

  function mobilechecker(e)
  {
    if(e.length > 10)
    {
      toast.warning("Cannot exceed 10 digits",{position:"top-center"})
      document.getElementById("mobile").value = e.slice(0,10)
    }
  }

  return(<div>
    <Header title="Contactus" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

  <div className='container' style={{height:'100%',width:'100%'}}>
  <div className='row'>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.035159896776!2d77.58330777430184!3d12.905460716326482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1509bac18961%3A0x6f17c5245fd89acc!2sCapace%20Software%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1710222678003!5m2!1sen!2sin"style={{ width:"1500px",height:"500px",border:"0",allowfullscreen:"", loading:"lazy", referrerpolicy:"no-referrer-when-downgrade"}}   ></iframe>
</div>
  </div>
  <div data-aos="fade-up" className='container'>
    <div className='row'>
      <div className='col-sm-4'>
        <div className='contact_card ' >
          <div style={{marginLeft:'15%',padding:'2%'}}>
            <button className='btn btn-success card_button'><i className='fa fa-phone'></i></button><br></br><br></br>
            <h4><b>Phone</b></h4><br></br>
            <div className='card_text'>
            <p><b>Toll free</b>:0258-4569-7852</p>
            <p><b>Fax</b>:0000-123-456789</p></div>
            </div>
            
        </div>
      </div>
      <div className='col-sm-4'>
        <div className='contact_card ' >
          <div style={{marginLeft:'15%',padding:'2%'}}>
            <button className='btn btn-success card_button'><i className='fa fa-envelope'></i></button><br></br><br></br>
            <h4><b>Email</b></h4><br></br>
            <div className='card_text'>
            <p>mail@emaple.com</p>
            <p>support@example.com</p></div>
            </div>
            
        </div>
      </div>
      <div className='col-sm-4'>
        <div className='contact_card ' >
          <div style={{marginLeft:'15%',padding:'2%'}}>
            <button className='btn btn-success card_button'><i className='fa fa-map-marker'></i></button><br></br><br></br>
            <h4><b>Address</b></h4><br></br><br></br>
            <div className='card_text'>
            <p><b>No</b>:58A,East Madison Street<br></br>Baltimore ,MD,USA 4508</p>
            </div>
            </div>
            
        </div>
      </div>

    </div>
  </div>
  <form data-aos="flip-up" onSubmit={(e) => submitter(e)}>
  <div className='container' style={{marginTop:'5%'}}>
    <div className='row'>
      <div className='col-sm-4 '>
        <input required type="text" class="form-control rounded rounded-5 form" name='name'  placeholder="Name"/>
      </div>
      <div className='col-sm-4 '>
        <input required type="email" class="form-control rounded rounded-5 form" name='email'  placeholder="Email"/>
      </div>
      <div className='col-sm-4 '>
        <input required type="number" minLength={10} id='mobile' onChange={(e) => mobilechecker(e.target.value)} class="form-control rounded rounded-5 form" name='mobile'  placeholder="Phone no"/>
      </div>
      <div className='col-sm-12'>
        <br />
        <textarea required style={{height:"200px"}} type="text" class="form-control rounded rounded-5 form" name='comment'  placeholder="comment"/>
      </div>

      <center><button type='submit' className='btn btn-success rounded rounded-5 formbutton' >Send</button> <button type='reset' ref={resetbtn} className='btn btn-secondary rounded rounded-5 formbutton2' >Reset</button></center>
    </div>
  </div>
  </form>
  <br /><br /><br />

  <Footer />

  </div>
);
}

Contact.propTypes = {};

Contact.defaultProps = {};

export default Contact;
