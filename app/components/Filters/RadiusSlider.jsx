import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function RadiusSlider( {setRadius, radius}) {

  const handleRadius = (e) => {
    setRadius(e.target.value)
  }

  return (
    <Box sx={{ width: 290 }} className='ml-3'>
      <Slider
        aria-label="Results"
        defaultValue={radius}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={10}
        step={10}
        // marks
        min={10}
        max={100}
        onChange={handleRadius}
      />
    </Box>
  );
}