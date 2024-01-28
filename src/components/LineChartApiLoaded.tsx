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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};


// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     // {
//     //   label: 'Dataset 2',
//     //   data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
//     //   borderColor: 'rgb(53, 162, 235)',
//     //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     // },
//     // {
//     //   label: 'Dataset 3',
//     //   data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
//     //   borderColor: 'green',
//     //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     // },
//   ],
// };

const processData = (apiData:any) => {
  // console.log(apiData.apiData);

  let arrayData = Array.of(apiData.apiData);
  console.log(arrayData[0]);
  let datum = Array.from(arrayData[0]);

  /*
  const labels = apiData.apiData.map(item => item.HourOfBet);
  const averageBetAmountData = apiData.apiData.map(item => parseFloat(item.AverageBetAmount));

  return { labels, averageBetAmountData };
  */
  const labels = datum.map(item => item.HourOfBet);
  const averageBetAmountData = datum.map(item => parseFloat(item.AverageBetAmount));


  return { labels, averageBetAmountData };
};



export default function LineChartApiLoaded(apiData:any) {
  const { labels, averageBetAmountData } = processData(apiData);
  // processData(apiData);

  console.log(apiData);
  console.log(labels);
  let dataset = [
    {
      data: averageBetAmountData,
     //  labels.map(() => chance.integer({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ];


  /*
  dataset = averageBetAmountData.map((i, index) => {
    return {
      data: Array.from({ length: labels.length }, () => chance.integer({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    };
  });
  */

  let data = {
    labels,
    datasets: dataset,
    /* [
      {
        data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
        // data: averageBetAmountData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ], */
  };

  return <Line options={options} data={data} />;
}
