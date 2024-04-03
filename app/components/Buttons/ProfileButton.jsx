import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProfileButton = () => {
  return (
    <Link href="/">
      <button>
        <img className="h-14 w-14" src="assets/images/profile2.png" alt="" />
      </button>
    </Link>
  );
};

export default ProfileButton;
