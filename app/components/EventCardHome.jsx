"use client";
import React, { useState, useEffect } from 'react';
import EventUserCardExpanded from './EventUserCardExpanded';

const EventCardHome = (props) => {


  const [open, setOpen] = useState(false);
  const [stateEvent, setStateEvent] = useState('');
  const [stateImg, setStateImg] = useState('');

  const handleClickOpen = () => {
    if (stateEvent) {
      return;
    }
    setOpen(true);
    setStateEvent(props.EventName, props.EventDate, props.EventTime, props.EventCity, props.EventVenue, props.EventCountryCode, props.EventPostcode); 
    
    setStateImg(props.EventPhoto);
   
  };

  const handleClose = () => {
    setStateEvent('');
    setOpen(false);
  };

  return (
    
    <div
      className='relative w-1/4 h-1/3'
      onClick={() => {
        handleClickOpen(props);
      }}
      >
      <img className='object-cover rounded-xl' src={props.EventPhoto} alt={props.EventName} />
      <div className='absolute top-1 text-white w-full h-full text-center flex flex-col justify-center p-3'>
        <p className='text-base font-bold'>{props.EventName}</p>
        <p className='text-sm font-medium mt-2'>
          {props.EventDate} - {props.EventTime}
        </p>
        <p className='text-xs mt-2'>{props.EventVenue} - {props.EventCity}, {props.EventCountryCode}, {props.EventPostcode}</p>
      </div>
      <EventUserCardExpanded
        open={open}
        handleClose={handleClose}
        {...props}
        event={stateEvent}
        img={stateImg}
      />
    </div>
  );
};

export default EventCardHome;


