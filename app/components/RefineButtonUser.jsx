import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ResultsSliderUser from './ResultsSliderUser';
import RadiusSliderUser from './RadiusSliderUser';

export default function RefineButton( {setResults, setRadius, getEventData, radius, results, startDateUser, setStartDateUser, endDateUser, setEndDateUser, resultsUser, setResultsUser, userGigRadius, setUserGigRadius}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStartDateUser = (e) => {
    setStartDateUser(e.target.value)
  }

  const handleEndDateUser = (e) => {
    setEndDateUser(e.target.value)
  }

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
            <ResultsSliderUser setResultsUser={setResultsUser} resultsUser={resultsUser}/>
          </div>
          <p className='text-xs mb-2 pl-1'>RADIUS</p>
          <div className='mr-3'>
            <RadiusSliderUser setUserGigRadius={setUserGigRadius} getEventData={getEventData} userGigRadius={userGigRadius}/>
          </div>
          <div className='flex gap-3 mb-3 ml-1 mt-2 text-xs'>
            <div className='flex flex-col'>
              <p className='text-xs mb-2'>START DATE</p>
              <input type="date" className='h-[2rem] w-28 border p-2' value={startDateUser} onChange={handleStartDateUser}/>
            </div>
            <div className='flex flex-col'>
              <p className='text-xs mb-2'>END DATE</p>
              <input type="date" className='h-[2rem] w-28 border p-2' value={endDateUser} onChange={handleEndDateUser}/>
            </div>
          </div>
        </div>
      </Menu>
    </div>
  );
}