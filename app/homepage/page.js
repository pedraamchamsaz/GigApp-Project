"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiClient } from "@/apiClient";
import AuthoriseUser from "@/app/components/AuthoriseUser";

// import GetStartedButton from "@app/components/GetStartedButton";
import Profile from "../profile/profile";
import { GrClose } from "react-icons/gr";
import HomeButton from "@/app/components/HomeButton";
import ProfileEvents from "../components/ProfileEvents";
import Card from "../components/Card";
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
          {token ? ( 
             <ProfileEvents setToken={setToken} client={client} />
           
           ) : ( 
            <p className="text-bold text-center">Please Log in or Sign up to see more local events</p>
           )} 
        </div>  
     
      <div>
        <CardContainer />
      </div>
    </div>
     
    </>
  );
}
