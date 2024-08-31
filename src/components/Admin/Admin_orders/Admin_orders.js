import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AdminOrders = () => {


  const navigate = useNavigate()
  const [state,setState] = useState("getonprogressadmin") //getcanceledadmin, getcompletedadmin
  const [tabler,setTabler] = useState()
  const [onecolor,setOnecolor] = useState("green")

  const [formData, setFormdata] = useState()
 
  const [items,setItems] = useState()
  const [users,setUsers] = useState()
  const [reloader,setReloader] = useState(true)

  function markcomplete(od_no)
  {
    axios.post(`${sessionStorage.getItem("urls")}/delivered`,{order_number : od_no}).then((response) => {
      toast.success("Marked as Completed",{position:"top-center"})
      setReloader(reloader == true ? false : true)
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  function reversed(od_no)
  {
    axios.post(`${sessionStorage.getItem("urls")}/returned`,{order_number : od_no}).then((response) => {
      toast.error("Marked as In-Completed",{position:"top-center"})
      setReloader(reloader == true ? false : true)
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  useEffect(() => {
    if(formData == undefined)
    {
      axios.get(`${sessionStorage.getItem("urls")}/${state}`).then((response) => {
        if(response.data.length > 0)
        {
          setTabler(response.data.map((data,index) => <tr>
            <td>{index + 1}</td>
            <td onClick={() => navigate("/details",{state: data.item_id})}>{data.order_number}</td>
            <td onClick={() => navigate("/details",{state: data.item_id})} style={{width:"50%"}}><img width={"70%"} src={require(`../../uploads/${data.image}`)} /></td>
            <td onClick={() => navigate("/details",{state: data.item_id})}>{data.name}</td>
            <td>{data.user_name}</td>
            <td onClick={() => navigate("/details",{state: data.item_id})}>{data.price} * {data.count} {data.unit_name} = {parseFloat(data.price) * parseInt(data.count)}</td>
            {state == "getonprogressadmin" ? <td><button onClick={() => markcomplete(data.order_number)} className='btn btn-sm btn-success'>Complete?</button></td> : state == "getcompletedadmin" ? <td><button onClick={() => reversed(data.order_number)} className='btn btn-sm btn-danger'>Return?</button></td> : ""}
          </tr>))
        }
        else{
          setTabler("No Orders yet")
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      axios.post(`${sessionStorage.getItem("urls")}/ordersfilter_${state}`,formData[0]).then((response) => {
        if(response.data.length > 0)
        {
          setTabler(response.data.map((data,index) => <tr>
            <td>{index + 1}</td>
            <td onClick={() => navigate("/details",{state: data.item_id})}>{data.order_number}</td>
            <td onClick={() => navigate("/details",{state: data.item_id})} style={{width:"50%"}}><img width={"70%"} src={require(`../../uploads/${data.image}`)} /></td>
            <td onClick={() => navigate("/details",{state: data.item_id})}>{data.name}</td>
            <td>{data.user_name}</td>
            <td onClick={() => navigate("/details",{state: data.item_id})}>{data.price} * {data.count} {data.unit_name} = {parseFloat(data.price) * parseInt(data.count)}</td>
            {state == "getonprogressadmin" ? <td><button onClick={() => markcomplete(data.order_number)} className='btn btn-sm btn-success'>Complete?</button></td> : state == "getcompletedadmin" ? <td><button onClick={() => reversed(data.order_number)} className='btn btn-sm btn-danger'>Return?</button></td> : ""}          </tr>))
        }
        else{
          setTabler("No Orders yet")
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
  },[state,reloader])

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/getallitem`).then((response) => {
      setItems(response.data.map((data,index) => <option value={data.id}>{data.name}</option>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
    axios.get(`${sessionStorage.getItem("urls")}/getallusers`).then((response) => {
      setUsers(response.data.map((data,index) => <option value={data.id}>{data.name}</option>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    // axios.get(`${sessionStorage.getItem("urls")}/getallratings`).then((response) => {
    //   setRatings(response.data.map((data,index) => <tr>
    //     <td>{index + 1}</td>
    //     <td>{data.user_name}</td>
    //     <td>{data.item_name}</td>
    //     <td>{data.rating}</td>
    //     <td>{Date(data.created_at)}</td>

    //   </tr>))
    // })


  },[])

  function tabs(e)
  {
    setOnecolor("")
    if(e == "getonprogressadmin")
    {
      document.getElementById("getcompletedadmin1").style.color = "black"
      document.getElementById("getcanceledadmin1").style.color = "black"

    }
    else if(e == "getcompletedadmin")
    {
      document.getElementById("getonprogressadmin1").style.color = "black"
      document.getElementById("getcanceledadmin1").style.color = "black"
    }
    else{
      document.getElementById("getonprogressadmin1").style.color = "black"
      document.getElementById("getcompletedadmin1").style.color = "black"
    }
    document.getElementById(`${e}1`).style.color = "green"
    setState(e)
    // document.getElementById(`${e}1`).style.height = "5px"

  }

  function submitter(e)
  {
    e.preventDefault()
    if(e.target.user.value == "none" && e.target.item.value == "none")
    {
      toast.warning("Select atleast 1 field",{position:"top-center"})
    }
    else{
      setFormdata([{user_id : e.target.user.value == "none" ? null : e.target.user.value, item_id : e.target.item.value == "none" ? null : e.target.item.value}])
      setReloader(reloader == true ? false : true)
    }
  }


  return(<div>
    <AdminHeader head="orders" title="Orders" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

    <div className='container'>
      <div className='row'>
      <div className='col-sm-2'>
          <h2>Filter</h2>
          <hr />
          <form onSubmit={(e) => submitter(e)}>
          <h5><b>By User</b></h5>
          <select name='user' defaultValue={"none"} className='form-control inputs' >
            <option value={"none"}>--Select--</option>
            {users}
          </select>
          <br />
          <h5><b>By Item</b></h5>
          <select name='item' defaultValue={"none"} className='form-control inputs' >
            <option value={"none"}>--Select--</option>
            {items}
          </select><br />
          <button type='submit' className='btn btn-sm btn-success'>Submit</button> <button type='reset' className='btn btn-sm btn-secondary'>Reset</button>
          </form>
        </div>
        <div className='col-sm-10'>
              <div data-aos="fade-up" className='row'>
                <div id='getonprogressadmin' style={{cursor:"pointer"}} onClick={() => tabs("getonprogressadmin")} className='col-sm-4'>Track Orders<hr style={{border: `3px solid ${onecolor}`}} id='getonprogressadmin1' /></div>
                <div id='getcompletedadmin' style={{cursor:"pointer"}} onClick={() => tabs("getcompletedadmin")} className='col-sm-4'>Completed Orders<hr style={{border: "3px solid"}} id='getcompletedadmin1' /></div>
                <div id='getcanceledadmin' style={{cursor:"pointer"}} onClick={() => tabs("getcanceledadmin")} className='col-sm-4'>Cancelled Orders<hr style={{border: "3px solid"}} id='getcanceledadmin1' /></div>
              </div>
              <table data-aos="flip-left" className='table'>
                <thead>
                  <th>S.no</th>
                  <th>Order<br />number</th>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>User Name</th>
                  <th>Price x Count</th>
                  {state != "getcanceledadmin" ? <th>Action</th> : ""}
                </thead>
                <tbody>
                  {tabler}
                </tbody>
              </table>
        </div>
      </div>

    </div>



  </div>
);
}

AdminOrders.propTypes = {};

AdminOrders.defaultProps = {};

export default AdminOrders;
