import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Selection from '@/src/components/Selection';
import MenuDrawer from '@/src/components/MenuDrawer';
import MultiLineChart from "@/src/components/MultiLineChart";
import React, { useEffect, useState } from 'react';
import LineChartApiLoadedAlt from '@/src/components/LineChartApiLoadedAlt';
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
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

      fetch('/api/time-series/yes-no/a?parameter=123')
        .then(response => response.json())
        .then(data => {
          setValue(data.data);
          console.log(value);
          setIsLoading(false);
        })
        .catch(error => { });

  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left' as const,
      },
      title: {
        display: true,
        text: 'Total Bets',
      },
    },
  };
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>

      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <h1 style={{color:'skyblue',fontSize:'30px',fontWeight:'none',margin:'0 auto',textAlign:'center',padding:'5px'}}>Bet Market Analysis Dashboard</h1>
          <MenuDrawer />
        </AppBar>
      </ThemeProvider>

      <h2 className="pl-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-green-600 md:text-4xl dark:text-white">(time-series)</h2>
      <h1 className="pl-10 mb-4 text-4xl font-extrabold leading-none tracking-tight text-green-900 md:text-5xl lg:text-6xl dark:text-white">Yes/No</h1>

      {isLoading ? (
      <CircularProgress style={{margin:"150px auto"}}/>
    ) : (
      <LineChartApiLoadedAlt options={options} apiData={value} style={{transform:'scale(0.8)'}}/>
    )}

    </Stack>
  );
}
