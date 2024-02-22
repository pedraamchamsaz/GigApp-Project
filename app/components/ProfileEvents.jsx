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

  const getLatLongFromPostcode = async (postcode) => {
    const apiKey = 'AIzaSyDh2csaRjBg4qLiYDYOX9HaY1a1gXgjT-o';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { latitude: location.lat, longitude: location.lng };
      } else {
        throw new Error('Invalid postcode or no results found.');
      }
    } catch (error) {
      console.error('Error converting postcode to lat long:', error.message);
      return null;
    }
  };

  const convertPostcodesToLatLong = async () => {
    const updatedUserMarkerLocations = await Promise.all(
      events.map(async (currentEvent) => {
        try {
          const location = await getLatLongFromPostcode(currentEvent.postcode);
          if (location) {
            const { latitude, longitude } = location;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  
            return {
              latitude,
              longitude,
              name: currentEvent.name,
              date: currentEvent.date,
              photo: currentEvent.photo,
              venue: currentEvent.venue,
            };
          } else {
            // Handle the case when the location is null or undefined
            return null;
          }
        } catch (error) {
          console.error(error.message);
          return null;
        }
      })
    );
  
    // Filter out events with invalid postcodes
    const filteredLocations = updatedUserMarkerLocations.filter(
      (location) => location !== null
    );
  
    props.setUserMarkerLocations(filteredLocations);
  };
  

  useEffect(() => {
    console.log("Update current");
  }, [current]);

  useEffect(() => {
    refreshList();
    console.log(events);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      convertPostcodesToLatLong();
    }
  }, [events]);

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
            EventCurrency={current.currency}
            EventPriceMax={current.price2}
            EventTicketLink={current.ticketlink}
            
          />
        ))}

       
      </div>
    </div>
  );
};

export default ProfileEvents;
