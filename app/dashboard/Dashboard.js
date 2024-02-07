"use client";
import { useEffect, useState } from "react";
import Add from "../components/Add";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard"
import LogoutButton from "../components/logoutButton";

const Dashboard = (props) => {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(undefined);

  // gets the events from the backend and updates the state in this file

  const refreshList = () => {
    props.client.getEvents().then((response) => {
      setEvents(response.data);
    }).catch((err) => {
      console.log("failed to get API request (GET)")
    });
  };

  // removes the advert and then calls refresh list so that the list of ads
  //  is updated and doesnt include the ad that the user just deleted.

  const removeEvents = (id) => {
    props.client.removeEvent(id).then(() => {
      refreshList();
    });
  };

  // take an ad from a child component and then we will set the current state to that at
  // so that we can edit it later on

  const updateEvents = (event) => {
    setCurrent(event);
  };

  useEffect(() => {
    console.log("Update current")
  }, [current])

  // this function is called when the component renders and it calls the refresh list function
  // that allows us to see the ads from the db (useeffect)

  useEffect(() => {
    refreshList();
    console.log(events);
  }, []);

  return (
    <div>
      <div className="fixed z-[1] right-4 top-4">
        <LogoutButton setToken={props.setToken} />
      </div>
      <div className="pt-10 md:fixed md:w-[50%] max-sm:w-screen max-sm:h-[50vh] md:h-[50vw] pr-[5%] pl-[5%] pt-[5%] pb-[10%] pb-[1%] sm:pb-[10%]">
        <EventForm 
          client={props.client}
          refreshList={() => {
            refreshList();
          }}
          setCurrent={() => {
            setCurrent()
          }}
          currentEvent={current}
        />
      </div>
      <div className="pt-14 sm:pt-20 md:w-[50%] h-full pl-[5%] pr-[5%] sm:pl-[5%] md:fixed right-0 sm:w-[100vw] md:overflow-y-scroll">
        {/* {buildrows} */}
        {events.map((current) => (
          <div className="mt-[7%] sm:mt-[3%]">
            {/* {console.log(current._id)} */}
            <EventCard 
              removeEvents={(id) =>
                removeEvents(id)
              }
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

export default Dashboard;
