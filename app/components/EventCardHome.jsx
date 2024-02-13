"use client";
import Image from 'next/image'

const EventCardHome = (props) => {
  
  return (


    
    <div className="border p-10">
      
          
            <h2 className="card-title text-xl text-black font-bold md:text-xl text-center p-4">
              {props.EventName}
            </h2>
            
            <div className="">
              <div className="">
                <div>
                  <p className="whitespace-normal text-[#221D23] text-center font-bold text-xs md:text-sm">
                    Location: {props.EventCity}
                  </p>
                                 
                
                  <p className="whitespace-normal text-[#221D23] text-center font-bold text-xs md:text-sm">
                    Date: {props.EventDate}
                  </p>
                  
                </div>
                <div className="flex justify-center">
                  <p className="">
                    Description: {props.EventDescription}
                  </p>
                  <p className="whitespace-normal text-[#221D23] text-left mt-2 md:text-xl text-gray-800">
                   
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-center">
                  <p className="">
                    Ticket Price: £{props.EventPrice}
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2 flex gap-10 mx-20 justify-center space-x-4">
                 
                </div>
              </div>
            </div>
                  
    </div>

//  <div className="flex justify-center flex-wrap gap-8 pt-3">
//        <div className='w-1/4 h-1/3 relative'>
//             <img 
//               className='object-cover w-full h-full rounded-xl' 
//               src="..\public\image\bg-cta.jpg"/>
//               <div className="flex border">
//             <div className='absolute top-1 text-white w-full h-full text-center flex flex-col justify-center p-3'>
//               <p className='text-base font-bold text-black'>{props.EventName}</p>
//               <p className='text-sm font-medium mt-2 text-black'>Date: {props.EventDate}</p>
//               <p className='text-sm font-medium mt-2 text-black'>Location: {props.EventCity}</p>
//               <p className='text-xs mt-2 text-black'>Description: {props.EventDescription}</p>
//                <p className='text-xs mt-2 text-black'>Ticket Price: £{props.EventPrice}</p>
//             </div>
//           </div>
//         </div>
     
//     </div> 

  );
};

export default EventCardHome;



