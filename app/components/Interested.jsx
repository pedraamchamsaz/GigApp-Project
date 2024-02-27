"use client";
import { useState, useEffect } from "react";
import { ApiClient } from "@/apiClient";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

const InterestedEvents = () => {
  const [interestedEvents, setInterestedEvents] = useState([]);

  useEffect(() => {
    const fetchInterestedEvents = async () => {
      try {
        // Initialize ApiClient
        const apiClient = new ApiClient(
          () => token,
          
        );

        // Fetch token from localStorage
        const token = localStorage.getItem("token");

        if (token) {
          // Fetch interested events using ApiClient
          const response = await apiClient.getInterestedEvents();
          setInterestedEvents(response.data);
        } else {
          // Redirect to landing page if token is not found
          // Replace this with your actual redirect logic
          window.location.href = "/landing";
        }
      } catch (error) {
        console.error("Error fetching interested events:", error);
      }
    };

    // Call fetchInterestedEvents function
    fetchInterestedEvents();
  }, []);

  // Function to remove event from interested
  const removeInterestedEvent = async (eventId) => {
    try {
      // Initialize ApiClient
      const apiClient = new ApiClient(
        () => token,
       
      );

     
      const token = localStorage.getItem("token");

      // Use ApiClient to remove the event
      await apiClient.removeInterestedEvent(eventId);
      console.log("Event removed from interested successfully");
      toast.success("Event removed from interested successfully");
      // Update the interested events list by filtering out the removed event
      setInterestedEvents(
        interestedEvents.filter((event) => event._id !== eventId)
      );
    } catch (error) {
      console.error("Error removing interested event:", error);
    }
  };

  return (
    <div className="text-white h-80 w-50 m-5">
      <h3 className="mt-5 mb-2 text-center text-cyan-500">Interested</h3>
      {interestedEvents.map((event) => (
      

        <div className="relative w-80 h-64 gap-5">
          <img
            className="object-cover rounded-xl w-full h-full"
            src={event.photo}
            alt={event.name}
          />
          <div className="bg-black/50 absolute top-0 text-white w-full h-full text-center flex flex-col justify-center border-4 border-black hover:border-4 hover:border-[#1AA297] hover:cursor-pointer rounded-xl">
            <p className="text-base font-bold">{event.name}</p>
            <p className="text-sm font-medium mt-2">
              {event.date} - {event.time}
            </p>
            <p className="text-xs mt-2">
              {event.venue} - {event.city}, {event.countrycode},{" "}
              {event.postcode}
              <Link
                href={event.ticketlink}
                className="flex justify-center mt-10"
              >
                <Image
                  className=" hover:scale-125 transition"
                  src="/tickets-white.png"
                  width={40}
                  height={40}
                  alt="Ticket Icon"
                />
              </Link>
              {/* Button to remove event from interested */}
              <button
                onClick={() => removeInterestedEvent(event._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Remove from Interested
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterestedEvents;
