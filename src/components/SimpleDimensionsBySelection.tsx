import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
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

// const processDataList = (apiData: any) => {
//   // const labels = datum.map((item: any) => item.HourOfBet);
//   const labellist = apiData.map((item: any) => item.selection);
//   // const averageProbability = datum.map((item: any) => parseInt(item.AverageProbability));

//   return { labellist };
// };


interface SimpleDimensionsBySelectionProps {
  apiData: any; // Replace 'any' with a more specific type if possible
  options: any; // Same as above
  topSelection: any; // Same as above
}


export default function SimpleDimensionsBySelection({ apiData, options, topSelection }: SimpleDimensionsBySelectionProps) {
  // const { apiData, options, topSelection } = props;
  // const [selectedValue, setSelectedValue] = useState('');
  // const [chartData, setChartData] = useState(data); // For the first chart
  // const [chartDataLarge, setChartDataLarge] = useState(data_large); // For the second chart
/*
apiData
:

lternateBets
:
"0"
AverageComponentCount
:
"2.0000"
AverageComponentPrice
:
"375.0000"
AverageLine
:
null
AverageProbability
:
null
NumberOfComponents
:
1
StandardBets
:
"1"
TotalBookProfitComponent
:
"0"
TotalBookRiskComponent
:
"0"
selection
:
"john collins"
*/



let new_data_large = {
  labels: ['Per Dropdown Selection'],
  datasets: [
    // {
    //   label: 'Dat 1',
    //   data: labels.map(() => (Math.random()*1000)),
    //   backgroundColor: 'rgb(255, 99, 132)',
    // },
    {
      label: 'Dat 2',
      data: labels.map(() => 1000),
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Data 3',
      data: labels.map(() => -1000),
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};


/*

{selection: 'no', NumberOfComponents: 239, AverageComponentPrice: '-1437.5397', TotalBookRiskComponent: '3205', TotalBookProfitComponent: '4', …}
options
:
{responsive: true, plugins: {…}}
style
:
{transform: 'scale(0.8)'}
topSelection
:
3
*/
  console.log(apiData.data);
  console.log(topSelection);
  console.log(typeof apiData.data);
// ajsonArray.splice(16, 1);
  // const jsonArray = JSON.parse(apiData.data);
  // console.log(apiData.data[17]); // [topSelection]);

  if (apiData && apiData.data && apiData.data.length > 17) {
    console.log(apiData.data[parseInt(topSelection)]);
    const itemData = apiData.data[parseInt(topSelection)];

    new_data_large = {
      labels: ['Per Dropdown Selection'],
      datasets: [
        // {
        //   label: 'Dat 1',
        //   data: labels.map(() => (Math.random()*1000)),
        //   backgroundColor: 'rgb(255, 99, 132)',
        // },
        {
          label: 'Dat 2',
          data: itemData.AverageComponentCount, //labels.map(() => 1000),
          backgroundColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Data 3',
          data: itemData.StandardBets, //labels.map(() => -1000),
          backgroundColor: 'rgb(53, 162, 235)',
        },
      ],
    };

  } else {
    console.log('apiData.data is undefined or does not have 18 elements');
  }



  return (<>
    <Box>
      <Bar options={options_large} data={new_data_large} style={{margin:'5px 50px 40px 5px',display:'flex',transform:'scale(0.90)'}}  />
    </Box>
  </>
  );
}
