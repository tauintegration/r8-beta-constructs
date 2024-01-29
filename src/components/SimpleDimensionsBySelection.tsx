import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Box from '@mui/material/Box';

ChartJS.register(ArcElement, Tooltip, Legend);

let options = {
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

let options_large = {
  plugins: {
    title: {
      display: true,
      text: 'Avg Component Count, Standard Bets, and Avg Line Portions',
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

let labels = ['single'];

let data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 843),
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 1000),
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};

let data_large = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 843),
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 1000),
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => -1000),
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};



interface SimpleDimensionsBySelectionProps {
  apiData: any;
  options: any;
  topSelection: any;
}


export default function SimpleDimensionsBySelection({ apiData, options, topSelection }: SimpleDimensionsBySelectionProps) {


  let new_data_large = {
    labels: ['Per Dropdown Selection'],
    datasets: [
      {
        label: '',
        data: labels.map(() => 1000),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: '',
        data: labels.map(() => -1000),
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ],
  };



  console.log(apiData.data);
  console.log(topSelection);
  console.log(typeof apiData.data);

  if (apiData && apiData.data && apiData.data.length > 17) {
    console.log(apiData.data[parseInt(topSelection)]);
    const itemData = apiData.data[parseInt(topSelection)] || {};

    new_data_large = {
      labels: ['Per Dropdown Selection'],
      datasets: [
        {
          label: 'Average Component Count',
          data: (itemData && itemData.AverageComponentCount !== undefined)?itemData.AverageComponentCount:null,
          backgroundColor: 'deepskyblue',
        },
        {
          label: 'Standard Bets',
          data: (itemData && itemData.StandardBets !== undefined)?itemData.StandardBets:null,
          backgroundColor: 'royalblue',
        },
        {
          label: 'Average Line',
          data: (itemData && itemData.AverageLine !== undefined)?itemData.AverageLine:null,
          backgroundColor: 'midnightblue',
        },
      ],
    };

  } else {
    console.log('apiData.data is undefined or does not have elements');
  }


  return (<>
    <Box>
      <Bar options={options_large} data={new_data_large} style={{margin:'5px 50px 40px 5px',display:'flex',transform:'scale(0.90)'}}  />
    </Box>
  </>
  );
}
