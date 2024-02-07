import React, { useEffect, useState } from "react";

const LogoutButton = ({ setToken }) => {
  const [isOnline, setIsOnline] = useState(true);

  const handleLogout = () => {
    localStorage.setItem("token", undefined);
    setToken(null);
    setIsOnline(false);
  };

  useEffect(() => {
    console.log("Logging out");
  }, [isOnline]);

  return (
    <button
      className=" text-[#2E2E2E] hover:bg-[#DFC2F2] px-4 py-2 rounded transition duration-200 ease-in-out sm:mx-auto w-full flex justify-center items-center text-white p-4 font-bold rounded-lg bg-[#087CA7] hover:text-[#087CA7] hover:bg-[#DFC2F2] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
