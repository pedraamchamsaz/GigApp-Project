"use client";

import { useState, useEffect } from "react";

const SignUp = ({submitHandler, setAuthProcess, client}) => {
  const [userObject, setuserObject] = useState({username:"", password:"", password2:""})
  const checkPassword = () => {
        const isRight = /^(?=.*[a-zA-Z0-9])(?=.*[\W_]).{8,20}$/g.test(userObject.password);
        console.log("checked")
        return isRight ? true : false 
      }
  const comparePassword = () => {
    if(userObject.password === userObject.password2) {
      return checkPassword();
    }
    alert("Passwords must match")
    return false;
  }

  const handleInputChange = (event) => {
    setuserObject({
    ...userObject,
    [event.target.name]: event.target.value
  })
  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    let userExists;

    try {
      
      userExists = await client.checkUsername(userObject);
      console.log(userExists.data)

    } catch (error) {
      console.log(error);
      console.log("Error making request");
    }
    
    if(userExists.data == false)
    {
      const isPassword = comparePassword();

      if (isPassword) {
        // Sign up user
        try {
          await client.signUp(userObject.username, userObject.password);
          let userObject2 = {username : userObject.username, password: userObject.password}
          await submitHandler(userObject2);
          return;
        } catch (err) {
          console.error(err);
        }
      } else {
        alert("Password must be: \n8-20 characters long.\ncontain at least one special character.\ncontain at least one number.\ncontain at least one capital and lowecase letter.")
        return;
      } 
    }

    alert("User name taken")
  };

  const handleLogin = () => {
    setAuthProcess(false);
    console.log("Sign Up");
  };


  return (
    <div className="h-1/2 bg-white overflow-hidden sm:w-1/4 w-2/3 border-[#087CA7] border-2 border-solid rounded-lg shadow-lg bg-slate-200 shadow-lg shadow-black">
      <form
        onSubmit={handleSignUp}
        className="flex h-full w-full gap-6 justify-center bg-slate-200 items-center font-semibold"
      >
        <div className="flex w-full flex-col justify-center items-center">
          {/* Username */}
          <div className="flex flex-col w-full h-1/2 items-center">
            <label id="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleInputChange}
              value={userObject.name}
              className="h-12 w-3/4 bg-white border-[#087CA7] border-2 rounded-lg text-center"
            />
          </div>
          {/* Passwords */}
          <div className="flex flex-col w-full items-center mb-2">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              value={userObject.password}
              className="h-12 w-3/4 border-[#087CA7] border-2 bg-white rounded-lg text-center"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex  flex-col w-full items-center mb-12">
            <label for="password">Confirm Password</label>
            <input
              type="password"
              name="password2"
              onChange={handleInputChange}
              value={userObject.password2}
              className="h-12 w-3/4 border-2 border-[#087CA7] bg-white rounded-lg text-center"
            />
          </div>

          {/* Authorisation */}
          <div className="w-full flex items-center flex-col gap-4">
            <button className="font-semibold bg-[#087CA7] h-10 sm:w-1/2 w-1/2 rounded-lg hover:text-[#087CA7] hover:bg-[#DFC2F2] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out">
              Sign Up
            </button>
            <p className="font-semibold hover:text-cCerulean" onClick={handleLogin}>Login?</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
