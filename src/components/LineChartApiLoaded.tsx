import React from 'react';
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
import { Chance } from 'chance';

const chance = new Chance();


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface ApiData {
  apiData: any[]; // Replace `any[]` with a more specific type if possible
}

const processData = (apiData: ApiData | undefined) => {

  let arrayData = [];
  if (apiData && apiData.apiData) {
    arrayData = apiData.apiData;

  }

<<<<<<< Updated upstream
=======
const processData = (apiData:any) => {
>>>>>>> Stashed changes

  console.log(arrayData[0]);
  let datum = Array.from(arrayData[0] as any[]);
  const labels = datum.map((item: any) => item.HourOfBet);

<<<<<<< Updated upstream
  const averageBetAmountData = datum.map(item => parseFloat(item.AverageBetAmount));
  const totalBetAmount = datum.map(i => parseFloat(i.TotalBetAmount));
  const totalBetProbability = datum.map(i => parseInt(i.TotalBetProbability));
=======
  const labels = datum.map((item: any) => item.HourOfBet);

//   const labels = datum.map(item => item.HourOfBet);
  const averageBetAmountData = datum.map((item: any) => parseFloat(item.AverageBetAmount));
  const totalBetAmount = datum.map((item: any) => parseFloat(item.TotalBetAmount));
  const totalBetProbability = datum.map((item: any) => parseInt(item.TotalBetProbability));
>>>>>>> Stashed changes

  return { labels, averageBetAmountData, totalBetAmount, totalBetProbability };
};


export default function LineChartApiLoaded(apiData:any, options: any) {
  const { labels, averageBetAmountData, totalBetAmount, totalBetProbability } = processData(apiData);

  console.log(apiData);
  console.log(labels);
  let dataset = [
    {
      label: 'averageBetAmountData',
      data: totalBetAmount,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    //   label: 'averageBetAmountData',
    //   data: averageBetAmountData,
    //   borderColor: 'rgb(255, 99, 132)',
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
    // {
    //   label: 'totalBetAmount',
    //   data: totalBetAmount,
    //   borderColor: 'rgb(255, 99, 132)',
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
    // {
    //   label: 'totalBetProbability',
    //   data: totalBetProbability,
    //   borderColor: 'rgb(255, 99, 132)',
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
  ];

  //totalBetAmount, totalBetProbability

  let data = {
    labels,
    datasets: dataset,
  };

  return <Line options={options} data={data} />;
}
