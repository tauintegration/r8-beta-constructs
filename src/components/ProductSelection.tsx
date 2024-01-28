import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ProductSelection(nonDestructedProps:any) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  // const listDatum = new Array(nonDestructedProps.listData);
  const listDatum = nonDestructedProps.listData;

  const listOut = listDatum.map((item: any, index: any) => (
    <MenuItem key={index} value={item.toString()}>{item}</MenuItem>
  ));

  return (
    <Box sx={{ minWidth: 400, maxWidth: 500 }} style={{margin:'10px auto'}}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={nonDestructedProps.handler}
        >
          {listOut}
{/*
      {listDatum.map((item, index) => (
        <MenuItem key={index} value={index * 10}>{item}</MenuItem>
      ))} */}
          <MenuItem value={110}>Name of Player</MenuItem>
          <MenuItem value={220}>Name of Player - 3 Pointer</MenuItem>
        </Select>
        <InputLabel id="demo-simple-select-label">Bet Selection</InputLabel>
      </FormControl>
    </Box>
  );
}
