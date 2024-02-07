"use client";

import { useState, useEffect } from "react";

const SignIn = ({setAuthProcess, submitHandler}) => {
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Signing in user")
      await submitHandler(e);

    } catch (error) {
      console.error(error);
      alert("Wrong username or password.")
      console.error("Failure signing in user");
    }
  };

  const handleSignUp = () => {
    setAuthProcess(true);
    console.log("Sign Up");
  };

  return (
    <div className="h-1/2 sm:w-1/4 w-2/3 border-4 border-solid border-[#087CA7] rounded-lg shadow-lg bg-slate-200 shadow-lg shadow-black">
      <form
        onSubmit={handleLogin}
        className="flex h-full w-full gap-6 justify-center items-center"
      >
        <div className="flex w-full flex-col justify-center items-center">
          {/* Username */}
          <div className="flex flex-col w-full h-1/2 items-center p-2 ">
            <label for="username" className="font-semibold">Username</label>
            <input
              type="text"
              name="username"
              className="h-12 w-3/4 text-center bg-white rounded-lg"
            />
          </div>
          {/* Passwords */}
          <div className="flex flex-col gap-4x w-full items-center mb-12 ">
            <label for="password" className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="h-12 w-3/4 text-center bg-white rounded-lg"
            />
          </div>

          {/* Authorisation */}
          <div className="w-full flex items-center flex-col gap-4">
            <button className="bg-[#087CA7] font-semibold text-white h-10 sm:w-1/2 w-1/2 rounded-lg hover:text-[#087CA7] hover:bg-[#DFC2F2] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out">
              Login
            </button>
            <a className="font-semibold hover:text-cCerulean" onClick={handleSignUp}>Sign Up?</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
