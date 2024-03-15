import * as React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from '@mui/material/styles';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import CardLarge from "./CardLarge";
import EventUserCardLarge from "./EventUserCardLarge";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EventUserCardExpanded({
  open,
  handleClose,
  event,
  // img,
  keyA,
  EventName,
  EventDate,
  EventCity,
  EventTime,
  photo,
  EventVenue,
  EventCountryCode,
  EventPostcode,
  EventPrice,
  EventCurrency,
  EventPriceMax,
  EventTicketLink,
  bookmarked,
  
}) {
  
    
  
  useEffect(() => {
    console.log(event);
  }, [event]);

  if (!event) {
    return null;
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
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <EventUserCardLarge
          event={event}
          // img={img}
          keyA={keyA}
          EventDate={EventDate}
          EventName={EventName}
          EventCity={EventCity}
          EventTime={EventTime}
          photo={photo}
          EventVenue={EventVenue}
          EventCountryCode={EventCountryCode}
          EventPostcode={EventPostcode}
          EventPrice={EventPrice}
          EventCurrency={EventCurrency}
          EventPriceMax={EventPriceMax}
          EventTicketLink={EventTicketLink}
          bookmarked={bookmarked} // to pass the bookmarked prop
          
        />
      </BootstrapDialog>
    </React.Fragment>
  );
}
