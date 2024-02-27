"use client";
import React, { useState, useEffect } from 'react';
import EventUserCardExpanded from './EventUserCardExpanded';
import { ApiClient } from "@/apiClient";
import { toast } from "sonner"; // Assuming you have a toast library imported

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
    if (isLoggedIn) {
      fetchBookmarkStatus();
    }
  }, [isLoggedIn]);

  const fetchBookmarkStatus = async () => {
    try {
      if (!isLoggedIn) {
        console.log("User is not logged in. Cannot fetch bookmark status.");
        return;
      }
  
      const eventId = props.keyA;
      console.log("Fetching bookmark status for event ID:", eventId);
  
      const isBookmarked = await apiClient.isEventBookmarked(eventId);
      console.log("Bookmark status for event:", isBookmarked);
  
      setBookmarked(isBookmarked);
      console.log("Bookmark status updated in state.");
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

  const handleBookmarkClick = async () => {
    try {
      if (!isLoggedIn) {
        toast.error("Log in to add the event to Interested!");
        return;
      }

      const eventId = props.keyA;

      if (bookmarked) {
        toast.warning("Event already in Interested!");
        return;
      }

      await apiClient.addInterestedEvent(eventId);
      console.log("Event bookmarked successfully");
      toast.success("Event added to Interested successfully!");

      setBookmarked(true);
    } catch (error) {
      console.error("Error handling bookmark:", error);
      // Handle error as needed
    }
  };

  return (
    <div className='relative w-80 h-64'
      onClick={handleClickOpen}
    >
      <img className='object-cover rounded-xl w-full h-full' src={props.photo} alt={props.EventName} />
      <div className='bg-black/50 absolute top-0 text-white w-full h-full text-center flex flex-col justify-center border-4 border-black hover:border-4 hover:border-[#1AA297] hover:cursor-pointer rounded-xl'>
        <p className='text-base font-bold'>{props.EventName}</p>
        <p className='text-sm font-medium mt-2'>
          {props.EventDate} - {props.EventTime}
        </p>
        <p className='text-xs mt-2'>{props.EventVenue} - {props.EventCity}, {props.EventCountryCode}, {props.EventPostcode}</p>
       {/* Render green text if event is already bookmarked */}
      {bookmarked && <p className="text-green-500 text-xs font-bold">Added to Interested</p>}
      
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
