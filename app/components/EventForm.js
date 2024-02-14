"use client";
import { useState } from "react";

const EventForm = (props) => {
  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    // stop the page from refreshing when the user submits the form. That is the default behaviour of HTML forms
    e.preventDefault();
    setDisabled(true);
    let result;

    // form validation to make sure we send the correct data and types to the backend

    if (e.target.EventPrice !== "") {
      console.log(e.target.EventPrice);

      e.target.EventPrice.value = Number(e.target.EventPrice.value);
    }
    console.log(e.target.EventDate.value);

    if (
      !e.target.EventName.value ||
      !e.target.EventDate.value ||
      !e.target.EventCity.value ||
     
      !e.target.EventTime.value ||
      !e.target.EventPhoto.value ||
      typeof e.target.EventPrice.value !== "number"
    ) {
      if (!e.target.EventName.value) {
        alert("Please enter Event Name");
        setDisabled(false);
      } else if (!e.target.EventDate.value) {
        alert("Please enter Event Date");
        setDisabled(false);
  
      } else if (!e.target.EventTime.value) {
        alert("Please enter Event Time");
        setDisabled(false);
      } else if (!e.target.EventPhoto.value) {
        alert("Please enter Event Photo");
        setDisabled(false);
      } else if (!e.target.EventCity.value) {
        alert("Please enter Event City");
        setDisabled(false);
      } else if (typeof e.target.EventPrice.value === "number") {
        alert("Please enter Valid price");
        setDisabled(false);
      }
    }

    // if there is a current Event, we know that the user is updating an event because in order to have
    // a current event, the user has to have clicked on the update button for that event

    if (props.currentEvent) {
      console.log("Submit Event to UpdateEvent");
      result = props.client.updateEvent(
        props.currentEvent.keyA,
        e.target.EventName.value,
        e.target.EventCity.value,
        e.target.EventDate.value,
        e.target.EventPrice.value,
      
        e.target.EventTime.value,
        e.target.EventPhoto.value,
      );
    } else {
      console.log("Submit Event to addEvent");
      result = props.client.addEvent(
        e.target.EventName.value,
        e.target.EventCity.value,
        e.target.EventDate.value,
        e.target.EventPrice.value,
        
        e.target.EventTime.value,
        e.target.EventPhoto.value,
      );
    }

    result
      .then(() => {
        setDisabled(false);
        document.getElementById("addForm").reset();
        props.refreshList();
        props.setCurrent(undefined);
      })
      .catch((error) => {
        alert(error);
        setDisabled(false);
      });
  };
  return (
    <form
      className="flex flex-col w-[70%] h-4/5 rounded-md bg-gray-200 items-center font-semibold p-[5%] mt-[15%]"
      onSubmit={submitHandler}
      id="addForm"
    >
      <p>Basic Information</p>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="w-full p-1 border border-black rounded-full"
          placeholder="Event Name:"
          defaultValue={props.currentEvent?.EventName}
          disabled={disabled}
          name="EventName"
        />
      </div>
      <div className="mx-[10%] h-[10%] mt-3">
        <input
          type="date"
          className="w-full p-1 border border-black rounded-full text-gray-400"
          defaultValue={props.currentEvent?.EventDate}
          disabled={disabled}
          name="EventDate"
        />
      </div>
      <p>Location</p>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black"
          placeholder="Vanue - City, Country Code"
          defaultValue={props.currentEvent?.EventCity}
          disabled={disabled}
          name="EventCity"
        />
      </div>
      <p>Tickets</p>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black"
          defaultValue={props.currentEvent?.EventPrice}
          disabled={disabled}
          name="EventPrice"
          placeholder="Price"
        />
      </div>
      <p>Photo</p>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black"
          defaultValue={props.currentEvent?.EventPhoto}
          disabled={disabled}
          name="EventPhoto"
          placeholder="Photo"
        />
      </div>
    
      <p>Time</p>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black"
          defaultValue={props.currentEvent?.EventTime}
          disabled={disabled}
          name="EventTime"
          placeholder="HH:MM"
        />
      </div>

      <button
        type="submit"
        className="bg-[#13C3B5] font-semibold text-white h-10 sm:w-1/2 w-1/2 rounded-full hover:text-white hover:bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out mt-10"
        disabled={disabled}
      >
        {props.currentEvent ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
};

export default EventForm;
