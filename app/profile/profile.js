"use client";
import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import LogoutButton from "../components/logoutButton";
import Link from "next/link";
import HomeButton from "../components/HomeButton";


const Profile = (props) => {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(undefined);

  
  const refreshList = () => {
    props.client.getEvents().then((response) => {
      setEvents(response.data);
    }).catch((err) => {
      console.log("failed to get API request (GET)");
    });
  };


  const removeEvents = (id) => {
    props.client.removeEvent(id).then(() => {
      refreshList();
    });
  };

  
  const updateEvents = (event) => {
    setCurrent(event);
  };

  useEffect(() => {
    console.log("Update current");
  }, [current]);

  
  useEffect(() => {
    refreshList();
    console.log(events);
  }, []);

  return (
    
    <div id="userprofile" className="fixed top-0 left-0 w-screen h-screen bg-black overflow-y-auto">
       
      <div className="flex justify-end items-center h-12">
      {/* <img className="w-[3%] mt-[4%] ml-7" src='./assets/images/Logowhite.png'></img> */}
      
        <div className="ml-auto mr-4 mt-20">
          <HomeButton />
        </div>
        <div className="mr-4 mt-20 mr-20">
          <LogoutButton setToken={props.setToken} />
        </div>
      </div>
      <p className="text-blue-200 text-center">Hi! Good to see you back!</p>
      <div className=" md:fixed md:w-[50%] max-sm:w-screen max-sm:h-[50%] md:h-[50vw] pr-[5%] pl-[5%] pb-[10%] pb-[1%] sm:pb-[10%]">
        <EventForm
          client={props.client}
          refreshList={refreshList}
          setCurrent={setCurrent}
          currentEvent={current}
        />
      </div>
      <div className="pt-14 sm:pt-20 md:w-[50%] h-full pl-[5%] pr-[5%] sm:pl-[5%] md:fixed right-0 sm:w-[100vw] md:overflow-y-scroll">
        {events.map((current) => (
          <div className="mt-[7%] sm:mt-[3%]" key={current._id}>
            <EventCard
              removeEvents={(id) => removeEvents(id)}
              keyA={current._id}
              EventName={current.name}
              EventCity={current.city}
              EventDate={current.date}
              EventPrice={current.price}
              EventDescription={current.description}
              updateEvents={updateEvents}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
