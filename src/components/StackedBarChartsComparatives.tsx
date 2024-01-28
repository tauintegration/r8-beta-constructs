import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Chance } from 'chance';

const chance = new Chance();

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};


const processData = (apiData: any) => {
  let arrayData = Array.of(apiData.apiData);
  let datum = Array.from(arrayData[0]);

  const labels = datum.map((item: any) => item.HourOfDay);
  // Map 'AverageBetPrice' and convert it to a floating point number
  const averageBetPrice = datum.map((item: any) => parseFloat(item.AverageBetPrice));

  return { labels, averageBetPrice };
};



export default function StackedBarChartComparatives(apiData:any, options: any) {
  let { labels, averageBetPrice } = processData(apiData);


  console.log(apiData);
  console.log(labels);


  let dataset = [
    {
      label: 'Average Bet Price',
      data: averageBetPrice,
      borderColor: 'blue',
      backgroundColor: 'tomato',
    },
  ];

  let data = {
    labels,
    datasets: dataset,
  };
  function valuetext(value: number) {
    return `${value}°C`;
  }
  return <Bar options={options} data={data}  style={{margin:'25px',transform:'scale(0.9)'}}/>;
}
