"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiClient } from "@/apiClient";


// import GetStartedButton from "@app/components/GetStartedButton";

import HomeButton from "@/app/components/HomeButton";
import ProfileEvents from "../components/ProfileEvents";
import CardContainer from "../components/CardContainer";
import SearchBar from "../components/SearchBar";
import GetStartedButton from "../components/GetStartedButton";
import Geohash from 'latlon-geohash';
import axios from 'axios'
import FilterContainer from "../components/FilterContainer";



export default function HomePage() {
  const [token, setToken] = useState(null);
  
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const [eventData, setEventData] = useState([]);
  const [radius, setRadius] = useState(10)
  const [location, setLocation] = useState(null)


  useEffect(() => {
    const currentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords)
          const { latitude, longitude } = position.coords
          const geoHash = Geohash.encode(latitude, longitude, 8)
          console.log(geoHash)
          setLocation(geoHash)
          getEventData(geoHash)
        })
      }
    }

  currentLocation()

  }, [])

  const getEventData = async (location) => {
    try {

      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=dKxsi9vgsD7XZlAvArfdQv46MgJABpNm&classificationName=music&radius=${radius}&geoPoint=${location}&sort=date,asc`)

      console.log(response.data, "DATA")
      setEventData(response.data._embedded.events)
    } catch (e) {
      console.log(e, "ERROR")
    }
  }

  useEffect(() => {
    console.log("Page Log out");
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } // if !token, redirect to landing page
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (

    <>   
      <div>
      <div className="w-[7%]">
          <GetStartedButton />
        </div>
        <SearchBar />
      <div>
      <ProfileEvents client={client} />   
        </div>
         <div>
      <FilterContainer />
      <CardContainer 
        eventData={eventData}
        radius={radius}
        location={location}/>
     </div>
    </div>
    </>  

  );
}
