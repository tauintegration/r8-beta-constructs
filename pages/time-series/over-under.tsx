import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Selection from '@/src/components/Selection';
import MenuDrawer from '@/src/components/MenuDrawer';
import MultiLineChart from "@/src/components/MultiLineChart";
import React, { useEffect, useState } from 'react';
import LineChartApiLoadedParts from '@/src/components/LineChartApiLoadedParts';
import CircularProgress from '@mui/material/CircularProgress';

import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function valuetext(value: number) {
  return `${value}°C`;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});


export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(true); // State to toggle dark/light mode
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

      fetch('/api/time-series/over-under/a?parameter=123')
        .then(response => response.json())
        .then(data => {
          setValue(data.data);
          console.log(value);
          setIsLoading(false); // Set loading to false once data is read
        })
        .catch(error => {
       });

  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total Bets',
      },
    },
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    alert(newValue);
  };
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>

      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <h1 style={{color:'skyblue',fontSize:'30px',fontWeight:'none',margin:'0 auto',textAlign:'center',padding:'5px'}}>Bet Market Analysis Dashboard</h1>
          <MenuDrawer />
        </AppBar>
      </ThemeProvider>
      <h2 className="pl-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-pink-800 md:text-4xl dark:text-white">(time-series)</h2>
      <h1 className="pl-10 mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-500 md:text-5xl lg:text-6xl dark:text-white">Over/Under</h1>

      {isLoading ? (
      <CircularProgress style={{margin:"150px auto"}}/>
    ) : (
      <LineChartApiLoadedParts options={options} apiData={value} />
    )}

    </Stack>
  );
}
