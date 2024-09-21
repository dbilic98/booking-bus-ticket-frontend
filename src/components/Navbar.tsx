import React from "react";
import LogOut from "../auth/Logout";

const Header: React.FC = () => {
  return (
    <header className="bg-light-green flex justify-between items-center">
      <h1 className="text-xl font-bold pl-8">BMS</h1>

      <nav className="flex-1 ml-[20%] flex space-x-20">
        <a href="/home" className="hover:underline">
          HOME
        </a>
        <a href="/mybooking" className="hover:underline">
          MY BOOKING
        </a>
        <a href="/about" className="hover:underline">
          ABOUT
        </a>
      </nav>
      <nav className="bg-jet-black text-white p-4 flex basis-2/5 ">
        <a href="/login" className="flex-1 ml-[80%]">
          <LogOut />
        </a>
      </nav>
    </header>
  );
};

export default Header;
