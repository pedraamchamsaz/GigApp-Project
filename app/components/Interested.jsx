"use client";
import { useState, useEffect } from "react";
import { ApiClient } from "@/apiClient";

const InterestedEvents = () => {
  const [interestedEvents, setInterestedEvents] = useState([]);

  useEffect(() => {
    const fetchInterestedEvents = async () => {
      try {
        // Initialize ApiClient
        const apiClient = new ApiClient(
          () => token,
          () => logout()
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

  return (
    <div className="border border-white text-white h-80 w-50">
      <h2>Interested Events</h2>
      {interestedEvents.map((event) => (
        <div className="text-white border border-white" key={event._id}>
          <h3 className="text-white border border-white">{event.name}</h3>
          <p className="text-white border border-white">Date: {event.date}</p>
          <p className="text-white border border-white">
            Location: {event.venue}, {event.city}
          </p>
        </div>
      ))}
    </div>
  );
};

export default InterestedEvents;
