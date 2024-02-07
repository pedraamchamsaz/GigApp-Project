"use client";

import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthoriseUser = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [authProcess, setAuthProcess] = useState(false);

  useEffect(() => {
  }, [authProcess])

  // - - Alfie Code - -
  const submitHandler = (e) => {
      e.preventDefault();
      setDisabled(true);
      props.client.login(e.target?.username.value, e.target?.password.value).then((response) => {
          setDisabled(false);
          props.loggedIn(response.data.token)
      }).catch(() => {
        alert("Wrong Username or Password.\nTry again.")
        setDisabled(false);
      })
  }
  const submitHandlerSignUp = (UserObject) => 
  {
      console.log("THIS ONE")
      props.client.login(UserObject.username, UserObject.password).then((response) => {
      props.loggedIn(response.data.token)
  }).catch(() => {
      console.log("THIS ONE HERE")
  })
  }

  return (
    <div id="authorisation" className="h-screen w-screen flex flex-1 justify-center items-center ">
      {!authProcess ? (
        <SignIn submitHandler={submitHandler} setAuthProcess={setAuthProcess} />
      ) : (
        <SignUp submitHandler={submitHandlerSignUp} client={props.client} setAuthProcess={setAuthProcess} />
      )}

      {/* Alfie Code */}
      {/* login 
        <form onSubmit={submitHandler}>
            username <input type="text" name="username" disabled={disabled} />
            password <input type="password" name="password" disabled={disabled} />
            <button type="submit" disabled={disabled}>login</button>
        </form> */}
    </div>
  );
};

export default AuthoriseUser;
