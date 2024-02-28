import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DropdownProfile({setProfileList, profileList}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownClose = (e) => {
    setAnchorEl(null);
    setProfileList(e.target.innerText)
  };

  return (
    <div className='bg-[#1AA297] text-white rounded-3xl hover:bg-[#13C3b5] border border-[#1AA297] hover:border hover:border-[#13C3b5] p-2'
    >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {profileList} ▼
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem value='userGigs' onClick={handleDropdownClose}>YOUR GIGS</MenuItem>
        <MenuItem value='interested' onClick={handleDropdownClose}>INTERESTED</MenuItem>
      </Menu>
    </div>
  );
}