"use client";
import React, { useState, useEffect } from 'react';
import EventUserCardExpanded from './EventUserCardExpanded';
import { ApiClient } from "@/apiClient";
import { toast } from "sonner";

const EventCardHome = (props) => {
  const keyID = props.keyA;

  const [open, setOpen] = useState(false);
  const [stateEvent, setStateEvent] = useState('');
  const [stateImg, setStateImg] = useState('');
  const [bookmarked, setBookmarked] = useState(false); // Add bookmarked state
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleClickOpen = () => {
    if (stateEvent) {
      return;
    }
    setOpen(true);
    setStateEvent(props.keyA, props.EventName, props.EventDate, props.EventTime, props.EventCity, props.EventVenue, props.EventCountryCode, props.EventPostcode); 
    
    setStateImg(props.photo);
   
  };


  const handleClose = () => {
    setStateEvent('');
    setOpen(false);
  };

// testing new code for bookmark - fetching bookmark\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// ApiClient part
const apiClient = new ApiClient(() => token);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setToken(token);
    setIsLoggedIn(true);
  } // if !token, redirect to landing page
}, []);


  useEffect(() => {
    // Fetch bookmarked status for the event when component mounts
    fetchBookmarkStatus();
  }, []);

  // Function to fetch bookmarked status for the event \\\\\\\\\\\\\\\\\\\\\\\\\\\
  const fetchBookmarkStatus = async () => {
    try {
      if (!isLoggedIn) {
        
        return;
      }
      const eventId = props.keyA;
      const isBookmarked = await apiClient.isEventBookmarked(eventId);
      setBookmarked(isBookmarked);
      console.log("Bookmark status:", isBookmarked); // Log the bookmark status
    } catch (error) {
      console.error("Error fetching bookmark status:", error);
      // Handle error as needed
    }
  };

// end of code for fetchingbookmark \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  

  return (
    
    <div
      className='relative w-1/4 h-1/3'
      onClick={() => {
        handleClickOpen(props);
      }}
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
        bookmarked={bookmarked} // Pass bookmarked status to EventUserCardExpanded
      />
    </div>
  );
};

export default EventCardHome;


