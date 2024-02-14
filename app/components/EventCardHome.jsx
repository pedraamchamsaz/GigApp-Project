"use client";
import Image from 'next/image'

const EventCardHome = (props) => {
  
  return (

    <div className='relative w-1/4 h-1/3' 
    // onClick={
    //   () => {
    //     handleClickOpen(event)
    //   }
    // }
    >
      <img 
        className='object-cover  rounded-xl' 
        src={props.EventPhoto}/>
        
      <div className='absolute top-1 text-white w-full h-full text-center flex flex-col justify-center p-3'>
        <p className='text-base font-bold'> {props.EventName}</p>
        <p className='text-sm font-medium mt-2'>{props.EventDate} - {props.EventTime}</p>
        <p className='text-xs mt-2'>{props.EventCity}</p>
      </div>
      {/* <CardExpanded 
        open={open}
        handleClose={handleClose}
        eventData={eventData}
        event={stateEvent}
        img={stateImg}
        /> */}
    </div>

    
    // <div className="border p-10">
      
          
    //         <h2 className="text-white card-title text-xl text-black font-bold md:text-xl text-center p-4">
    //           {props.EventName}
    //         </h2>
            
    //         <div className="">
    //           <div className="">
    //             <div>
    //               <p className="text-white whitespace-normal text-[#221D23] text-center font-bold text-xs md:text-sm">
    //                 Location: {props.EventCity}
    //               </p>
                                 
                
    //               <p className="text-white whitespace-normal text-[#221D23] text-center font-bold text-xs md:text-sm">
    //                 Date: {props.EventDate}
                    
    //               </p>
    //               <p className="text-white whitespace-normal text-[#221D23] text-center font-bold text-xs md:text-sm">
                    
    //                 Time: {props.EventTime}
    //               </p>
                  
    //             </div>
    //             <div className="text-white flex justify-center">
    //               <p className="">
    //                 Photo: {props.EventPhoto}
    //               </p>
    //               <p className="text-white whitespace-normal text-[#221D23] text-left mt-2 md:text-xl text-gray-800">
                   
    //               </p>
    //             </div>
    //             {/* <div className="text-white flex justify-center">
    //               <p className="">
    //                 Description: {props.EventDescription}
    //               </p>
    //               <p className="text-white whitespace-normal text-[#221D23] text-left mt-2 md:text-xl text-gray-800">
                   
    //               </p>
    //             </div> */}
    //             <div className="text-white col-span-1 md:col-span-2 flex justify-center">
    //               <p className="">
    //                 Ticket Price: £{props.EventPrice}
    //               </p>
    //             </div>
    //             <div className="text-white col-span-1 md:col-span-2 flex gap-10 mx-20 justify-center space-x-4">
                 
    //             </div>
    //           </div>
    //         </div>
                  
    // </div>



  );
};

export default EventCardHome;



