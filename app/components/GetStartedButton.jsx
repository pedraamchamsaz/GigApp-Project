import React, { useEffect, useState } from "react";
import Link from "next/link";

const GetStartedButton = () => {
  return (
    <Link href="/">
      <button className="text-[#2E2E2E] hover:bg-gray-400 px-4 py-2 rounded transition duration-200 ease-in-out sm:mx-auto w-full flex justify-center items-center text-white p-4 font-bold rounded-full bg-[#534A4A] hover:text-white hover:bg-[#DFC2F2] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out">
        Profile
      </button>
    </Link>
  );
};

export default GetStartedButton;
