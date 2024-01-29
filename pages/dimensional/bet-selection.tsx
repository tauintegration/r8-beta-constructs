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


const processDataBySelection = (clickValue: any, originalData: any) => {
  console.log(originalData.data[clickValue]);

  return { clickValueSet: originalData.data[clickValue], value: originalData }
};

export default function Page() {
  const [value, setValue] = useState([]);
  const [topic, setTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event:any) => {
    setSelectedValue(event.target.value);
    const filteredRow = processDataBySelection(event.target.value, value);
    console.log(value);
    console.log(filteredRow);
    setValue(filteredRow.clickValueSet);

    setTopic(event.target.value);
  };

  let labels;

  useEffect(() => {

      setIsLoading(true);

      fetch('/api/dimensional/bet-selection/a?parameter=123')
        .then(response => response.json())
        .then(data => {
          setValue(data);

          console.log(value);
          setIsLoading(false);
        })
        .catch(error => { });

  }, [topic]);


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
