import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Selection from '@/src/components/Selection';
import MenuDrawer from '@/src/components/MenuDrawer';
import BasicPie from '@/src/components/BasicPie';
import CircularProgress from '@mui/material/CircularProgress';
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
  const [value, setValue] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

      fetch('/api/dimensional/line-components/a?parameter=123')
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
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hour of the Day',
      },
    },
  };
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <h1 style={{color:'skyblue',fontSize:'30px',fontWeight:'none',margin:'0 auto',textAlign:'center',padding:'5px'}}>Bet Market Analysis Dashboard</h1>
          <MenuDrawer />
          {/* <Selection /> */}
        </AppBar>
      </ThemeProvider>

      <h2 className="pl-10 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-400 md:text-2xl dark:text-white">(dimensional analysis)</h2>
      <h1 className="pl-10 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-3xl lg:text-4xl dark:text-white">Bet Component Tally for each Line Bets</h1>

      {isLoading ? (
      <CircularProgress style={{margin:"150px auto", transform:'scale(0.8)'}} />
    ) : (
      <BasicPie options={options} apiData={value} style={{transform:'scale(0.8)'}}/>
    )}
    </Stack>
  );
}
