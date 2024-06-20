import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import "./index.css";

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex bg-yellow">
        <div className="bg-yellow w-1/2 p-8 flex flex-col justify-center items-start space-y-8">
          <div className="font-mono">
            <h1 className="text-5xl font-bold pl-8">BUS</h1>
            <h1 className="text-5xl font-bold pl-8">MANAGEMENT</h1>
            <h1 className="text-5xl font-bold pl-8">SYSTEM</h1>
          </div>

          <p className="pl-8 font-mallanna">
            Welcome to our bus management platform! Here you can easily search
            for available places, <hr></hr> book tickets and plan your trip. Our
            mission is to make your trip as pleasant and stress-free as
            possible. <hr></hr>
            <p className="mt-1">We wish you a happy journey!</p>
          </p>
        </div>
        <div className="bg-cream w-5/12 flex justify-center items-center">
          <SearchForm
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
