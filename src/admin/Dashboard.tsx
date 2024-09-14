import React from "react";
import Sidebar from "./Sidebar";
import { BarChartOnValueChange } from "./BarChartOnValueChange";
import { FaUserAlt } from "react-icons/fa";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow p-20 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center pb-10">
            <FaUserAlt />
            <div className="ml-3">
              <p className="font-semibold">Admin</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-6">Home / Dashboard</p>
        <div className="grid grid-cols-3 gap-12 mt-12 text-white">
          <div className="bg-[#0C3D2E] p-8 rounded-3xl">
            <h2 className="text-xl font-semibold mb-4">Bus</h2>
            <p className="text-3xl">10</p>
          </div>
          <div className="bg-[#0C3D2E] p-8 rounded-3xl">
            <h2 className="text-xl font-semibold mb-4">Company</h2>
            <p className="text-3xl">3</p>
          </div>
          <div className="bg-[#0C3D2E] p-8 rounded-3xl">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <p className="text-3xl">4</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="bg-[#F7F8FA] rounded-lg p-5 mt-16"></div>
        </div>
        <div className="flex mt-8 space-x-8">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Graph</h2>
            <div className="ml-[50px]">
              <BarChartOnValueChange />
            </div>
          </div>
          <div className="flex w-80 bg-[#F7F8FA] p-10">
            <p>
              The dark green bars labeled "Y" represent the number of registered
              users for each month. This indicates how many new users signed up
              during each corresponding month. The yellow bars labeled "X"
              represent the number of bus tickets purchased within each month.
              This tracks the total number of ticket sales during that time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
