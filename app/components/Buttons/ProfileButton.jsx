import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProfileButton = () => {
  return (
    <Link href="/">
      <button className="hover:text-black hover:bg-gray-400 px-5 py-1 transition duration-200 ease-in-out sm:mx-auto w-full flex justify-center items-center text-white p-4 font-bold rounded-full bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        Profile
      </button>
    </Link>
  );
};

export default ProfileButton;
