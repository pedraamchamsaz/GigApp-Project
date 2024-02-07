"use client";
import { useEffect, useState } from "react";
import { ApiClient } from "@/apiClient";
import Dashboard from "@/app/dashboard/Dashboard";
import AuthoriseUser from "@/app/components/AuthoriseUser";

export default function Home() {
  const [token, setToken] = useState(null);
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  useEffect(() => {
    console.log("Page Log out")
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
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
      {token ? (
        <Dashboard setToken={setToken} client={client}/>
      ) : (
        <AuthoriseUser loggedIn={(token) => login(token)} client={client} />
      )}
    </>  
  );
}
