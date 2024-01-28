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
import Chance from 'chance';

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

/*
AverageBetAmount
:
"2750499705.3267"
AverageBetProbability
:
"0.0035"
AverageBookRisk
:
"9.0637"
BetType
:
"Multi Bet"
BetTypeName
:
"multi"
TotalBetAmount
:
"1365900904164951"
TotalBets
:
498471
*/

const processData = (apiData: any) => {
  let arrayData = Array.of(apiData.apiData);
  let datum = Array.from(arrayData[0]);

  const labels = datum.map((item: any) => item.BetType);
  const averageBetAmount = datum.map((item: any) => parseFloat(item.AverageBetAmount));
  const totalBetAmount = datum.map((item: any) => parseFloat(item.TotalBetAmount));
  const averageBetProbability = datum.map((item: any) => parseFloat(item.AverageBetProbability));
  const averageBookRisk = datum.map((item: any) => parseFloat(item.AverageBookRisk));
  const totalBets = datum.map((item: any) => parseFloat(item.TotalBets));

  return { labels, averageBetAmount, totalBetAmount, averageBetProbability, totalBets, averageBookRisk};
};


export default function VerticalBarChartComparatives(apiData:any, options: any) {
  let { labels, averageBetAmount, totalBetAmount, averageBetProbability, totalBets, averageBookRisk } = processData(apiData);

  console.log(apiData);
  console.log(labels);

  let dataset = [
    // {
    //   label: 'Average Bet Amount',
    //   data: averageBetAmount,
    //   borderColor: 'rgb(255, 99, 132)',
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
    // {
    //   label: 'Total Bet Amount',
    //   data: totalBetAmount,
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
    // {
    //   label: 'Average Bet Probability',
    //   data: averageBetProbability,
    //   borderColor: 'rgb(255, 99, 132)',
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
    {
      label: 'Total Bet Count',
      data: totalBets,
      borderColor: 'darkblue',
      backgroundColor: 'blue',
    },
    {
      label: 'Average Bet Amount',
      data: averageBookRisk,
      borderColor: 'darkpurple',
      backgroundColor: 'purple',
    },
  ];

  let data = {
    labels,
    datasets: dataset,
  };
  function valuetext(value: number) {
    return `${value}°C`;
  }
  return <Bar options={options} data={data} style={{margin:'25px',transform:'scale(0.9)'}}/>;
}
