import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function Selection() {
  const [a, setA] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setA(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 400, maxWidth: 500 }} style={{margin:'10px auto'}}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={a}
          label="A"
          onChange={handleChange}
        >
          <MenuItem value={10}>Single</MenuItem>
          <MenuItem value={20}>Multi</MenuItem>
          <MenuItem value={30}>Both</MenuItem>
        </Select>
        <InputLabel id="demo-simple-select-label">Single or Multi</InputLabel>
      </FormControl>
    </Box>
  );
}
