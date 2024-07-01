import React, { useState } from "react";
import CounterForm from "../components/CounterForm";
import DateRangePickerRoundtrip from "../components/DateRangePickerRoundtrip";
import DateRangePickerOneWayRoute from "./DateRangePickerOneWay";
import PlacesSearch from "../components/PlacesSearch";

const SearchForm: React.FC<{
  currentDate: string;
  setCurrentDate: (date: string) => void;
}> = ({ currentDate, setCurrentDate }) => {
  const [showCounterForm, setShowCounterForm] = useState(false);
  const [tripType, setTripType] = useState("roundtrip");

  const toggleCounterForm = () => {
    setShowCounterForm(!showCounterForm);
  };

  return (
    <div className="bg-cream p-10 shadow-lg rounded-md w-full max-w-md">
      <div className="flex justify-around mb-8 mr-48">
        <label className="flex items-center space-x-2 cursor-pointer text-xs">
          <input
            type="radio"
            name="tripType"
            value="roundtrip"
            checked={tripType === "roundtrip"}
            onChange={() => setTripType("roundtrip")}
            className="hidden"
          />
          <span
            className={`p-2 rounded-full border-2 ${
              tripType === "roundtrip"
                ? "border-light-green bg-light-green"
                : "border-gray-200 bg-white"
            }`}
          >
            {tripType === "roundtrip" && (
              <span className=" bg-light-green rounded-full"></span>
            )}
          </span>
          <span>Roundtrip</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer text-xs">
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
            className="hidden"
          />
          <span
            className={`p-2 rounded-full border-2 ${
              tripType === "oneway"
                ? "border-light-green bg-light-green"
                : "border-gray-200 bg-white"
            } `}
          >
            {tripType === "oneway" && (
              <span className=" bg-light-green rounded-full"></span>
            )}
          </span>
          <span>One way</span>
        </label>
      </div>

      <form className="space-y-6">
        <div className="flex space-x-4">
          <PlacesSearch />
        </div>

        <div className="w-full p-3 border rounded">
          {tripType === "roundtrip" && <DateRangePickerRoundtrip />}
          {tripType === "oneway" && <DateRangePickerOneWayRoute />}
        </div>

        <div className="w-full p-3 border rounded">
          <button
            type="button"
            onClick={toggleCounterForm}
            className="w-full p-3 border rounded bg-white"
          >
            PASSENGER
          </button>
          {showCounterForm && (
            <div className="mt-1">
              <CounterForm />
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-3 bg-jet-black text-white rounded mt-14"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
