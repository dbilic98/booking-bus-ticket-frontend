import React from "react";
import { useDispatch } from "react-redux";
import { setStartDate, setEndDate } from "../features/dateRangeSlice";

const DateRangePicker: React.FC = () => {
  const dispatch = useDispatch();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStartDate(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndDate(e.target.value));
  };

  const getCurrentDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:space-x-4">
      <div className="relative mb-2 md:mb-0 md:mr-2 w-full md:w-36">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          ></svg>
        </div>
        <input
          name="start"
          type="date"
          className="w-full p-3 border rounded bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="DEPARTURE"
          onChange={handleStartDateChange}
          defaultValue={getCurrentDate()}
        />
      </div>
      <span className="mx-0 md:mx-5 my-2 md:my-0 text-gray-500">to</span>
      <div className="relative mb-2 md:mb-0 w-full md:w-36">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          ></svg>
        </div>
        <input
          name="end"
          type="date"
          className="w-full p-3 border rounded bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="RETURN"
          onChange={handleEndDateChange}
          defaultValue={getCurrentDate()}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
