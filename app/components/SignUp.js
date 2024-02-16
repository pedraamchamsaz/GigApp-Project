"use client";

import { useState } from "react";
import { Toaster, toast } from 'sonner'

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
    
    toast.warning("Passwords must match")
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
        
        toast.warning("Password must be: \n8-20 characters long.\ncontain at least one special character.\ncontain at least one number.\ncontain at least one capital and lowecase letter.")
        return;
      } 
    }

    toast.warning("User name taken")
  };

  const handleLogin = () => {
    setAuthProcess(false);
    console.log("Sign Up");
  };


  return (
    <div className="h-1/2 sm:w-[27%] bg-white overflow-hidden sm:w-1/4 w-2/3 rounded-md shadow-lg shadow-black">
      <form
        onSubmit={handleSignUp}
        className="flex h-full w-full gap-6 justify-center bg-gray-200 items-center font-semibold"
      >
        <div className="flex w-full flex-col justify-center items-center">
          {/* Username */}
          <div className="flex flex-col w-full h-1/2 items-center p-2">
          <p className="text-center mb-6 text-xl sm:text-2xl font-bold">Join Gignite.</p>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
              value={userObject.name}
              className="h-12 w-3/4 sm:w-[55%] bg-white border-black border rounded-full text-center shadow-md shadow-gray-600"
            />
          </div>
          {/* Passwords */}
          <div className="flex flex-col w-full items-center p-2">
           
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={userObject.password}
              className="h-12 w-3/4 sm:w-[55%] border-black border bg-white rounded-full text-center shadow-md shadow-gray-600"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex  flex-col w-full items-center mb-6 p-2">
           
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              value={userObject.password2}
              className="h-12 w-3/4 sm:w-[55%] border border-black bg-white rounded-full text-center shadow-md shadow-gray-600"
            />
          </div>

          {/* Authorisation */}
          <div className="w-full flex items-center flex-col gap-4">
            <button className="bg-[#13C3B5] font-semibold text-white h-10 sm:w-1/2 w-1/2 rounded-full hover:text-white hover:bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out">
              Sign Up
            </button>
            <p className="font-semibold text-[#13C3B5] hover:text-black ml-2" onClick={handleLogin}><p className="text-gray-800 sm:inline font-normal">Already have an account? </p>Login</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
