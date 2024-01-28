import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const processData = (apiData: any) => {
  let arrayData = Array.of(apiData.apiData);
  let datum = Array.from(arrayData[0]);

  const labels = datum.map((item: any) => item.HourOfBet);

  const totalNoBets = datum.map((item: any) => parseInt(item.TotalNoBets, 10));
  const totalYesBets = datum.map((item: any) => parseInt(item.TotalYesBets, 10));

  return { labels, totalNoBets, totalYesBets };
};



export default function LineChartApiLoadedAlt(apiData:any, options: any) {
  let { labels, totalNoBets, totalYesBets } = processData(apiData);


  console.log(apiData);
  console.log(labels);


  let dataset = [
    {
      label: 'No',
      data: totalNoBets,
      borderColor: 'tomato',
      backgroundColor: 'gray',
    },
    {
      label: 'Yes',
      data: totalYesBets,
      borderColor: 'green',
      backgroundColor: 'moccasin',
    },
  ];

  let data = {
    labels,
    datasets: dataset,
  };
  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (<>
    <Line options={options} data={data}  style={{margin:'25px',transform:'scale(0.9)'}} />
  </>);
}
