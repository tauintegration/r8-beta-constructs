import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const rainbowColors = [
  '#FFFF00', '#E6FF00', '#CCFF00', '#B3FF00', '#99FF00',
  '#00FF00', '#00FF19', '#00FF33', '#00FF4C', '#00FF66',
  '#00FFFF', '#00E5FF', '#00CCFF', '#00B2FF', '#0099FF',
  '#0000FF', '#1900FF', '#3300FF', '#4C00FF', '#6600FF',
  '#FF00FF'
];

function generateRainbowColors(count: number) {
  const colors = [];
  for (let i = 0; i < count; i++) {
      // Calculate the hue value, spread over 360 degrees
      const hue = (i / count) * 360;
      colors.push(`hsl(${hue}, 100%, 50%)`);
  }
  return colors;
}

const rainbowColored = generateRainbowColors(50);


let data = {
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: rainbowColored,
      borderColor: rainbowColored,
      borderWidth: 1,
    },
  ],
};



const processData = (apiData: any) => {
  let arrayData = Array.of(apiData.apiData);
  let datum = Array.from(arrayData[0]);

  // const labels = datum.map((item: any) => item.HourOfBet);

  const labels = datum.map((item: any) => item.line);
  const numberOfComponents = datum.map((item: any) => parseInt(item.NumberOfComponents));
  const totalBookRiskComponent = datum.map((item: any) => parseInt(item.TotalBookRiskComponent));
  const averageComponentPrice = datum.map((item: any) => parseInt(item.AverageComponentPrice));

  return { labels, numberOfComponents, averageComponentPrice, totalBookRiskComponent};
};

export default function BasicPie(apiData:any, options: any) {
  let { labels, numberOfComponents, averageComponentPrice, totalBookRiskComponent } = processData(apiData);

  console.log(apiData);
  console.log(labels);

  let dataset = [
    {
      // label: 'No',
      data: numberOfComponents,
      // borderColor: 'tomato',
      backgroundColor: rainbowColored,
    },
  ];

  let data = {
    labels,
    datasets: dataset,
  };
  function valuetext(value: number) {
    return `${value}°C`;
  }

  return <Pie data={data} style={{margin:'25px',transform:'scale(0.9)'}} />;
}
