"use client";
// import { useEffect, useState } from "react";
import Link from 'next/link';
import SearchBar from "./components/SearchBar";
// import { ApiClient } from "@/apiClient";
// import Dashboard from "@/app/dashboard/dashboard";
// import AuthoriseUser from "@/app/components/AuthoriseUser";
// import GetStartedButton from "@app/components/GetStartedButton";



export default function Home() {
  // const [token, setToken] = useState(null);
  // const client = new ApiClient(
  //   () => token,
  //   () => logout()
  // );

  // useEffect(() => {
  //   console.log("Page Log out")
  // }, [token]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setToken(token);
  //   } // if !token, redirect to landing page
  // }, []);

  // const login = (token) => {
  //   localStorage.setItem("token", token);
  //   setToken(token);
  // };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setToken(null);
  // };
  

  return (
    // <>
    //   {token ? (
    //     <Dashboard setToken={setToken} client={client}/>
    //   ) : (
    //     <AuthoriseUser loggedIn={(token) => login(token)} client={client} />

    //   )}
    // </> 
   <div className="bg-black h-screen">
    <Link href='/homepage'>
            <button
               className='text-white  font-bold rounded-lg uppercase text-sm px-2 py-2.5 text-center me-2 mb-2'>Home</button>
          </Link>

          {/* <SearchBar /> */}
    </div>
  );
}

