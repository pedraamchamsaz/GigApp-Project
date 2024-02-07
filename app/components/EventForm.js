'use client'
import { useState } from 'react'

const EventForm = (props) => {
     const [disabled, setDisabled] = useState(false);

     const submitHandler = (e) => {
          // stop the page from refreshing when the user submits the form. That is the default behaviour of HTML forms
          e.preventDefault();
          setDisabled(true);
          let result;
     
          // form validation to make sure we send the correct data and types to the backend
          
          if(e.target.EventPrice !== "")
          {
               console.log(e.target.EventPrice)
          
               e.target.EventPrice.value = Number(e.target.EventPrice.value)
          }
          console.log(e.target.EventDate.value)
         
          if (!e.target.EventName.value || !e.target.EventDate.value || !e.target.EventDescription.value || !e.target.EventCity.value || typeof e.target.EventPrice.value !== "number") {
               if(!e.target.EventName.value)
               {
                    alert("Please enter Event Name")
                    setDisabled(false);
               }
               else if(!e.target.EventDate.value)
               {
                    alert("Please enter Event Date")
                    setDisabled(false);
               }
               else if(!e.target.EventDescription.value)
               {
                    alert("Please enter Event Description")
                    setDisabled(false);
               }
               else if(!e.target.EventCity.value)
               {
                    alert("Please enter Event City")
                    setDisabled(false)
               }
               else if(typeof e.target.EventPrice.value === "number")
               {
                    alert("Please enter Valid price")
                    setDisabled(false)
               }
          }
     
          // if there is a current Event, we know that the user is updating an event because in order to have 
          // a current event, the user has to have clicked on the update button for that event
        
          if (props.currentEvent) {
               console.log("Submit Event to UpdateEvent");
               result = props.client.updateEvent(props.currentEvent.keyA, e.target.EventName.value, e.target.EventCity.value, e.target.EventDate.value, e.target.EventPrice.value, e.target.EventDescription.value );
          } else {
               console.log("Submit Event to addEvent")
               result = props.client.addEvent(e.target.EventName.value, e.target.EventCity.value, e.target.EventDate.value, e.target.EventPrice.value, e.target.EventDescription.value );
          }
        

          result.then(() => {
               setDisabled(false);
               document.getElementById("addForm").reset();
               props.refreshList()
               props.setCurrent(undefined)
          }).catch((error) => {
               alert(error)
               setDisabled(false);
          })
     }
  return (
     <form className='flex flex-col w-full h-full bg-slate-200 rounded-lg gap-4 shadow-lg shadow-black p-[5%] mt-[15%]'
     onSubmit={submitHandler} id='addForm'>
          <button type="submit" className='rounded-lg text-2xl bg-[#087CA7] h-[20%] sm:mx-auto w-full flex justify-center items-center text-white p-4 font-bold rounded-lg bg-[#087CA7] hover:text-[#087CA7] hover:bg-[#DFC2F2] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out' disabled={disabled} >{props.currentEvent? "Update Event" : "Create Event"}</button>
          
          
          <div className='mx-[10%] flex gap-4 h-[10%]'>
               <input type="text" className='rounded-lg w-[50%] p-1' placeholder='Event Name:'
               defaultValue={props.currentEvent?.EventName} disabled={disabled} name='EventName'/>

               <input type="date" className='rounded-lg w-[50%] p-1' 
               defaultValue={props.currentEvent?.EventDate} disabled={disabled} name='EventDate'/>
          </div>

          <div className='mx-[10%] flex gap-4 h-[10%]'>
               <input type="text" className='rounded-lg w-[50%] p-1' placeholder='City'
               defaultValue={props.currentEvent?.EventCity} disabled={disabled} name='EventCity'/>

               <input type="text" className='rounded-lg w-[50%] p-1' 
               defaultValue={props.currentEvent?.EventPrice} disabled={disabled} name='EventPrice' placeholder='Price'/>
          </div>


          <div className='w-full h-full flex justify-center'>
               <textarea className='rounded-lg h-full sm:h-[85%] w-[80%] p-1' name='EventDescription' 
               defaultValue={props.currentEvent?.EventDescription} disabled={disabled}  placeholder='Description'/>
          </div>
     </form>
  )
}

export default EventForm