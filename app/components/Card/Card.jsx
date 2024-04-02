"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import CardExpanded from './CardExpanded'

const Card = ({ allEvents, results, setSelectedMarker, getDistanceFromLatLon, currentCoords, radius
}) => {

  const [open, setOpen] = useState(false);
  const [stateEvent, setStateEvent] = useState('');
  const [stateImg, setStateImg] = useState('');

  // const [userSavedEvents, setUserSavedEvents] = useState([])
  const handleClickOpen = (eventPassedIn) => {
    if (stateEvent) return;
    setOpen(true);
    setStateEvent(eventPassedIn)
    const filteredImages = eventPassedIn.images.filter(image => image.height === 1152);
    const img = filteredImages.length > 0 && filteredImages[0].url;
    setStateImg(img)
    setSelectedMarker(null)
  };

    const handleClose = () => {
    setStateEvent('')
    setOpen(false);
  };

  return (
    <div className="flex justify-center flex-wrap gap-8 pt-3 mt-5">
      {allEvents.filter(mark => getDistanceFromLatLon(currentCoords?.latitude, currentCoords?.longitude, mark.latitude, mark.longitude) <= radius).slice(0, results).map((event, index) => {

        const filteredImages = event.images?.filter(image => image.height === 1152);
        const img = filteredImages ? filteredImages.length > 0 && filteredImages[0].url : event.photo;

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
              <div className='bg-black/50 absolute top-0 text-white w-full h-full text-center flex flex-col justify-center border-4 border-black hover:border-4 hover:border-[#1AA297] hover:cursor-pointer rounded-xl p-2'>
                <p className='text-base font-bold'>{allEvents[index].name}</p>
                <p className='text-sm font-medium mt-2'>{allEvents[index]?.date} - {allEvents[index].time?.slice(0, 5)}</p>
                <p className='text-xs mt-2'>{allEvents[index].venue} - {allEvents[index].city.name || allEvents[index].city}, {allEvents[index].countrycode}</p>
              </div>
            <CardExpanded 
              open={open}
              handleClose={handleClose}
              allEvents={allEvents}
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