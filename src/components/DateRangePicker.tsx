import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setStartDate, setEndDate } from "../features/dateRangeSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDateRange } from "react-icons/md";
import "../index.css";

const getCurrentDate = (): Date => {
  return new Date();
};

const DateRangePicker: React.FC = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDateState] = useState<Date | null>(
    getCurrentDate()
  );
  const [endDate, setEndDateState] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDateState(date);
    if (date) {
      dispatch(setStartDate(date.toISOString().split("T")[0]));
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDateState(date);
    if (date) {
      dispatch(setEndDate(date.toISOString().split("T")[0]));
    }
  };

  const CustomDatePickerInput = ({ value, onClick, placeholder }: any) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
        <MdDateRange className="w-4 h-4 text-black-500" />
      </div>
      <input
        type="text"
        className="w-full p-3 pl-8 border rounded bg-gray-50 border-gray-300 text-gray-900 text-sm"
        onClick={onClick}
        value={value || placeholder}
        placeholder="RETURN DATE"
        readOnly
      />
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row items-center">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        dateFormat="yyyy-MM-dd"
        minDate={getCurrentDate()}
        customInput={<CustomDatePickerInput />}
      />
      <span className="mx-0 md:mx-5 my-2 md:my-0 text-jet-black-500">to</span>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        dateFormat="yyyy-MM-dd"
        minDate={startDate || getCurrentDate()}
        customInput={<CustomDatePickerInput />}
      />
    </div>
  );
};

export default DateRangePicker;
