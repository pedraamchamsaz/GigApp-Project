"use client";
import Link from 'next/link';
import React from "react";
import Image from 'next/image';

const EventUserCardLarge = (props) => {
  return (
    <div className="h-screen w-full border-4">
      <img className="object-cover w-full h-2/3" src={props.EventPhoto} />
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
              width={130}
              height={130}
            />
        </Link> 
          <img
            className="h-10 w-10 hover:scale-125 transition"
            src="bookmark-white.png"
          />

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
