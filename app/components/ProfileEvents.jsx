"use client";
import { useEffect, useState } from "react";
import EventCardHome from "./EventCardHome";

const ProfileEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(undefined);

  
  const refreshList = () => {
    props.client.getAllEvents().then((response) => {
      setEvents(response.data);
    }).catch((err) => {
      console.log("failed to get API request (GET)");
    });
  };


  useEffect(() => {
    console.log("Update current");
  }, [current]);

  
  useEffect(() => {
    refreshList();
    console.log(events);
  }, []);

  return (
    
    <div id="userprofile" className="border">
     
      <div className=" bg-black flex flex-row gap-3 items-center justify-center md:overflow-x-scroll">
        {events.map((current) => (
          <div className=" sm:mt-[3%] mb-[3%]" key={current._id}>
            <EventCardHome
            
              keyA={current._id}
              EventName={current.name}
              EventCity={current.city}
              EventDate={current.date}
              EventPrice={current.price}
              EventDescription={current.description}
          
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileEvents;
