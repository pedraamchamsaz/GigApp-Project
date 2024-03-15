"use client";
import { useEffect, useState } from "react";
import EventCardHome from "./EventCardHome";

const ProfileEvents = ({client, userMarkerLocations, setUserMarkerLocations, resultsUser, startDateUser, endDateUser, currentCoords, userGigRadius }) => {
  // working code

  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(undefined);
  const [bookmarkedEvents, setBookmarkedEvents] = useState({});

  // const eventsLatLon = []
  
  const refreshList = () => {
    client
      .getAllEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
        console.log("failed to get API request (GET)");
      });
  };

  const getLatLongFromPostcode = async (postcode) => {
    const GoogleapiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${GoogleapiKey}`;

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
            console.log(currentEvent)
            return {
              ...currentEvent,
              latitude,
              longitude,
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
  
    setUserMarkerLocations(filteredLocations);
  };
  

  useEffect(() => {
    console.log("Update current");
  }, [current]);

  useEffect(() => {
    refreshList();  
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      convertPostcodesToLatLong();
    }
  }, [events]);

  function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
    const R = 3963.19; // Radius of the earth in miles
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in miles
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  // working code

  return (
    <div id="userprofile">
      <div className=" flex justify-center flex-wrap gap-8 mb-5 mt-5">
        {userMarkerLocations.slice(0, resultsUser).filter(event => event.date >= startDateUser && event.date <= endDateUser).filter(event => getDistanceFromLatLon(event.latitude, event.longitude, currentCoords.latitude, currentCoords.longitude) <= userGigRadius).map((current) => (
          <EventCardHome
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
            bookmarked={bookmarkedEvents[current._id] || false}
      setBookmarked={(isBookmarked) => {
        setBookmarkedEvents((prevBookmarked) => ({
          ...prevBookmarked,
          [current._id]: isBookmarked,
        }));
      }}
          />
        ))}

       
      </div>
    </div>
  );
};

export default ProfileEvents;

