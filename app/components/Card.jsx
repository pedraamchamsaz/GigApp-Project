"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import CardExpanded from './CardExpanded'

const Card = ({ eventData, open, setOpen, stateEvent, setStateEvent, stateImg, setStateImg, results, setResults, markerLocations, 
}) => {
  
  const handleClickOpen = (eventPassedIn) => {
    if (stateEvent) {
      return;
    }
    setOpen(true);
    setStateEvent(eventPassedIn)

    const filteredImages = eventPassedIn.images.filter(image => image.height === 1152);
    const img = filteredImages.length > 0 && filteredImages[0].url;
    setStateImg(img)
  };

  const handleClose = () => {
    console.log("this is being clicked")
    setStateEvent('')
    setOpen(false);
  };

  // console.log(markerLocations, 'MARKER LOCATIONS')

  return (
    <div className="flex justify-center flex-wrap gap-8 pt-3 mt-5">
      {eventData.slice(0, results).map((event, index) => {

        const filteredImages = event.images.filter(image => image.height === 1152);
        const img = filteredImages.length > 0 && filteredImages[0].url;

        // markerLocations.push(event._embedded.venues[0].location)

        return (
          <div className='w-80 h-64 relative rounded-xl' onClick={
            () => {
              handleClickOpen(event)
            }
          }>
              <img 
                className='object-cover w-full h-full rounded-xl' 
                src={img}/>
              <div className='bg-black/50 absolute top-0 text-white w-full h-full text-center flex flex-col justify-center border-4 border-black hover:border-4 hover:border-[#1AA297] hover:cursor-pointer rounded-xl'>
                <p className='text-base font-bold'>{eventData[index].name}</p>
                <p className='text-sm font-medium mt-2'>{eventData[index].dates.start.localDate} - {eventData[index].dates.start.localTime.slice(0, 5)}</p>
                <p className='text-xs mt-2'>{eventData[index]._embedded.venues[0].name} - {eventData[index]._embedded.venues[0].city.name}, {eventData[index]._embedded.venues[0].country.countryCode}</p>
              </div>
            <CardExpanded 
              open={open}
              handleClose={handleClose}
              eventData={eventData}
              event={stateEvent}
              img={stateImg}
              />
          </div>
        );
      })}
    </div>
  )
}

export default Card