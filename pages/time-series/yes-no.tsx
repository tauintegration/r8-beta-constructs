import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Selection from '@/src/components/Selection';
import MenuDrawer from '@/src/components/MenuDrawer';
import AreaChartExample from '@/src/components/AreaChartExample';
import React, { useState } from 'react';
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
          <Selection />
        </AppBar>
      </ThemeProvider>

      <AreaChartExample />
      <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
    </Stack>
  );
}
