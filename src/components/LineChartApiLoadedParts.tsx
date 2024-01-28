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


const processData4OverUnder = (apiData: any) => {
  let arrayData = Array.of(apiData.apiData);
  let datum = Array.from(arrayData[0]);

  const labels = datum.map((item: any) => item.HourOfBet);

    const totalOverBets = datum.map((item: any) => parseInt(item.TotalOverBets, 10));
    const totalUnderBets = datum.map((item: any) => parseInt(item.TotalUnderBets, 10));

  return { labels, totalOverBets, totalUnderBets };
};


export default function LineChartApiLoadedParts(apiData:any, options: any) {

  let labelseries;
  let dataset;
  let data;
  let { labels, totalOverBets, totalUnderBets } = processData4OverUnder(apiData);

  dataset = [
      {
        label: 'totalOverBets',
        data: totalOverBets,
        borderColor: 'blue',
        backgroundColor: 'aqua',
      },
      {
        label: 'totalUnderBets',
        data: totalUnderBets,
        borderColor: 'purple',
        backgroundColor: 'goldenrod',
      },
    ];
    labelseries = labels;

  console.log(labelseries);

  data = {
    labels: labelseries,
    datasets: dataset,
  };
  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (<>
    <Line options={options} data={data} />
  </>);
}
