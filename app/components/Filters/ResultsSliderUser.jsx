import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function ResultsSlider( {setResultsUser, resultsUser}) {

  const handleResults = (e) => {
    setResultsUser(e.target.value)
  }

  return (
    <Box sx={{ width: 290 }} className='ml-3'>
      <Slider
        aria-label="Results"
        defaultValue={resultsUser}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={15}
        // marks
        min={15}
        max={120}
        onChange={handleResults}
      />
    </Box>
  );
}