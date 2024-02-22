"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
// new
import { CldUploadWidget } from "next-cloudinary";

const EventForm = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    console.log("Photo Variable:", photo);
  }, [photo]);

  const submitHandler = (e) => {
    // stop the page from refreshing when the user submits the form. That is the default behaviour of HTML forms
    e.preventDefault();
    setDisabled(true);

    // Array to store validation errors
    const validationErrors = [];

    // Form validation to check for missing values
    if (!e.target.EventName.value) {
      validationErrors.push("Please enter Event Name");
    }
    if (!e.target.EventDate.value) {
      validationErrors.push("Please enter Event Date");
    }
    if (!e.target.EventCity.value) {
      validationErrors.push("Please enter Event City");
    }
    if (!e.target.EventVenue.value) {
      validationErrors.push("Please enter Event Venue");
    }
    if (!e.target.EventCountryCode.value) {
      validationErrors.push("Please enter Event Country Code");
    }
    if (!e.target.EventPostcode.value) {
      validationErrors.push("Please enter Event Postcode");
    }
    if (!e.target.EventCurrency.value) {
      validationErrors.push("Please enter Event Ticket Currency");
    }
    if (!e.target.EventPrice.value) {
      validationErrors.push("Please enter valid minimum price");
    }
    if (!e.target.EventPriceMax.value) {
      validationErrors.push("Please enter valid maximum price");
    }
    if (!e.target.EventTicketLink.value) {
      validationErrors.push("Please enter valid ticket link");
    }
     if (!photo) {
      validationErrors.push("Please enter Event Photo");
    }
    if (!e.target.EventTime.value) {
      validationErrors.push("Please enter Event Time");
    }

    // If there are validation errors, display them and stop further execution
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.warning(error));
      setDisabled(false);
      return;
    }

    // Proceed to add or update event
    let result;
    if (props.currentEvent) {
      console.log("Submit Event to UpdateEvent");
      result = props.client.updateEvent(
        props.currentEvent.keyA,
        e.target.EventName.value,
        e.target.EventCity.value,
        e.target.EventDate.value,
        e.target.EventPrice.value,
        e.target.EventTime.value, 
        photo,
        e.target.EventVenue.value,
        e.target.EventCountryCode.value,
        e.target.EventPostcode.value,
        e.target.EventCurrency.value,
        e.target.EventPriceMax.value,
        e.target.EventTicketLink.value,
       
      );
    } else {
      console.log("Submit Event to addEvent", photo);
      result = props.client.addEvent(
        e.target.EventName.value,
        e.target.EventCity.value,
        e.target.EventDate.value,
        e.target.EventPrice.value,
        e.target.EventTime.value, 
        photo,
        e.target.EventVenue.value,
        e.target.EventCountryCode.value,
        e.target.EventPostcode.value,
        e.target.EventCurrency.value,
        e.target.EventPriceMax.value,
        e.target.EventTicketLink.value,
       
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
        toast.warning(error);
        setDisabled(false);
      });
  };
  return (
    <form
      className="flex flex-col w-[60%] h-90 rounded-md bg-gray-200 items-center font-semibold p-[2%] mt-[5%]"
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
          className="rounded-full w-full p-1 border border-black mb-3"
          placeholder="City"
          defaultValue={props.currentEvent?.EventCity}
          disabled={disabled}
          name="EventCity"
        />
      </div>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black mb-3"
          placeholder="Venue"
          defaultValue={props.currentEvent?.EventVenue}
          disabled={disabled}
          name="EventVenue"
        />
      </div>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black mb-3"
          placeholder="Country Code, eg. GB"
          defaultValue={props.currentEvent?.EventCountryCode}
          disabled={disabled}
          name="EventCountryCode"
        />
      </div>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black"
          placeholder="Postcode, eg. S38HD"
          defaultValue={props.currentEvent?.EventPostcode}
          disabled={disabled}
          name="EventPostcode"
        />
      </div>
      <p>Tickets</p>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black mb-3"
          defaultValue={props.currentEvent?.EventCurrency}
          disabled={disabled}
          name="EventCurrency"
          placeholder="Currency, eg. £"
        />
      </div>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black mb-3"
          defaultValue={props.currentEvent?.EventPrice}
          disabled={disabled}
          name="EventPrice"
          placeholder="Minimum Price"
        />
      </div>

      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black mb-3"
          defaultValue={props.currentEvent?.EventPriceMax}
          disabled={disabled}
          name="EventPriceMax"
          placeholder="Maximum Price"
        />
      </div>
      <div className="mx-[10%] h-[10%]">
        <input
          type="text"
          className="rounded-full w-full p-1 border border-black mb-1"
          defaultValue={props.currentEvent?.EventTicketLink}
          disabled={disabled}
          name="EventTicketLink"
          placeholder="Paste Link to your tickets"
        />
      </div>
    
      <div>
       <CldUploadWidget
          onSuccess={(results) => {
            toast.success("Upload Completed");
            setPhoto(results.info.url); // Storing the URL in the photo variable
            console.log("URL", results.info.url);
          }}
          uploadPreset="tevzxzon"
        >
          {({ open }) => {
            return (
              <button
                className="bg-[#13C3B5] font-semibold text-white p-2 px-4 rounded-full hover:text-white hover:bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out mt-5"
                onClick={() => open()}
              >
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
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
        className="bg-[#13C3B5] font-semibold text-white h-15 py-1 sm:w-1/2 rounded-full hover:text-white hover:bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out mt-5"
        disabled={disabled}
      >
        {props.currentEvent ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
};

export default EventForm;
