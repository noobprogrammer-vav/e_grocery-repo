import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';


const AdminItems = () => {


  const [tabler,setTabler] = useState()
  const [imagetable,setImagetable] = useState()
  const [reloader,setReloader] = useState()

  const [categories,setCategories] = useState()

  const [units,setUnits] = useState(0)

  const [items,setItems] = useState()


  const [quilldata,setQuilldata] = useState()

  const resetbtn = useRef()

  const navigate = useNavigate()

  function submitter(e)
  {
    e.preventDefault()

    const formData = {
      name: e.target.name.value,
      summary: e.target.summary.value,
      description: quilldata,
      category: e.target.category_id.value,
      quantity: e.target.quantity.value,
      price: e.target.price.value,
      unit_id: e.target.unit_id.value,
    }

    axios.post(`${sessionStorage.getItem("urls")}/additem`,formData).then((response) => {
      toast.success("Added",{position:"top-center"})
      setReloader(reloader == true ? false : true)
      resetbtn.current.click()
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
  }

  function deleter(Id,state)
  {
     if(state == 0)
     {
        toast.success("Activated",{position:"top-center"})
     }
     else{
        toast.error("Deactivated",{position:"top-center"})
     }
     axios.get(`${sessionStorage.getItem("urls")}/deleteitem/${Id}`).then((response) => {
        setReloader(reloader == true ? false : true)
        }).catch((err) => {toast.error("Server Error",{position:"top-center"})
        console.log(err)})
  }

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/getallitem`).then((response) => {
      if(response.data.length > 0)
      {
        setTabler(response.data.map((data,index) => <tr>
          <td>{index+1}</td>
          <td>{data.name}</td>
          <td>{data.summary}</td>
          <td dangerouslySetInnerHTML= { { __html: data.description }} />
          <td>{data.price}</td>
          <td>{data.unit_name}</td>
          <td>{data.quantity}</td>
          <td><p className={data.status == 0 ? "badge bg-danger" : "badge bg-success"}>{data.status == 0 ? "Deactive" : "Active"}</p></td>
          <td><button onClick={() => deleter(data.id,data.status)} className={data.status == 0 ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"}><i className={data.status == 0 ? "fa fa-check" : "fa fa-times"} /></button> <i onClick={() => navigate("/admin/items/view",{state:data.id})} className='btn btn-sm btn-success fa fa-eye'></i></td>
        </tr>))

        setItems(response.data.map((data,index) => <option value={data.id}>{data.name}</option>))
      }
      else{
        setTabler("No Items Available")
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
  },[reloader])

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/getcategory`).then((response) => {
      setCategories(response.data.map((data,index) => <option value={data.id}>{data.name}</option>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})

      axios.get(`${sessionStorage.getItem("urls")}/getunits`).then((response) => {
        setUnits(response.data.map((data,index) => <option value={data.id}>{data.unit_name}</option>))
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
        console.log(err)})

  },[])

  function imageadder(e)
  {
    e.preventDefault()
    const formData = new FormData()
    formData.append("item_id", e.target.item_id.value)
    formData.append("file",e.target.image.files[0])


    axios.post(`${sessionStorage.getItem("urls")}/additemimage`,formData).then((response) => {
      getimages()
      }).catch((err) => {toast.error("Server Error",{position:"top-center"})
      console.log(err)})

  }

  function imagedeleter(id,image)
  {
    axios.post(`${sessionStorage.getItem("urls")}/deleteitemimage/${id}`,{image : image}).then((response) => {
      toast.success("Deleted",{position:"top-center"})
      getimages()
      resetbtn.current.click()
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
  }


  function getimages()
  {
    if(document.getElementById("getimage").value == "none")
    {}
    else{
      axios.get(`${sessionStorage.getItem("urls")}/getitemimages/${document.getElementById("getimage").value}`).then((response) => {
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
    }
  }


  return(<div>
    <AdminHeader head="items" title="Items" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='container'>
    <marquee> Make sure to add Item Image as soon as Item is Added</marquee>
      <h2>Add Item</h2>
      <form className='p-5' onSubmit={(e) => submitter(e)}>
        <div className='row'>
          <div className='col-sm-4'>
            <input className='form-control inputs' required placeholder='Item Name' name='name'/><br />
          </div>
          <div className='col-sm-4'>
            <input className='form-control inputs' required placeholder='Item Summary' name='summary'/><br />
          </div>
          <div className='col-sm-4'>
            <input type='number' className='form-control inputs' required placeholder='Item Price' name='price'/><br />
          </div>
          <div className='col-sm-4'>
            <input type='number' className='form-control inputs' required placeholder='Item Quantity' name='quantity'/><br />
          </div>
          <div className='col-sm-4'>
            <select className='form-control inputs' required name='unit_id' defaultValue={"none"}>
              <option value={"none"} disabled>--Select Unit--</option>
              {units}
            </select>
          </div>
          <div className='col-sm-4'>
            <select className='form-control inputs' required name='category_id' defaultValue={"none"}>
              <option value={"none"} disabled>--Select Category--</option>
              {categories}
            </select>
          </div>
          <div className='col-sm-12'>
            <label>Item Description</label>
            <ReactQuill theme='snow' onChange={setQuilldata} /><br />
          </div>
        </div>
        <center><button type='submit' className='btn btn-sm btn-success'>Submit</button> <button type='reset' ref={resetbtn} className='btn btn-sm btn-secondary'>Reset</button></center>
      </form>
      <br />
      <h2>All items</h2>
      <br />
      <table className='table table-stripped'>
        <thead>
          <th>S.no</th>
          <th>Name</th>
          <th>Summary</th>
          <th>Description</th>
          <th>Price</th>
          <th>Units</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Activate / Deactivate</th>
        </thead>
        <tbody>{tabler}</tbody>
      </table>
    </div>
    <hr />
    <hr />

    <div className='container'>
      <h2>Add Image for Items</h2>
      <form onSubmit={(e) => imageadder(e)}>
      <div className='row'>
          <div className='col-sm-6'>
            <select className='form-control inputs' required name='item_id' defaultValue={"none"}>
              <option value={"none"} disabled>--Select Item--</option>
              {items}
            </select>
          </div>
          <div className='col-sm-6'>
            <input type='file' className='form-control inputs' required name='image'/><br />
          </div>
        </div>
        <center><button type='submit' className='btn btn-sm btn-success'>Submit</button> <button type='reset' ref={resetbtn} className='btn btn-sm btn-secondary'>Reset</button></center>

      </form>
      <br />
      <hr />
      <div>
        <center><select style={{width:"20%"}} onChange={getimages} className='form-control inputs' name='item' id='getimage' defaultValue={"none"}>
          <option value={"none"} disabled>--Select Item--</option>
          {items}
        </select></center><hr /><br />
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

AdminItems.propTypes = {};

AdminItems.defaultProps = {};

export default AdminItems;
