import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPlaces } from "../features/placeSlice";
import { AppDispatch } from "../redux/store";
import { GoArrowSwitch } from "react-icons/go";
import "../index.css";

const PlacesSearch: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");

  const [suggestions, setSuggestions] = useState<{ [key: string]: any[] }>({
    from: [],
    to: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "from" | "to"
  ) => {
    const { value } = e.target;
    if (field === "from") {
      setFrom(value);
    } else {
      setTo(value);
    }
    dispatch(fetchPlaces(value)).then((action) => {
      if (fetchPlaces.fulfilled.match(action)) {
        setSuggestions((prev) => ({
          ...prev,
          [field]: action.payload,
        }));
      }
    });
  };

  const handleSuggestionClick = (place: any, field: "from" | "to") => {
    if (field === "from") {
      setFrom(place.placeName);
      setSelectedFrom(place.placeName);
    } else {
      setTo(place.placeName);
      setSelectedTo(place.placeName);
    }
    setSuggestions((prev) => ({
      ...prev,
      [field]: [],
    }));
  };

  return (
    <div className="flex space-x-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="FROM"
          value={from}
          onChange={(e) => handleInputChange(e, "from")}
          className="w-full p-3 border rounded"
        />
        {from && suggestions.from.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
            {suggestions.from.map((place, index) => (
              <li
                key={place.id}
                className={`p-2 border-gray-100 hover:bg-gray-200 cursor-pointer ${
                  index === 0 && place.placeName.startsWith(from)
                    ? "text-gray-700"
                    : "text-gray-400"
                }`}
                onClick={() => handleSuggestionClick(place, "from")}
              >
                {place.placeName}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-center items-center">
        <GoArrowSwitch className="text-1xl text-jet-black-500" />
      </div>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="TO"
          value={to}
          onChange={(e) => handleInputChange(e, "to")}
          className="w-full p-3 border rounded"
        />
        {to && suggestions.to.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
            {suggestions.to.map((place, index) => (
              <li
                key={place.id}
                className={`p-2 hover:bg-gray-200 cursor-pointer ${
                  index === 0 && place.placeName.startsWith(to)
                    ? "text-gray-700"
                    : "text-gray-400"
                }`}
                onClick={() => handleSuggestionClick(place, "to")}
              >
                {place.placeName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlacesSearch;
