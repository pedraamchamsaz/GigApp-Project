"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ApiClient } from "@/apiClient";
import { toast } from "sonner";

const EventUserCardLarge = (props) => {
  const [token, setToken] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ApiClient part
  const apiClient = new ApiClient(() => token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    } else {
      console.log("User is not logged in."); 
    }
  }, []);

  const handleBookmarkClick = async () => {
    try {
      if (!isLoggedIn) {
        
        toast.error("Log in to add the event to Interested!");
        return;
      }

      const eventId = props.keyA;

      if (!bookmarked) {
        await apiClient.addInterestedEvent(eventId);
        console.log("Event bookmarked successfully");
        toast.success("Event added to Interested successfully!");
      } else {
        toast.warning("Event already bookmarked - check your Interested!");
      }

      setBookmarked(!bookmarked);
    } catch (error) {
      console.error("Error handling bookmark:", error);
      
    }
  };

  return (
    <div className="h-screen w-full border-4">
      <img
        className="object-cover w-full h-2/3"
        src={props.photo}
        alt="EventPhoto"
      />
      <div className="flex h-1/3">
        <div className="bg-black text-white w-full flex flex-col items-start justify-center p-3">
          <p className="text-base font-bold "> {props.EventName}</p>
          <p className="text-sm font-medium mt-2">
            {props.EventDate} - {props.EventTime}
          </p>
          <p className="text-xs mt-2">
            {props.EventVenue} - {props.EventCity}, {props.EventCountryCode},{" "}
            {props.EventPostcode}
          </p>
          <p className="text-xs mt-2 font-bold">
            {" "}
            {props.EventCurrency}
            {props.EventPrice} - {props.EventCurrency}
            {props.EventPriceMax}
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 bg-black pr-10">
          <Link href={props.EventTicketLink}>
            <Image
              className=" hover:scale-125 transition"
              src="/tickets-white.png"
              width={125}
              height={125}
              alt="Ticket Icon"
            />
          </Link>

          <button
            onClick={handleBookmarkClick}
            
          >
            <Image
              className={`hover:scale-125 transition ${
                bookmarked ? "text-red-500" : ""
              }`}
              src={bookmarked ? "/bookmark-red.png" : "/bookmark-white.png"}
              width={125}
              height={125}
              alt="Bookmark Icon"
            />
          </button>

          <img
            className="h-10 w-10 hover:scale-125 transition"
            src="calendar-white.png"
          />
        </div>
      </div>
    </div>
  );
};

export default EventUserCardLarge;

