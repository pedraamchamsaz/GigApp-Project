import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CardLarge = ({event, img}) => {
    const startDate = event?.date
    const startTime = event?.time.slice(0, 5)
    const venue = event.venue
    const minPrice = event.priceRanges && event.min
    const maxPrice = event.priceRanges && event.max
    const currency = event.priceRanges && event.currency


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
                <p className='text-xs mt-2'>{venue} - {event.city}, {event.countrycode}</p>
                <p className='text-xs font-bold mt-4'>{event.priceRanges && minPrice && maxPrice ? `${formatPriceToCurrency(minPrice, currency)} - ${formatPriceToCurrency(maxPrice, currency)}` : 'No Price Available (See Link)'}</p>
            </div>
            <div className='flex flex-col lg:flex-row justify-center items-center gap-4 bg-black pr-10'>
                <Link href={event.ticketlink} target='_blank'>
                    <Image 
                        className='hover:scale-125 hover:cursor-pointer transition'
                        src="/tickets-white.png"
                        width={100}
                        height={100}
                    />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default CardLarge