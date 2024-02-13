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
     
      {/* <img src='./assets/images/Logoblack.png'></img> */}
      <div className="bg-green-200 flex justify-between items-center px-4 py-2">
        <HomeButton />
        <>
          {token ? (
            <Profile setToken={setToken} client={client} />
          ) : (
            <>
              <div>
                <button
                  className="text-white hover:text-[#13C3B5] w-full text-white p-4 font-bold"
                  onClick={() => setShowPopup(true)}
                >
                  Sign In
                </button>
                <button
                  className="text-white hover:text-[#13C3B5] w-full text-white p-4 font-bold"
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
    </>
  );
}
