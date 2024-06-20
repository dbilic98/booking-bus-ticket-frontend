import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-yellow flex justify-between items-center">
      <h1 className="text-xl font-bold pl-8">BMS</h1>

      <nav className="flex-1 ml-[20%] flex space-x-20">
        <a href="#" className="hover:underline">
          HOME
        </a>
        <a href="#" className="hover:underline">
          MY BOOKING
        </a>
        <a href="#" className="hover:underline">
          ABOUT
        </a>
      </nav>
      <nav className="bg-jet-black text-white p-4 flex basis-2/5 ">
        <a href="#" className="flex-1 ml-[80%]">
          LOG OUT
        </a>
      </nav>
    </header>
  );
};

export default Header;
