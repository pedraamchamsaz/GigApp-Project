import React from 'react';
import Link from "next/link";

const HomeButton = () => {
  return (
    <Link href="/homepage">
      <button className="text-white px-4 py-2 hover:text-[#13C3B5] sm:mx-auto w-full p-4 font-semibold">
        Home
      </button>
  </Link>
  )
}

export default HomeButton