import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme, useThemeProps } from '@mui/material/styles';
import Selection from '@/src/components/Selection';
import MenuDrawer from '@/src/components/MenuDrawer';
import React, { useEffect, useState } from 'react';
import LineChartApiLoaded from '@/src/components/LineChartApiLoaded';
import CircularProgress from '@mui/material/CircularProgress';


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

const api_call = '/api/time-series/totals-averages?index=a&parameter=123';

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(true); // State to toggle dark/light mode
  const [value, setValue] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const [result, error, state] = usePromise( fetch(api_call).then((res) => res.json).then(json_data => console.log(json_data)), []);
  useEffect(() => {

      fetch('/api/time-series/totals-averages/a?parameter=123')
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

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>

      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <h1 style={{color:'skyblue',fontSize:'30px',fontWeight:'none',margin:'0 auto',textAlign:'center',padding:'5px'}}>Bet Market Analysis Dashboard</h1>
          <MenuDrawer />
          <Selection />
        </AppBar>
      </ThemeProvider>

      {isLoading ? (
      <CircularProgress style={{margin:"150px auto"}}/>
    ) : (
      <LineChartApiLoaded options={options} apiData={value} />
    )}

    </Stack>
  );
}
