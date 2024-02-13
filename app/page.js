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
      {/* Video Background */}

      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover fixed inset-0 z-0"
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative">
        <div className="flex justify-between items-center">
          <div className="relative z-10">
            <img
              src="./assets/images/Logowhite.png"
              alt="Logo"
              className="w-15 h-20 fixed top-0 left-0 m-4"
            />
            <h1 className="text-white ml-12">
              Gig<b>nite</b>
            </h1>
          </div>
          <div className="flex flex-row gap-2">
            <HomeButton />
            <>
              {token ? (
                <Profile setToken={setToken} client={client} />
              ) : (
                <>
                  <div>
                    <button
                      className="text-white px-4 py-2 hover:text-[#13C3B5] sm:mx-auto w-full  text-white p-4 font-semibold"
                      onClick={() => setShowPopup(true)}
                    >
                      Sign In
                    </button>
                  </div>
                  <div>
                    <button
                      className="text-[#2E2E2E] hover:text-black hover:bg-gray-400 px-5 py-1 rounded transition duration-200 ease-in-out sm:mx-auto w-full flex justify-center items-center text-white p-4 font-bold rounded-full bg-[#534A4A] hover:bg-[#DFC2F2] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-outd"
                      onClick={() => setShowPopup(true)}
                    >
                      Get Started
                    </button>
                  </div>
                  {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center">
                      <div className="p-8 rounded-lg bg-white">
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
        <p className="text-white text-8xl mt-[12%] ml-20">
          Stay <p className="font-bold inline text-[#0C687B]">Tuned.</p>
        </p>
        <p className="text-black text-xl mt-[2%] ml-20">
          "Discover, Navigate, Groove - Your Guide to Entertainment Everywhere"
        </p>
        <Link href="/homepage">
          <button className="mt-[5%] ml-20 text-[#2E2E2E] bg-[#13C3B5] hover:text-black hover:bg-gray-400 px-5 py-2 rounded transition duration-200 ease-in-out text-white p-4 font-bold rounded-full hover:bg-[#DFC2F2] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-outd">
            Start Searching
          </button>
        </Link>
      </div>
    </>
  );
}
