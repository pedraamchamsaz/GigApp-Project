"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Geohash from 'latlon-geohash';

const Card = () => {

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
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=dKxsi9vgsD7XZlAvArfdQv46MgJABpNm&classificationName=music&radius=${radius}&geoPoint=${location}&sort=distance,asc`)
      console.log(response.data, "DATA")
      setEventData(response.data._embedded.events)
    } catch (e) {
      console.log(e, "ERROR")
    }
  }

    // useEffect(() => {
    //   getEventData()
    // }, [])

  // const eventLocation = eventData[index]._embedded.venues[0].location

  // const arePointsNear = (checkPoint, centerPoint, km) => {
  //   const ky = 40000 / 360;
  //   const kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
  //   const dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
  //   const dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
  //   return Math.sqrt(dx * dx + dy * dy) <= km
  // }

  // const nearbyEvents = eventData.filter(event => arePointsNear(event._embedded.venues[0].location, currentLocation, 10))

  // console.log(eventData[0]._embedded.venues[0].location)

  return (
    <div className="flex justify-center flex-wrap gap-8 pt-3">
      {eventData.slice(0, 9).map((event, index) => {
        return (
          <div className='w-1/4 h-1/3 relative'>
            <img 
              className='object-cover w-full h-full rounded-xl' 
              src={eventData[index].images[3].url}/>
            <div className='absolute top-1 text-white w-full h-full text-center flex flex-col justify-center p-3'>
              <p className='text-base font-bold '>{eventData[index].name}</p>
              <p className='text-sm font-medium mt-2'>{eventData[index].dates.start.localDate} - {eventData[index].dates.start.localTime.slice(0, 5)}</p>
              <p className='text-xs mt-2'>{eventData[index]._embedded.venues[0].name} - {eventData[index]._embedded.venues[0].city.name}, {eventData[index]._embedded.venues[0].country.countryCode}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Card