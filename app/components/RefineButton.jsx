import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ResultsSlider from './ResultsSlider';
import RadiusSlider from './RadiusSlider';

export default function RefineButton( {setResults, setRadius, getEventData, radius, results}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img className='h-10 w-10' src="filter-white.png" alt="" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className=''
      >
        <h1 className='font-bold text-center text-sm'>Filters</h1>
        <div className='ml-3 mt-3'>
          <p className='text-xs mb-2 pl-1'>RESULTS</p>
          <div className='mr-3'>
            <ResultsSlider setResults={setResults} results={results}/>
          </div>
          <p className='text-xs mb-2 pl-1'>RADIUS</p>
          <div className='mr-3'>
            <RadiusSlider setRadius={setRadius} getEventData={getEventData} radius={radius}/>
          </div>
        </div>
      </Menu>
    </div>
  );
}