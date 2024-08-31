import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';

import axios from 'axios';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Barchart from '../../Charts/BarChart';
import { toast } from 'react-toastify';

const AdminHome = () => {
  Chart.register(CategoryScale);

  const [item_completed,setItem_completed] = useState([])

  const [item_cancelled,setItem_cancelled] = useState([])


  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/total_sold`).then((response) => {
      document.getElementById("total_sold").innerHTML = response.data.length
    }).catch((err) => console.log(err))

    axios.get(`${sessionStorage.getItem("urls")}/total_cancelled`).then((response) => {
      document.getElementById("total_completed").innerHTML = response.data.length
    }).catch((err) => console.log(err))

    axios.get(`${sessionStorage.getItem("urls")}/most_sold`).then((response) => {
      console.log(response.data)
      if(response.data.length > 0)
      {
        let labels = response.data.map((data,index) => data.name)
        let count = response.data.map((data,index) => data.count)
        let chartdata = {
          labels: labels, 
          title : "Most Sold",
          datasets: [
            {
              label: "Most Sold",
              data: count,
              backgroundColor: [
                "rgba(75,192,192,1)",
                "&quot;#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
              ],
              borderColor: "black",
              borderWidth: 1
            }
          ]
        }
        setItem_completed(<Barchart chartData={chartdata} />)
      }
      else{
        setItem_completed("No Data")
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    axios.get(`${sessionStorage.getItem("urls")}/most_cancelled`).then((response) => {
      console.log(response.data)
      if(response.data.length > 0)
      {
        let labels = response.data.map((data,index) => data.name)
        let count = response.data.map((data,index) => data.count)
        let chartdata = {
          labels: labels, 
          title : "Most Cancelled",

          datasets: [
            {
              label: "Most Cancelled",
              data: count,
              backgroundColor: [
                "red",
                "&quot;#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
              ],
              borderColor: "black",
              borderWidth: 2
            }
          ]
        }
        setItem_cancelled(<Barchart chartData={chartdata} />)
      }
      else{
        setItem_cancelled("No data")
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    // axios.get(`${sessionStorage.getItem("urls")}/getcompletedadmin`).then((response) => {
    //   setItem_completed([{
    //     labels: response.data.map((data,index) => data.name), 
    //     datasets: [
    //       {
    //         label: "Most Bought Item",
    //         data: [1,3,5],
    //         backgroundColor: [
    //           "rgba(75,192,192,1)",
    //           "&quot;#ecf0f1",
    //           "#50AF95",
    //           "#f3ba2f",
    //           "#2a71d0"
    //         ],
    //         borderColor: "black",
    //         borderWidth: 2
    //       }
    //     ]
    //   }])
    // })

//     
// 
// 
// 

  },[])



  return(<div>
      <AdminHeader head="home" title="Home" />
    <button onClick={() => window.scrollTo({top:0})} className='btn btn-sm btn-success up_button'><i className='fa fa-arrow-up' /></button>

      <div className='container'>
      <div className='row'>
        <div className='col-sm-6'>
          <img width={"100%"} src={require(`../../Assets/leftcard.jpg`)} />
          <div className='text-center' style={{marginTop:"-40%", marginLeft:"60%", color:"whitesmoke"}}>
            <h2>Total Items Sold</h2>
            <h3 id="total_sold">0</h3>
          </div>
        </div>
        <div className='col-sm-6'>
        <div style={{marginLeft:"7%", marginTop:'3%', zIndex:"2",position:"sticky", color:"whitesmoke"}}>
          <h2>Total Items Cancelled</h2>
          <h3 style={{marginLeft:"20%"}} id="total_completed">0</h3>
        </div>
        <img width={"100%"} style={{marginTop:"-17%", zIndex:"0", position:"relative"}} src={require(`../../Assets/rightcard.jpg`)} />
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col-sm-6'>
          {/* <img width={"100%"} src={require(`../../Assets/rightcard2.jpg`)} />
          <div className='text-center' style={{marginTop:"-40%", marginLeft:"60%", color:"whitesmoke"}}>
            <h2>Most Sold</h2>
            <p id="msp">0</p>
          </div> */}
          {item_completed}
        </div>
        <div className='col-sm-6'>
          {item_cancelled}
        {/* <div style={{marginLeft:"10%", marginTop:'3%', zIndex:"2",position:"sticky", color:"whitesmoke"}}>
          <h2>Most Cancelled</h2>
          <p style={{marginLeft:"15%"}} id="mrp">0</p>
        </div>
        <img width={"100%"} style={{marginTop:"-17%", zIndex:"0", position:"relative"}} src={require(`../../Assets/leftcard2.jpg`)} /> */}
        </div>
      </div>
    </div>
  </div>
);
}

AdminHome.propTypes = {};

AdminHome.defaultProps = {};

export default AdminHome;
