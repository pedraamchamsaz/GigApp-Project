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
      className='relative w-80 h-64'
      onClick={() => {
        handleClickOpen(props);
      }}
      >
      <img className='object-cover rounded-xl w-full h-full' src={props.EventPhoto} alt={props.EventName} />
      <div className='bg-black/50 absolute top-0 text-white w-full h-full text-center flex flex-col justify-center border-4 border-black hover:border-4 hover:border-[#1AA297] hover:cursor-pointer rounded-xl'>
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


