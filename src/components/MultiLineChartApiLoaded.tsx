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

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};


const processData = (apiData:any) => {

  let arrayData = Array.of(apiData.apiData);
  console.log(arrayData[0]);
  let datum = Array.from(arrayData[0]);

  console.log(datum.length);

  const labels = datum.map((item:any) => item.HourOfBet);
  const averageBetAmountData = datum.map((item:any) => parseFloat(item.AverageBetAmount));
  const totalBetAmount = datum.map((i:any) => parseFloat(i.TotalBetAmount));
  const totalBetProbability = datum.map((i:any) => parseInt(i.TotalBetProbability));
  const totalBetRisk = datum.map((i:any) => parseInt(i.TotalBetRisk));

  return { labels, averageBetAmountData, totalBetAmount, totalBetProbability, totalBetRisk };
};

export default function MultiLineChartApiLoaded(apiData:any, options: any) {

  let { labels, averageBetAmountData, totalBetAmount, totalBetProbability, totalBetRisk } = processData(apiData);

  const [rangeValue, setRangeValue] = useState<number[]>([0, 99]);
  const [mappedRangeValue, setMappedRangeValue] = useState<number[]>([0, 35]);
  const [rawRangeData, setRawRangeData] = useState<number[]>([0, 99]);

  console.log(apiData);
  console.log(labels);

  let dataProcessed;

  const handleChange = (event: Event, newValue: number | number[]) => {

     console.log(newValue);
  };


  let dataset = [
    {
      label: 'Total Bet Amount',
      data: totalBetAmount,
      borderColor: 'coral',
      backgroundColor: 'aqua',
    },
    {
      label: 'Total Bet Probability',
      data: totalBetProbability,
      borderColor: 'black',
      backgroundColor: 'gray',
    },
    {
      label: 'Total Bet Risk',
      data: totalBetRisk,
      borderColor: 'goldenron',
      backgroundColor: 'whitesmoke',
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
    <Line options={options} data={data} style={{margin:'25px',transform:'scale(0.9)'}}/>
  </>);
}
