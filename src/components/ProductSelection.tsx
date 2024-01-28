import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function ProductSelection() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 400, maxWidth: 500 }} style={{margin:'10px auto'}}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Name of Player</MenuItem>
          <MenuItem value={20}>Name of Player - 3 Pointer</MenuItem>
        </Select>
        <InputLabel id="demo-simple-select-label">Bet Selection</InputLabel>
      </FormControl>
    </Box>
  );
}
