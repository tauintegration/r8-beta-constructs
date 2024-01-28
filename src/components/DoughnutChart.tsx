import React, { useEffect, useState } from 'react';
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


export default function DoughnutChart(apiData:any, options: any) {
  const [selectedValue, setSelectedValue] = useState('');
  const [chartData, setChartData] = useState({});


  console.log(apiData);
  const labels = apiData.apiData.data; //.map((item: any) => item.selection);

  console.log(labels);
  const list = processData(labels);
  console.log(list);


  const handleChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const updatedData = {};
    // some chartDataUpdater(selectedValue);

    // fetch('/api/dimensional/bet-selection/a?parameter=123')
    //   .then(response => response.json())
    //   .then((data:any) => {
    //     // setValue(data);
    //     console.log(data);

    //     // setChartData(updatedData);
    //     setChartData(data);
    //     console.log(chartData);
    const selectedItem = apiData.apiData.data.find((item:any) => item.selection === "under");

    //     const selectedItem = data.find((item:any) => item.selection === selectedValue);
    console.log(selectedItem);

    //    })
    //    .catch(error => { });

  }, [selectedValue]);



//   useEffect(() => {

//     setIsLoading(true);

//     fetch('/api/dimensional/bet-selection/a?parameter=123')
//       .then(response => response.json())
//       .then(data => {
//         setValue(data);

//         // let {
//         //   labels,
//         //   alternateBets,
//         //   averageComponentCount,
//         //   averageComponentPrice,
//         //   averageLine,
//         //   averageProbability,
//         //   numberOfComponents,
//         //   standardBets,
//         //   totalBookProfitComponent,
//         //   totalBookRiskComponent
//         // } = processDataAtContainer(data);

//         console.log(value);
//         // console.log(data);

//         // if(!!value) { labels = value.data.map((item: any) => item.selection); console.log(labels); }
//         setIsLoading(false); //
//       })
//       .catch(error => { });

// }, []);



  const listOut = list.labellist.map((label: any, index: any) => (
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
            label="Age"
            value={selectedValue}
            onChange={handleChange}
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
