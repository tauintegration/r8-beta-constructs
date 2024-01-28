import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const datasets = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};


const processData = (apiData: any) => {
  let arrayData = Array.of(apiData.apiData);
  let datum = Array.from(arrayData[0]);

  // const labels = datum.map((item: any) => item.HourOfBet);

  const labels = datum.map((item: any) => item.CountryID);
  const totalBetAmount = datum.map((item: any) => parseInt(item.TotalBetAmount));

  return { labels, totalBetAmount };
};

/*
AlternateBets
:
"197138"
AverageComponentCount
:
"11.2007"
AverageComponentPrice
:
"759.8003"
AverageLine
:
"12.2217"
AverageProbability
:
"0.4769"
NumberOfComponents
:
479357
StandardBets
:
"282219"
TotalBookProfitComponent
:
"350305"
TotalBookRiskComponent
:
"1592480"
selection
:
"over"
*/

export default function DoughnutChart(apiData:any, options: any) {
  let { labels, totalBetAmount } = processData(apiData);


  console.log(apiData);
  console.log(labels);


  // let dataset = [
  //   {
  //     label: 'totalNoBets',
  //     data: labels,
  //     borderColor: 'tomato',
  //     backgroundColor: 'gray',
  //   },
  // ];

  // let data = {
  //   labels,
  //   datasets
  // };

  function valuetext(value: number) {
    return `${value}°C`;
  }
  return <Doughnut options={options} data={datasets}  style={{margin:'5px 50px 40px 5px',display:'flex',transform:'scale(0.90)'}}  />;
}
