"use client";

import { useState } from "react";

const Add = (props) => {
    const [disabled, setDisabled] = useState(false);

    const submitHandler = (e) => {
        // stop the page from refreshing when the user submits the form. That is the default behaviour of HTML forms
        e.preventDefault();
        setDisabled(true);
        let result;

        // form validation to make sure we send the correct data and types to the backend
        e.target.price.value = Number(e.target.price.value)
        if (!e.target.adName.value || !e.target.price.value || typeof e.target.price.value !== "number" ) {
            alert("Please enter a valid name and price")
            setDisabled(false);
            return;
        }


        // if there is a current ad, we know that the user is updating an ad because in order to have 
        // a current ad, the user has to have clicked on the update button for that ad
        if (props.currentAd) {
            result = props.client.updateAd(props.currentAd._id, e.target.adName.value, e.target.price.value);
        } else {
            result = props.client.addAd(e.target.adName.value, e.target.price.value);
        }


        result.then(() => {
            setDisabled(false);
            document.getElementById("addForm").reset();
            props.refreshList()
        }).catch(() => {
            alert("there was an error")
            setDisabled(false);
        })
    }
  return (
    <div>
        <h2>{props.currentAd ? "Update" : "Add"}</h2>
        <form onSubmit={submitHandler} id="addForm">
            name: <input type="text" name="adName" defaultValue={props.currentAd?.name} disabled={disabled} />
            price: <input type="text" name="price" defaultValue={props.currentAd?.price} disabled={disabled} />
            <button type="submit" disabled={disabled}>{props.currentAd ? "Update" : "Add"}</button>
        </form>
    </div>
  )
}

export default Add