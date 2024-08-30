import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRoutes, SearchParams } from "../features/routesSlice";
import { AppDispatch } from "../redux/store";
import { Place } from "../features/placesSlice";
import { format } from "date-fns";
import PassengerForm from "./PassengerForm";
import DateRangePickerRoundtrip from "./DateRangePickerRoundtrip";
import DateRangePickerOneWayRoute from "./DateRangePickerOneWay";
import PlacesSearch from "./PlacesSearch";
import { useSelector } from "react-redux";
import { selectTotalSelectedPassengers } from "../features/passengerSlice";

const SearchForm: React.FC<{
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}> = ({ currentDate, setCurrentDate }) => {
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [startPlace, setStartPlace] = useState<Place | null>(null);
  const [endPlace, setEndPlace] = useState<Place | null>(null);
  const [startDate, setStartDate] = useState<Date>(currentDate);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (startPlace && endPlace && startDate) {
      let searchParams: SearchParams = {
        startPlaceId: startPlace.id,
        endPlaceId: endPlace.id,
        scheduleDate: format(startDate, "yyyy-MM-dd"),
      };

      if (tripType === "roundtrip" && endDate) {
        searchParams.endScheduleDate = format(endDate, "yyyy-MM-dd");
      }

      dispatch(fetchRoutes(searchParams));
      navigate("/route-view", {
        state: { searchParams, startPlace, endPlace, tripType },
      });
    }
  };

  const handlePlaceSelect = (field: "from" | "to", place: Place) => {
    if (field === "from") {
      setStartPlace(place);
    } else {
      setEndPlace(place);
    }
  };

  const toggleCounterForm = () => {
    setShowPassengerForm(!showPassengerForm);
  };

  const totalPassengers = useSelector(selectTotalSelectedPassengers);

  const isSearchDisabled = () => {
    return (
      totalPassengers === 0 ||
      (tripType === "roundtrip" && (!startDate || !endDate))
    );
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

      <form className="space-y-6" onSubmit={handleSearch}>
        <div className="flex space-x-4">
          <PlacesSearch placeSelect={handlePlaceSelect} />
        </div>

        <div className="w-full p-3 border rounded">
          {tripType === "roundtrip" && (
            <DateRangePickerRoundtrip
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          )}
          {tripType === "oneway" && (
            <DateRangePickerOneWayRoute
              startDate={startDate}
              setStartDate={setStartDate}
            />
          )}
        </div>

        <div className="w-full p-3 border rounded">
          <button
            type="button"
            onClick={toggleCounterForm}
            className="w-full p-3 border rounded bg-white"
          >
            PASSENGER
          </button>
          {showPassengerForm && (
            <div className="mt-1">
              <PassengerForm />
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-3 bg-jet-black text-white rounded mt-14"
            disabled={isSearchDisabled()}
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
