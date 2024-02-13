import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SliderComp from './SliderComp'

export default function BasicMenu() {
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
        <img className='h-10 w-10' src="filter.png" alt="" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className='flex flex-col items-start'
      >
        <MenuItem onClick={handleClose} className='flex flex-col'>
            <p>DATE RANGE</p>
            <SliderComp />
        </MenuItem>
        <MenuItem onClick={handleClose} className='flex flex-col'>
            <p>DISTANCE</p>
            <SliderComp />
        </MenuItem>
        <MenuItem onClick={handleClose} className='flex flex-col'>
            <p>PRICE RANGE</p>
            <SliderComp />
        </MenuItem>
      </Menu>
    </div>
  );
}