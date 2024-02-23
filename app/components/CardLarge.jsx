import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const CardLarge = ({event, img, userSavedEvents, setUserSavedEvents, stateEvent, eventsArray, }) => {
    const startDate = event?.dates.start.localDate
    const startTime = event?.dates.start.localTime.slice(0, 5)
    const venue = event._embedded.venues[0]
    const minPrice = event.priceRanges && event.priceRanges[0].min
    const maxPrice = event.priceRanges && event.priceRanges[0].max
    const currency = event.priceRanges && event.priceRanges[0].currency


    function formatPriceToCurrency(price, currencyCode) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
        });
        return formatter.format(price);
    }

  return (
    <div className='h-screen w-full border-4'>
        <img 
            className='object-cover w-full h-2/3' 
            src={img}/>
        <div className='flex h-1/3'>
            <div className='bg-black text-white w-full flex flex-col items-start justify-center p-3'>
                <p className='text-lg font-bold '>{event.name}</p>
                <p className='text-sm font-medium mt-2'>{startDate} - {startTime}</p>
                <p className='text-xs mt-2'>{venue.name} - {venue.city.name}, {venue.country.countryCode}</p>
                <p className='text-xs font-bold mt-4'>{event.priceRanges && minPrice && maxPrice ? `${formatPriceToCurrency(minPrice, currency)} - ${formatPriceToCurrency(maxPrice, currency)}` : 'No Price Available (See Link)'}</p>
            </div>
            <div className='flex justify-center items-center gap-4 bg-black pr-10'>
                <Link href={event.url} target='_blank'>
                    <Image 
                        className='hover:scale-125 hover:cursor-pointer transition'
                        src="/tickets-white.png"
                        width={130}
                        height={130}
                    />
                </Link>
                <img className='h-10 w-10 hover:scale-125 hover:cursor-pointer transition' src="bookmark-white.png"/>
                <img className='h-10 w-10 hover:scale-125 hover:cursor-pointer transition' src="calendar-white.png"/>
             
            </div>
        </div>
    </div>
  )
}

export default CardLarge