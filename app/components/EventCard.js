"use client";

import React, { useState, useEffect } from 'react';
import EventUserCardExpanded from './EventUserCardExpanded';

const EventCard = (props) => {
  const keyID = props.keyA;

  const [open, setOpen] = useState(false);
  const [stateEvent, setStateEvent] = useState('');
  const [stateImg, setStateImg] = useState('');

  const handleClickOpen = () => {
    if (stateEvent) {
      return;
    }
    setOpen(true);
    setStateEvent(props.EventName, props.EventDate, props.EventTime, props.EventCity); 
    setStateImg(props.photo);
    
  };

  const handleClose = () => {
    setStateEvent('');
    setOpen(false);
  };


  return (
  <>
      {/* <h3 className="mt-5 mb-2 text-cyan-500 text-center">Your Events</h3> */}
      <div
        className="w-80 h-64 relative mb-5"
        onClick={
          () => {
            handleClickOpen(props)
          }
        }
      >
        <img className="object-cover w-screen rounded-xl" src={props.photo} alt="EventPhoto" />

        <div className="bg-black/50 absolute top-0 text-white w-full h-full text-center flex flex-col justify-center border-4 border-black hover:border-4 hover:border-[#1AA297] hover:cursor-pointer rounded-xl">
          <p className="text-base font-bold"> {props.EventName}</p>
          <p className="text-sm font-medium mt-2">
            {props.EventDate} - {props.EventTime}
          </p>
          <p className="text-xs mt-2">{props.EventVenue} - {props.EventCity}, {props.EventCountryCode}, {props.EventPostcode}</p>
          <p className="text-xs mt-2">Price: {props.EventCurrency}{props.EventPrice} - {props.EventCurrency}{props.EventPriceMax}</p>

          <div className="col-span-1 md:col-span-2 flex gap-10 mx-20 justify-center space-x-4 mt-5">
            <button
              type="submit"
              className="bg-[#13C3B5] p-4 w-[55%] font-semibold text-white rounded-full hover:text-white hover:bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out mt-10"
              onClick={() => props.updateEvents(props)}
            >
              Update
            </button>

            <button
              type="submit"
              className="bg-[#13C3B5] p-4 w-[55%] font-semibold text-white rounded-full hover:text-white hover:bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out mt-10"
              onClick={() => {
                props.removeEvents(keyID);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <EventUserCardExpanded
        open={open}
        handleClose={handleClose}
        {...props}
        event={stateEvent}
        img={stateImg}
      />
      </div>
    </>
  );
};

export default EventCard;
