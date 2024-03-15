import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function RadiusSliderUser( {setUserGigRadius, userGigRadius}) {

  const handleUserRadius = (e) => {
    setUserGigRadius(e.target.value)
  }

  return (
    <Box sx={{ width: 290 }} className='ml-3'>
      <Slider
        aria-label="Results"
        defaultValue={1000}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={10}
        step={10}
        // marks
        min={10}
        max={1000}
        onChange={handleUserRadius}
      />
    </Box>
  );
}