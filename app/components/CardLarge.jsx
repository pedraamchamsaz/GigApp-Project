import React from 'react'

const CardLarge = ({event, img}) => {

  return (
    <div className='h-screen w-full border-4'>
        <img 
            className='object-cover w-full h-2/3' 
            src={img}/>
        <div className='flex h-1/3'>
            <div className='bg-black text-white w-full flex flex-col items-start justify-center p-3'>
                <p className='text-base font-bold '>{event.name}</p>
                <p className='text-sm font-medium mt-2'>{event.dates.start.localDate} - {event.dates.start.localTime.slice(0, 5)}</p>
                <p className='text-xs mt-2'>{event._embedded.venues[0].name} - {event._embedded.venues[0].city.name}, {event._embedded.venues[0].country.countryCode}</p>
            </div>
            <div className='flex justify-center items-center gap-4 bg-black pr-10'>
                <img className='h-10 w-10 hover:scale-125 transition' src="tickets-white.png"/>
                <img className='h-10 w-10 hover:scale-125 transition' src="bookmark-white.png"/>
                <img className='h-10 w-10 hover:scale-125 transition' src="calendar-white.png"/>
             
            </div>
        </div>
    </div>
  )
}

export default CardLarge