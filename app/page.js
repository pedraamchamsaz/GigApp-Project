"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiClient } from "@/apiClient";

import AuthoriseUser from "@/app/components/AuthoriseUser";

// import GetStartedButton from "@app/components/GetStartedButton";
import Profile from "./profile/profile";
import { GrClose } from "react-icons/gr";
import HomeButton from "@/app/components/HomeButton";




export default function Home() {
  const [token, setToken] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  useEffect(() => {
    console.log("Page Log out");
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } // if !token, redirect to landing page
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover fixed inset-0 z-0"
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative w-screen h-screen p-8">

        {/* navbar */}
        <div className="flex justify-between items-center">

        {/* logo */}
          <div className="z-10">
            <img
              src="./assets/images/Logowhite.png"
              alt="Logo"
              className="w-10 h-14 sm:w-14 sm:h-20 fixed top-4 left-4"
            />
            <h1 className="text-white ml-8 sm:ml-12">
              Gig<b>nite</b>
            </h1>
          </div>

          {/* buttons */}
          <div className="flex flex-row sm:gap-2 text-sm sm:text-base">
            <HomeButton />
            <>
              {token ? (
                <Profile setToken={setToken} client={client} />
              ) : (
                <>
                  <button
                    className="text-sm sm:text-base hover:text-black hover:bg-gray-400 px-5 py-1 transition duration-200 ease-in-out sm:mx-auto w-full flex justify-center items-center text-white font-bold rounded-full bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    onClick={() => setShowPopup(true)}
                  >
                    Get Started
                  </button>

                  {/* login */}
                  {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center">
                      <div className="p-8 rounded-lg">
                        <button
                          className="absolute top-0 right-0 mr-10 mt-10 text-white"
                          onClick={() => setShowPopup(false)}
                        >
                          <GrClose />
                        </button>
                        <AuthoriseUser
                          loggedIn={(token) => login(token)}
                          client={client}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          </div>
        </div>

        {/* text */}
        <div className="text-white text-8xl mt-40 sm:mt-[12%] sm:ml-20">
          Stay <p className="font-bold inline text-[#0C687B]">Tuned.</p>
        </div>
        <p className="text-black text-xl mt-10 sm:mt-[2%] sm:ml-20 w-full">
          "Discover, Navigate, Groove - Your Guide to Entertainment Everywhere"
        </p>
        <Link href="/homepage">
          <button className="mt-10 sm:mt-[5%] sm:ml-20 bg-[#13C3B5] hover:text-black hover:bg-gray-400 px-5 py-2 transition duration-200 ease-in-out text-white p-4 font-bold rounded-full focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            Start Searching
          </button>
        </Link>
      </div>
    </>
  );
}
