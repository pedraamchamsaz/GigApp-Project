"use client";

const EventCard = (props) => {
  const keyID = props.keyA;
  return (
    <div className="w-full flex flex-col shadow-lg rounded-lg overflow-hidden">
      <div className="flex item-center w-full sm:justify-end sm:pb-8 md:pb-4 md:pt-8">
        <div className="card w-full bg-white p-2 transition-all duration-300 ease-in-out">
          <div className="card-body flex flex-col px-4 items-center justify-center">
            <h2 className="card-title hover:text-[#087CA7] text-xl text-[#087CA7] font-bold md:text-3xl text-center p-4 transition-colors duration-200 ease-in-out">
              {props.EventName}
            </h2>

            <div className="flex items-center justify-center"></div>
            <div className="flex flex-col mb-10">
              <div className="">
                <div>
                  <p className="whitespace-normal hover:text-[#087CA7] text-[#221D23] text-center font-bold text-xs md:text-sm transition-colors duration-200 ease-in-out">
                    Location: {props.EventCity}
                  </p>
                                 
                
                  <p className="whitespace-normal hover:text-[#087CA7] text-[#221D23] text-center font-bold text-xs md:text-sm transition-colors duration-200 ease-in-out">
                    Date: {props.EventDate}
                  </p>
                  
                </div>
                <div className="flex justify-center">
                  <p className=" flex justify-centerwhitespace-normal hover:text-[#087CA7] text-black text-left mt-2 font-bold text-base md:text-md text-gray-800 transition-colors duration-200 ease-in-out">
                    Description: {props.EventDescription}
                  </p>
                  <p className="whitespace-normal text-[#221D23] text-left mt-2 md:text-xl text-gray-800">
                   
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-center">
                  <p className="whitespace-normal mr-2 font-bold hover:text-[#087CA7] text-[#221D23] text-xs md:text-sm transition-colors duration-200 ease-in-out">
                    Ticket Price: £{props.EventPrice}
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2 flex gap-10 mx-20 justify-center space-x-4">
                  <button
                    type="submit"
                    className="bg-[#13C3B5] p-4 w-[55%] font-semibold text-white rounded-full hover:text-white hover:bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out mt-10"
                    onClick={() => props.updateEvents(props)}
                  >
                    Update
                  </button>

                  <button
                    type="submit"
                    className="bg-[#13C3B5] p-4 w-[55%] font-semibold text-white rounded-full hover:text-white hover:bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out mt-10"
                    onClick={() => {
                      props.removeEvents(keyID);
                    }}
                  >
                    Delete
                  </button>
                </div>

                {/* <button onClick={() => removeAdvert(current._id)}>Delete Ad</button>
            <button onClick={() => updateAdvert(current)}>update</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
