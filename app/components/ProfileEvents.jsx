"use client";
import { useEffect, useState } from "react";
import EventCardHome from "./EventCardHome";
import EventUserCardLarge from "./EventUserCardLarge";

const ProfileEvents = (props) => {
  // working code

  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(undefined);

  const refreshList = () => {
    props.client
      .getAllEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
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

  // working code

  return (
    <div id="userprofile" className="border">
      <div className=" flex justify-center flex-wrap gap-8 mb-5 mt-5">
        {events.map((current) => (
          <EventCardHome
            keyA={current._id}
            EventName={current.name}
            EventCity={current.city}
            EventDate={current.date}
            EventPrice={current.price}
            EventTime={current.time}
            EventPhoto={current.photo}

            EventVenue={current.venue}
            EventCountryCode={current.countrycode}
            EventPostcode={current.postcode}
            
          />
        ))}

       
      </div>
    </div>
  );
};

export default ProfileEvents;
