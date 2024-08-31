import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../Admin_header/Admin_header';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const AdminItemsViewer = () => {

  const nav_data = useLocation().state

  const [displayer,setDisplayer] = useState()
  const [imagetable,setImagetable] = useState()
  const [description,setDescription] = useState()
  const resetbtn = useRef()

  const [reloader,setReloader] = useState(true)


  function imagedeleter(id,image)
  {
    axios.post(`${sessionStorage.getItem("urls")}/deleteitemimage/${id}`,{image : image}).then((response) => {
      setReloader(reloader == true ? false : true)
      toast.success("Deleted",{position:"top-center"})
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
  }

  function imageadder(e)
  {
    e.preventDefault()
    const formData = new FormData()
    formData.append("item_id", nav_data)
    formData.append("file",e.target.image.files[0])


    axios.post(`${sessionStorage.getItem("urls")}/additemimage`,formData).then((response) => {
      setReloader(reloader == true ? false : true)
      toast.success("Added",{position:"top-center"})
      }).catch((err) => {toast.error("Server Error",{position:"top-center"})
      console.log(err)})

  }

  function submitter(e)
  {
    e.preventDefault()
    const formData = {
      name : e.target.name.value,
      price : e.target.price.value,
      quantity : e.target.quantity.value,
      summary : e.target.summary.value,
      category : e.target.category_id.value,
      unit_id : e.target.unit_id.value,

      description : document.getElementById("quills").lastChild.firstChild.innerHTML
    }

    axios.post(`${sessionStorage.getItem("urls")}/edititem/${nav_data}`,formData).then((response) => {
      toast.success("Edited",{position:"top-center"})
      setReloader(reloader == true ? false : true)
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    
  }


  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/getoneitem/${nav_data}`).then((response) => {
      axios.get(`${sessionStorage.getItem("urls")}/getcategory`).then((response2) => {
      axios.get(`${sessionStorage.getItem("urls")}/getunits`).then((response3) => {
        setDescription(response.data[0].description)
        setDisplayer(<div>
            <Modal closeOnDocumentClick trigger={<button style={{float:"right"}}className="btn btn-sm btn-warning"> Edit </button>} modal>
              <div className='container'>
                <form className='p-4' onSubmit={(e) => submitter(e)}>
                  <button className='btn btn-sm btn-success' style={{float:"right"}} type='submit'>Submit</button>
                  <h4>Editor</h4>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-4'><label>Name: </label><input required name='name' className='form-control inputs'defaultValue={response.data[0].name} /></div>
                    <div className='col-sm-4'><label>Price: </label><input required name='price' className='form-control inputs'defaultValue={response.data[0].price} /></div>
                    <div className='col-sm-4'><label>Quantity: </label><input required name='quantity' className='form-control inputs'defaultValue={response.data[0].quantity} /><br /></div>
                    <div className='col-sm-4'><label>Summary: </label><input required name='summary' className='form-control inputs'defaultValue={response.data[0].summary} /><br /></div>
                    <div className='col-sm-4'><label>Units: </label><select name='unit_id' required className='form-control inputs'defaultValue={response.data[0].unit_id}>{response3.data.map((data,index) => <option value={data.id}>{data.unit_name}</option>)}</select><br /></div>
                    <div className='col-sm-4'><label>Category: </label><select name='category_id' required className='form-control inputs'defaultValue={response.data[0].category_id}>{response2.data.map((data,index) => <option value={data.id}>{data.name}</option>)}</select><br /></div>
                    <div className='col-sm-12'><label>Description: </label><ReactQuill id='quills' style={{height:"70%", overflow:"scroll"}} theme="snow" defaultValue={response.data[0].description} onChange={setDescription} /></div>
                  </div>
                  <br />
                </form>
              </div>
            </Modal>
          <h3>{response.data[0].name}</h3>
          <hr />
          <p>{response.data[0].summary}</p>
          <p dangerouslySetInnerHTML= { { __html: response.data[0].description }} />
        </div>)
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})

    axios.get(`${sessionStorage.getItem("urls")}/getitemimages/${nav_data}`).then((response) => {
      if(response.data.length > 0)
      {
        setImagetable(response.data.map((data,index) => <tr>
          <td>{index+1}</td>
          <td><center><img width={"50%"} src={require(`../../uploads/${data.image}`)} /></center></td>
          <td><button onClick={() => imagedeleter(data.id,data.image)} className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
        </tr>))

      }
      else{
        setImagetable("No Images Available")
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})

  },[reloader])

  return(<div>
    <AdminHeader head="items" title="Items Viewer" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    {displayer}

    <div className='container'>
      <h2>Add Image for Items</h2>
      <form onSubmit={(e) => imageadder(e)}>
      <div className='row'>
          <div className='col-sm-4' />
          <div className='col-sm-4'>
            <input type='file' className='form-control inputs' required name='image'/><br />
          </div>
          <div className='col-sm-4' />
        </div>
        <center><button type='submit' className='btn btn-sm btn-success'>Submit</button> <button type='reset' ref={resetbtn} className='btn btn-sm btn-secondary'>Reset</button></center>

      </form>
      <br />
      <hr />
      <div>
        <table className='table'>
          <thead>
            <th>S.no</th>
            <th>Image</th>
            <th>Delete</th>
          </thead>
          <tbody>{imagetable}</tbody>
        </table>
      </div>
    </div>
  </div>
);
} 

AdminItemsViewer.propTypes = {};

AdminItemsViewer.defaultProps = {};

export default AdminItemsViewer;
