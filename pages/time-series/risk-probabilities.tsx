import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Selection from '@/src/components/Selection';
import MenuDrawer from '@/src/components/MenuDrawer';
import React, { useState, useEffect } from 'react';
import MultiLineChartApiLoaded from '@/src/components/MultiLineChartApiLoaded';
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


export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(true); // State to toggle dark/light mode
  const [value, setValue] = React.useState<number[]>([20, 37]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {

    fetch('/api/time-series/risk-probabilities/a?parameter=123')
      .then(response => response.json())
      .then(data => {
        setValue(data.data);
        console.log(value);
        setIsLoading(false); // Set loading to false once data is read
      })
      .catch(error => {
     });

}, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
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

      {isLoading ? (
      <CircularProgress style={{margin:"150px auto"}}/>
    ) : (
      <MultiLineChartApiLoaded options={options} apiData={value} />
    )}

    </Stack>
  );
}
