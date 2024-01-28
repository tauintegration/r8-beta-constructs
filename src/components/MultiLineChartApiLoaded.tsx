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
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';

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





// Usage
const totalItems = 36; // Number of items
const sliderMax = 99; // Max value of the slider

function mapToSliderRange(index, totalItems, sliderMax) {
  console.log(index, totalItems, sliderMax);

  const oldMax = totalItems - 1; // Since index starts from 0
  // console.log(Math.round((index / oldMax) * sliderMax));
  console.log(Math.round((index / oldMax)));

  // return Math.round((index / oldMax) * sliderMax);
  return Math.round((index / oldMax));
}

for (let i = 0; i < totalItems; i++) {
  console.log(`Item ${i} maps to slider value ${mapToSliderRange(i, totalItems, sliderMax)}`);
}



const processData = (apiData: any) => {
  let arrayData = Array.of(apiData.apiData);
  let datum = Array.from(arrayData[0]);

  const labels = datum.map((item: any) => item.HourOfBet);
  const averageBetAmountData = datum.map((item: any) => parseFloat(item.AverageBetAmount));
  const cumulativeBetAmount = datum.map((item: any) => parseFloat(item.CumulativeBetAmount));
  const cumulativeTotalBets = datum.map((item: any) => parseInt(item.CumulativeTotalBets, 10));
  const totalBetAmount = datum.map((item: any) => parseFloat(item.TotalBetAmount));
  const totalBets = datum.map((item: any) => parseInt(item.TotalBets, 10));

  return { labels, averageBetAmountData, cumulativeBetAmount, cumulativeTotalBets, totalBetAmount, totalBets };
};


export default function MultiLineChartApiLoaded(apiData:any, options: any) {
  let { labels, averageBetAmountData, cumulativeBetAmount, cumulativeTotalBets, totalBetAmount, totalBets } = processData(apiData);

  const [rangeValue, setRangeValue] = useState<number[]>([0, 99]);
  const [mappedRangeValue, setMappedRangeValue] = useState<number[]>([0, 35]);
  const [rawRangeData, setRawRangeData] = useState<number[]>([0, 99]);

  console.log(apiData);
  console.log(labels);

  let dataProcessed;

  const handleChange = (event: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);

    console.log(newValue);
    const start = mapToSliderRange(newValue[0], averageBetAmountData.length, sliderMax);
    const end = mapToSliderRange(newValue[1], averageBetAmountData.length, sliderMax );

    const startL = mapToSliderRange(newValue[0], labels.length, sliderMax);
    const endL = mapToSliderRange(newValue[1], labels.length, sliderMax );
    console.log(labels.length);
    console.log(startL, endL);


    dataProcessed = averageBetAmountData.slice(start,end);
    console.log(dataProcessed);

    setMappedRangeValue([startL,endL]);
    console.log(mappedRangeValue);
    console.log(rangeValue);

    // setRangeValue([start,end]);

    console.log(newValue);
  };


  let dataset = [
    // {
    //   label: 'averageBetAmountData',
    //   data: dataProcessed,
    //   borderColor: 'rgb(255, 99, 132)',
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
    {
      label: 'cumulativeBetAmount',
      data: cumulativeBetAmount,
      borderColor: 'orange',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'cumulativeTotalBets',
      data: cumulativeTotalBets,
      borderColor: 'teal',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ];

  //totalBetAmount, totalBetProbability

  let data = {
    labels,
    datasets: dataset,
  };
  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (<>
    <Line options={options} data={data} />
  </>);
}
