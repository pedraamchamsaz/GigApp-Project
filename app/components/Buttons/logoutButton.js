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
      className="hover:text-black hover:bg-gray-400 px-7 py-1 transition duration-200 ease-in-out sm:mx-auto w-full flex justify-center items-center text-white p-4 font-bold rounded-full bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
