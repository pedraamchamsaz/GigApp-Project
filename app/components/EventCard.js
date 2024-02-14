"use client";

const EventCard = (props) => {
  const keyID = props.keyA;
  return (
  <>
      
      <div
        className="w-[600px] h-[400px] relative mb-5"
        // onClick={
        //   () => {
        //     handleClickOpen(event)
        //   }
        // }
      >
        <img className="object-cover w-screen rounded-xl" src={props.EventPhoto} />

        <div className="absolute top-1 text-white w-full h-full text-center flex flex-col justify-center p-3">
          <p className="text-base font-bold"> {props.EventName}</p>
          <p className="text-sm font-medium mt-2">
            {props.EventDate} - {props.EventTime}
          </p>
          <p className="text-xs mt-2">{props.EventCity}</p>
          <p className="text-xs mt-2">Price: £{props.EventPrice}</p>

          <div className="col-span-1 md:col-span-2 flex gap-10 mx-20 justify-center space-x-4 mt-5">
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
        </div>
        {/* <CardExpanded 
        open={open}
        handleClose={handleClose}
        eventData={eventData}
        event={stateEvent}
        img={stateImg}
        /> */}
      </div>
    </>
  );
};

export default EventCard;
