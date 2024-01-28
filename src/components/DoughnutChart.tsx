import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
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
  // let arrayData = Array.of(apiData.apiData);
  // et datum = Array.from(arrayData[0]);

  // const labels = datum.map((item: any) => item.HourOfBet);

  const labellist = apiData.map((item: any) => item.selection);
  // const averageProbability = datum.map((item: any) => parseInt(item.AverageProbability));

  return { labellist };
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


  console.log(apiData);
  const labels = apiData.apiData.data; //.map((item: any) => item.selection);

  console.log(labels);
  const list = processData(labels);
  console.log(list);
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
  function handler() { };

  function valuetext(value: number) {
    return `${value}°C`;
  }
  const listOut = list.labellist.map((label, index) => (
    <MenuItem key={index} value={index}>{label}</MenuItem>
  ));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ minWidth: 400, maxWidth: 500 }} style={{ margin: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Bet Selection</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={1}
            label="Age"
            onChange={handler}
          >
            {listOut}
          </Select>
        </FormControl>
      </Box>

      <Box>
      <Doughnut options={options} data={datasets}  style={{margin:'5px 50px 40px 5px',display:'flex',transform:'scale(0.90)'}}  />
      </Box>
    </Box>
  );
}



const YourComponent = ({ labellist, age, handler }) => {
  const listOut = labellist.map((label, index) => (
    <MenuItem key={index} value={index}>{label}</MenuItem>
  ));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ minWidth: 400, maxWidth: 500 }} style={{ margin: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Bet Selection</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handler}
          >
            {listOut}
          </Select>
        </FormControl>
      </Box>

      <Box>
      <Doughnut options={options} data={datasets}  style={{margin:'5px 50px 40px 5px',display:'flex',transform:'scale(0.90)'}}  />
      </Box>
    </Box>
  );
};
