import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    alert(newValue);
  };

  return (<>
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
       <Checkbox {...label} defaultChecked />
       <Checkbox {...label} />
       <Checkbox {...label} disabled />
       <Checkbox {...label} disabled checked />
       </>

  );
}
