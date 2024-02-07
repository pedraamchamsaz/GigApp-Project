"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Card = () => {

  const [eventData, setEventData] = useState([])

  const getData = async () => {
    try {
      const response = axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=dKxsi9vgsD7XZlAvArfdQv46MgJABpNm')
      console.log(response.data, "DATA")
      setEventData(response.data.body)
    } catch (e) {
      console.log(e, "ERROR")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex justify-start flex-wrap gap-4 pt-3">
      {eventData.slice(0, 9).map((event, index) => {
        return (
          <img src={eventData._embedded.events.images[0].url}/>
          // <div key={index} className="weather-card h-full min-w-32 w-32 bg-gradient-to-br from-blue-200 to-blue-400 flex flex-col items-center justify-evenly py-2 rounded-lg text-white">
          //   <p className="text-sm font-semibold">
          //     {displayHour}{amPm}
          //   </p>
          //   <img src={`https://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`} alt="" />
          //   <p className="text-md font-semibold">{unit ? Math.round(hourly.temp) : Math.round(changeToFahrenheit(hourly.temp))}°</p>
          // </div>
        );
      })}
    </div>
  )
}

export default Card