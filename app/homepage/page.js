"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiClient } from "@/apiClient";


// import GetStartedButton from "@app/components/GetStartedButton";

import HomeButton from "@/app/components/HomeButton";
import ProfileEvents from "../components/ProfileEvents";
import CardContainer from "../components/CardContainer";
import SearchBar from "../components/SearchBar";
import GetStartedButton from "../components/GetStartedButton";


export default function HomePage() {
  const [token, setToken] = useState(null);
  
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
      <div>
      <div className="w-[7%]">
          <GetStartedButton />
        </div>
        <SearchBar />
      <div>
        
             <ProfileEvents client={client} />
           
        </div>  
     
      <div>
        <CardContainer />
      </div>
    </div>
     
    </>
  );
}
