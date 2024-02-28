import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    background: "rgba(255, 255, 255, 0.5)", 
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "30%", 
    height: "95%",
    maxWidth: "30%",
    minWidth: "350px",
    borderRadius: theme.spacing(1),
  },
  "& .MuiDialog-paperFullScreen": {
    maxHeight: "100%",
  },
}));


export default function MapEventUserCardExpanded({
  open,
  handleClose,
  eventData,
}) {
  const {
    photo,
    name,
    date,
    time,
    venue,
    city,
    countrycode,
    postcode,
    currency,
    price,
    price2,
    ticketlink,
    bookmarked,
  } = eventData;

  const handleBookmarkClick = () => {
    // Implement bookmark click logic
  };

  return (
    <React.Fragment>
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      fullScreen
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
      <div className="border-4 flex flex-col h-full">
        <div className="h-2/3 w-full">
          <img
            className="object-cover h-full w-full"
            src={photo}
            alt="EventPhoto"
          />
        </div>
        <div className="bg-black text-white w-full flex flex-row justify-between p-3 h-1/3">
          <div className="flex flex-col items-start justify-center ml-4">
            <p className="text-base font-bold">{name}</p>
            <p className="text-sm font-medium mt-2">{date} - {time}</p>
            <p className="text-xs mt-2">{venue} - {city}, {countrycode}, {postcode}</p>
            <p className="text-xs mt-2 font-bold">{currency}{price} - {currency}{price2}</p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mr-5">
            {ticketlink && (
              <Link href={ticketlink}>
                <Image
                  className="hover:scale-125 transition"
                  src="/tickets-white.png"
                  width={50}
                  height={50}
                  alt="Ticket Icon"
                />
              </Link>
            )}
            <button onClick={handleBookmarkClick}>
              <Image
                className={`hover:scale-125 transition ${
                  bookmarked ? "text-red-500" : ""
                }`}
                src={bookmarked ? "/bookmark-red.png" : "/bookmark-white.png"}
                width={50}
                height={50}
                alt="Bookmark Icon"
              />
            </button>
            <img
              className="h-12 w-12 hover:scale-125 transition"
              src="calendar-white.png"
            />
          </div>
        </div>
      </div>
    </BootstrapDialog>
  </React.Fragment>  
  );
}
