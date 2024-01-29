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

const processDataList = (apiData: any) => {
  const labellist = apiData.map((item: any) => item.selection);

  return { labellist };
};


export default function CrossSectionViews(apiData:any, options: any) {
  const [selectedValue, setSelectedValue] = useState('');
  const [chartData, setChartData] = useState(data); // For the first chart
  const [chartDataLarge, setChartDataLarge] = useState(data_large); // For the second chart

  console.log(apiData);
  const labels = apiData.apiData.data; //.map((item: any) => item.selection);

  console.log(labels);
  const list = processDataList(labels);
  console.log(list);


  const handleChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {


    const selectedItem = apiData.apiData.data.find((item:any) => item.selection === "under");

    console.log(selectedItem);
    console.log(data);
    console.log(data_large);

    data.datasets[0].label = 'TotalBookRisk';
    data.datasets[0].data[0] = selectedItem.TotalBookRiskComponent;
    data.datasets[1].label = 'TotalBookProfit';
    data.datasets[1].data[0] = selectedItem.TotalBookProfitComponent;


    data_large = {
      labels: ['1 thing'],
      datasets: [
        {
          label: 'Det 1',
          data: selectedItem.AverageComponentPrice,
          backgroundColor: 'pink',
        },
        {
          label: 'Dat 2',
          data: selectedItem.TotalBookProfitComponent,
          backgroundColor: 'chartereuse',
        },
        {
          label: 'Dat 3',
          data: selectedItem.StandardBets,
          backgroundColor: 'slategrey',
        },
      ],
    };


    const newData = {
      ...data,
      datasets: data.datasets.map((dataset, index) => {
        if (index === 0) {
          return { ...dataset, label: 'TotalBookRisk', data: [selectedItem.TotalBookRiskComponent] };
        } else if (index === 1) {
          return { ...dataset, label: 'TotalBookProfit', data: [selectedItem.TotalBookProfitComponent] };
        }
        return dataset;
      })
    };

    const newDataLarge = {
      labels: ['1 thing'],
      datasets: [
        {
          label: 'Det 1',
          data: [selectedItem.AverageComponentPrice],
          backgroundColor: 'pink',
        },
        {
          label: 'Dat 2',
          data: [selectedItem.TotalBookProfitComponent],
          backgroundColor: 'chartereuse',
        },
        {
          label: 'Dat 3',
          data: [selectedItem.StandardBets],
          backgroundColor: 'slategrey',
        },
      ],
    };


    // Update state with new data objects
    setChartData(newData);
    setChartDataLarge(newDataLarge);

  }, [selectedValue, apiData, data]);



  const listOut = list.labellist.map((label: any, index: any) => (
    <MenuItem key={index} value={index}>{label}</MenuItem>
  ));

  return (<>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ minWidth: 400, maxWidth: 500 }} style={{ margin: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Bet Selection</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={selectedValue}
            onChange={handleChange}
          >
            {listOut}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Bar options={options} data={data} style={{margin:'5px 50px 40px 5px',display:'flex',transform:'scale(0.90)'}}  />
      </Box>
    </Box>
    <Box>
      <Bar options={options_large} data={data_large} style={{margin:'5px 50px 40px 5px',display:'flex',transform:'scale(0.90)'}}  />
    </Box>
  </>
  );
}
