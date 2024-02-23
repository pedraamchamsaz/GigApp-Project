"use client";
import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import LogoutButton from "../components/logoutButton";
import Link from "next/link";
import HomeButton from "../components/HomeButton";
import InterestedEvents from "../components/Interested";

const Profile = (props) => {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(undefined);

  const refreshList = () => {
    props.client
      .getEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
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
    <div
      id="userprofile"
      className="fixed top-0 left-0 w-screen h-full bg-black overflow-y-auto"
    >
      <div className="flex justify-end items-center h-[3%] mb-6">
        <div className="ml-auto mr-4 mt-20">
          <HomeButton />
        </div>
        <div className="mr-4 mt-20 mr-20">
          <LogoutButton setToken={props.setToken} />
        </div>
      </div>
      <p className="text-blue-200 text-center">Hi! Good to see you back!</p>
      <div className="fixed md:w-[50%] max-sm:w-screen max-sm:h-[50%] md:h-[50vw] pr-[5%] pl-[5%] pb-[10%] pb-[1%] sm:pb-[10%]">
        <EventForm
          client={props.client}
          refreshList={refreshList}
          setCurrent={setCurrent}
          currentEvent={current}
        />
      </div>
      <div className="w-[50%] h-full fixed right-0 overflow-y-scroll py-8">
        {events.map((current) => (
          <div className="mt-[7%]" key={current._id}>
            <EventCard
              removeEvents={(id) => removeEvents(id)}
              keyA={current._id}
              EventName={current.name}
              EventCity={current.city}
              EventDate={current.date}
              EventPrice={current.price}
              EventTime={current.time}
              photo={current.photo}
              EventVenue={current.venue}
              EventCountryCode={current.countrycode}
              EventPostcode={current.postcode}
              EventCurrency={current.currency}
              EventPriceMax={current.price2}
              EventTicketLink={current.ticketlink}
              updateEvents={updateEvents}
            />
          </div>
        ))}


        <div>
          <InterestedEvents events={events}/>
        </div>



      </div>
    </div>
  );
};

export default Profile;
