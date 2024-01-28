import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Selection from '@/src/components/Selection';
import MenuDrawer from '@/src/components/MenuDrawer';
import BasicPie from '@/src/components/BasicPie';
import CountryPortionPieChart from '@/src/components/CountryPortionPieChart';

import React, { useEffect, useState } from 'react';

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
  const [value, setValue] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

      fetch('/api/dimensional/countries/a?parameter=123')
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
      <CountryPortionPieChart options={options} apiData={value} />
    </Stack>
  );
}
