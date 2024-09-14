import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-[#F7F8FA] flex flex-col items-center w-64 p-20 rounded-3xl min-h-screen">
      <h1 className="text-3xl font-bold mb-20 text-center text-[#0C3D2E]">
        BMS.
      </h1>

      <nav className="flex flex-col gap-4 justify-center">
        <a
          href="/admin"
          className="text-lg font-medium text-[#333333] hover:bg-[#0C3D2E] hover:text-white focus:bg-[#0C3D2E] focus:text-white py-3 px-16 rounded-xl"
        >
          Dashboard
        </a>
        <a
          href="/admin/company"
          className="text-lg font-medium text-[#333333] hover:bg-[#0C3D2E] hover:text-white focus:bg-[#0C3D2E] focus:text-white py-3 px-16 rounded-xl"
        >
          Company
        </a>
        <a
          href="/admin/bus"
          className="text-lg font-medium text-[#333333] hover:bg-[#0C3D2E] hover:text-white focus:bg-[#0C3D2E] focus:text-white py-3 px-16 rounded-xl"
        >
          Bus
        </a>
        <a
          href="/admin/route"
          className="text-lg font-medium text-[#333333] hover:bg-[#0C3D2E] hover:text-white focus:bg-[#0C3D2E] focus:text-white py-3 px-16 rounded-xl
          "
        >
          Route
        </a>
        <a
          href="/admin/schedule"
          className="text-lg font-medium text-[#333333] hover:bg-[#0C3D2E] hover:text-white focus:bg-[#0C3D2E] focus:text-white py-3 px-16 rounded-xl"
        >
          Schedule
        </a>
      </nav>

      <div className="mt-auto pt-10">
        <a href="/admin/logout" className="text-center text-base text-black">
          Log out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
