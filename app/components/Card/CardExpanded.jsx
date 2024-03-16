import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CardLarge from './CardLarge';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CardExpanded( {open, handleClose, event, img } ) {
  
  if (!event) {
    return null
  }

  const theme = useTheme(); 
  const isSmallScreen = theme.breakpoints.down('sm');

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={isSmallScreen ? 'w-full' : 'w-1/2 mx-auto'} 
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <CardLarge 
          event={event} 
          img={img}
          />
      </BootstrapDialog>
    </React.Fragment>
  );
}