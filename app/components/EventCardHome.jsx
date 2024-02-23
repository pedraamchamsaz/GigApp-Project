"use client";
import React, { useState, useEffect } from 'react';
import EventUserCardExpanded from './EventUserCardExpanded';
import { ApiClient } from "@/apiClient";

const EventCardHome = (props) => {
  const [open, setOpen] = useState(false);
  const [stateEvent, setStateEvent] = useState('');
  const [stateImg, setStateImg] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const apiClient = new ApiClient(() => token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    fetchBookmarkStatus();
  }, []);

  const fetchBookmarkStatus = async () => {
    try {
      if (!isLoggedIn) return;

      const eventId = props.keyA;
      const isBookmarked = await apiClient.isEventBookmarked(eventId);
      setBookmarked(isBookmarked);
      console.log("Bookmark status:", isBookmarked);
    } catch (error) {
      console.error("Error fetching bookmark status:", error);
    }
  };

  const handleClickOpen = () => {
    if (stateEvent) return;
    setOpen(true);
    setStateEvent(props.keyA, props.EventName, props.EventDate, props.EventTime, props.EventCity, props.EventVenue, props.EventCountryCode, props.EventPostcode); 
    setStateImg(props.photo);
  };

  const handleClose = () => {
    setStateEvent('');
    setOpen(false);
  };

  return (
    <div
      className='relative w-1/4 h-1/3'
      onClick={handleClickOpen}
    >
      <img className='object-cover rounded-xl' src={props.photo} alt={props.EventName} />
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
        bookmarked={bookmarked}
      />
    </div>
  );
};

export default EventCardHome;
