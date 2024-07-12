import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPlaces } from "../features/placesSlice";
import { AppDispatch } from "../redux/store";
import { GoArrowSwitch } from "react-icons/go";
import { Place } from "../features/placesSlice";
import "../index.css";

interface PlacesSearchProps {
  placeSelect: (field: "from" | "to", place: Place) => void;
}

const PlacesSearch: React.FC<PlacesSearchProps> = ({ placeSelect }) => {
  const dispatch: AppDispatch = useDispatch();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [selectedFrom, setSelectedFrom] = useState<Place | null>(null);
  const [selectedTo, setSelectedTo] = useState<Place | null>(null);

  const [suggestions, setSuggestions] = useState<{ [key: string]: Place[] }>({
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
          [field]: action.payload as Place[],
        }));
      }
    });
  };

  const handleSuggestionClick = (place: Place, field: "from" | "to") => {
    if (field === "from") {
      setFrom(place.placeName);
      setSelectedFrom(place);
    } else {
      setTo(place.placeName);
      setSelectedTo(place);
    }
    setSuggestions((prev) => ({
      ...prev,
      [field]: [],
    }));
    placeSelect(field, place);
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
        {from &&
          suggestions.from.length > 0 &&
          (() => {
            const elements: JSX.Element[] = [];
            suggestions.from.forEach((place: Place, index: number) => {
              elements.push(
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
              );
            });
            return (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
                {elements}
              </ul>
            );
          })()}
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
        {to &&
          suggestions.to.length > 0 &&
          (() => {
            const elements: JSX.Element[] = [];
            suggestions.to.forEach((place: Place, index: number) => {
              elements.push(
                <li
                  key={place.id}
                  className={`p-2 border-gray-100 hover:bg-gray-200 cursor-pointer ${
                    index === 0 && place.placeName.startsWith(to)
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleSuggestionClick(place, "to")}
                >
                  {place.placeName}
                </li>
              );
            });
            return (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
                {elements}
              </ul>
            );
          })()}
      </div>
    </div>
  );
};

export default PlacesSearch;
