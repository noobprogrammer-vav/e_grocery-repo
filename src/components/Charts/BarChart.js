import React from "react";
import {Chart as ChartJS, BarElement} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    BarElement
)

const Barchart = ({chartData}) => {
    return(
        <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>{chartData.title}</h2>
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: false,
                // text: "Users Gained between 2016-2020"
              },
              legend: {
                display: false
              }
            }
          }}
        />
      </div>
    )
}

export default Barchart;