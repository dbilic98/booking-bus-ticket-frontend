import React, { useState } from "react";
import CounterForm from "../components/CounterForm";
import DateRangePicker from "../components/DateRangePicker";

const SearchForm: React.FC<{
  currentDate: string;
  setCurrentDate: (date: string) => void;
}> = ({ currentDate, setCurrentDate }) => {
  const [showCounterForm, setShowCounterForm] = useState(false);

  const toggleCounterForm = () => {
    setShowCounterForm(!showCounterForm);
  };

  return (
    <div className="bg-cream p-10 shadow-lg rounded-md w-full max-w-md">
      <form className="space-y-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="FROM"
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            placeholder="TO"
            className="w-full p-3 border rounded"
          />
        </div>
        <div className="w-full p-3 border rounded">
          <DateRangePicker />
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
