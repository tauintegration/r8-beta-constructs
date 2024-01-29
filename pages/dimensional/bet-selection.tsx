import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuDrawer from '@/src/components/MenuDrawer';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import SimpleDimensionsBySelection from '@/src/components/SimpleDimensionsBySelection';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { join } from 'path';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});


// const processDataAtContainer = (apiData: any) => {
//   let arrayData = Array.of(apiData.apiData);
//   let datum = Array.from(arrayData[0]);

//   const labels = datum.map((item: any) => item.selection);
//   const alternateBets = datum.map((item: any) => parseInt(item.AlternateBets, 10));
//   const averageComponentCount = datum.map((item: any) => parseFloat(item.AverageComponentCount));
//   const averageComponentPrice = datum.map((item: any) => parseFloat(item.AverageComponentPrice));
//   const averageLine = datum.map((item: any) => parseFloat(item.AverageLine));
//   const averageProbability = datum.map((item: any) => parseFloat(item.AverageProbability));
//   const numberOfComponents = datum.map((item: any) => item.NumberOfComponents);
//   const standardBets = datum.map((item: any) => parseInt(item.StandardBets, 10));
//   const totalBookProfitComponent = datum.map((item: any) => parseInt(item.TotalBookProfitComponent, 10));
//   const totalBookRiskComponent = datum.map((item: any) => parseInt(item.TotalBookRiskComponent, 10));

//   return {
//     labels,
//     alternateBets,
//     averageComponentCount,
//     averageComponentPrice,
//     averageLine,
//     averageProbability,
//     numberOfComponents,
//     standardBets,
//     totalBookProfitComponent,
//     totalBookRiskComponent
//   };
// };


const processDataBySelection = (clickValue: any, originalData: any) => {
  // let arrayData = Array.of(apiData.apiData);
  // let datum = Array.from(arrayData[0]);
  // console.log(clickValue);
  console.log(originalData.data[clickValue]);


  // const labels = datum.map((item: any) => item.selection);
  // const alternateBets = datum.map((item: any) => parseInt(item.AlternateBets, 10));
  // const averageComponentCount = datum.map((item: any) => parseFloat(item.AverageComponentCount));
  // const averageComponentPrice = datum.map((item: any) => parseFloat(item.AverageComponentPrice));
  // const averageLine = datum.map((item: any) => parseFloat(item.AverageLine));
  // const averageProbability = datum.map((item: any) => parseFloat(item.AverageProbability));
  // const numberOfComponents = datum.map((item: any) => item.NumberOfComponents);
  // const standardBets = datum.map((item: any) => parseInt(item.StandardBets, 10));
  // const totalBookProfitComponent = datum.map((item: any) => parseInt(item.TotalBookProfitComponent, 10));
  // const totalBookRiskComponent = datum.map((item: any) => parseInt(item.TotalBookRiskComponent, 10));

  // return {
  //   labels,
  //   alternateBets,
  //   averageComponentCount,
  //   averageComponentPrice,
  //   averageLine,
  //   averageProbability,
  //   numberOfComponents,
  //   standardBets,
  //   totalBookProfitComponent,
  //   totalBookRiskComponent
  // };
  return { clickValueSet: originalData.data[clickValue], value: originalData }
};

// const list_items = (data_list: any) => {
//   console.log(data_list);
//   alert('hi');
// };

export default function Page() {
  const [value, setValue] = useState([]);
  const [topic, setTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');

    // const listOut = list.labellist.map((label: any, index: any) => ( <MenuItem key={index} value={index}>{label}</MenuItem>));
  // const selectedValue = '2131';
  const handleChange = (event:any) => {
    setSelectedValue(event.target.value);
    const filteredRow = processDataBySelection(event.target.value, value);
    console.log(value);
    //alert(event.target.value);
    console.log(filteredRow);
    setValue(filteredRow.clickValueSet);

    setTopic(event.target.value);
    //alert(selectedValue);
    // alert(list.labellist[selectedValue]);
  };

  // let dataList = new Array();
  // dataList.push('test1');
  // dataList.push('test2');
  // dataList.push('test3');

  let labels;

  useEffect(() => {

      setIsLoading(true);

      fetch('/api/dimensional/bet-selection/a?parameter=123')
        .then(response => response.json())
        .then(data => {
          setValue(data);

          // let {
          //   labels,
          //   alternateBets,
          //   averageComponentCount,
          //   averageComponentPrice,
          //   averageLine,
          //   averageProbability,
          //   numberOfComponents,
          //   standardBets,
          //   totalBookProfitComponent,
          //   totalBookRiskComponent
          // } = processDataAtContainer(data);

          console.log(value);
          // console.log(data);

          // if(!!value) { labels = value.data.map((item: any) => item.selection); console.log(labels); }
          setIsLoading(false); //
        })
        .catch(error => { });

  }, [topic]);

  // const crossSectionTopicChoice = (choice:any) => {

  //   setIsLoading(true);
  //   console.log(choice.target);
  //   // alert('choice made');
  //   setTopic(choice.target.value);
  //   alert(choice.target.value);
  //   alert('use state to redo trigger drop down list and pass into doughnot cross section data by topic');
  // };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hour of the Day',
      },
    },
  };

  const itemsArray = [ // mapped //
    'over', 'yes', 'under', 'no', 'anthony edwards', 'lauri markkanen', 'karl-anthony towns',
    'rudy gobert', 'lauri markkanen-two pointer', 'walker kessler', 'jordan clarkson',
    'karl-anthony towns-two pointer', 'jaden mcdaniels', 'lauri markkanen-three pointer',
    'talen horton-tucker', 'rudy gobert-two pointer', 'walker kessler-three pointer',
    'talen horton-tucker-two pointer', 'mike conley', 'karl-anthony towns-three pointer',
    'john collins', 'anthony edwards -two pointer'
];

  const list = { labellist: itemsArray };
  const listOut = list.labellist.map((label: any, index: any) => (
    <MenuItem key={index} value={index}> {label} </MenuItem>
  ));




  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <h1 style={{color:'skyblue',fontSize:'30px',fontWeight:'none',margin:'0 auto',textAlign:'center',padding:'5px'}}>Bet Market Analysis Dashboard</h1>
          <MenuDrawer />
        </AppBar>
      </ThemeProvider>

      <h2 className="pl-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-400 md:text-2xl dark:text-white">(dimensional analysis)</h2>
      <h1 className="pl-10 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gold-600 md:text-3xl lg:text-6xl dark:text-white">Bet Selection Breakdown</h1>

      <Box sx={{ minWidth: 400, maxWidth: 500 }} style={{ margin: '75px auto'}}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Bet Selection</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedValue}
            onChange={handleChange}
          >
            {listOut}
          </Select>
        </FormControl>
      </Box>

      {isLoading ? (
      <CircularProgress style={{margin:"150px auto"}}/>
    ) : (<>
      <SimpleDimensionsBySelection options={options} apiData={value} topSelection={selectedValue} />
    </>
    )}
    </Stack>
  );
}
