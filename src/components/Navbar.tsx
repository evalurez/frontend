import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <ul className="flex justify-between items-center py-4 px-6 rounded-lg w-full text-3xl">
      {" "}
      <Link href="/">
        <h1>
          <Image
            src="/new.png"
            alt="Company Logo"
            width={180}
            height={100}
            priority
            className="-mt-2"
            style={{ height: "auto" }}
          />
        </h1>
      </Link>
      <div className="flex gap-10 items-center">
        <Link href="/dashboard">
          <li className="text-base">Dashboard</li>
        </Link>
        <Link href="/login">
          <li className="text-base">Login</li>
        </Link>
        <Link href="/register">
          <li className="text-base">
            <span className="bg-purple-500 text-white px-2 py-1 rounded-lg">
              Register
            </span>
          </li>
        </Link>
      </div>
    </ul>
  );
};

export default Navbar;
