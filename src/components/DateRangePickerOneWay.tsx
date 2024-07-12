import React from "react";
import { useDispatch } from "react-redux";
import { setStartDate as setReduxStartDate } from "../features/dateRangeSlice";
import { MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";

interface DateRangePickerOneWayProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
}

const DateRangePickerOneWay: React.FC<DateRangePickerOneWayProps> = ({
  startDate,
  setStartDate,
}) => {
  const dispatch = useDispatch();

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      dispatch(setReduxStartDate(date.toISOString().split("T")[0]));
    }
  };

  const CustomDatePickerInput = ({ value, onClick }: any) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
        <MdDateRange className="w-4 h-4 text-black-500" />
      </div>
      <input
        type="text"
        className="lg:w-36 md:w-full sm:w-44 p-3 pl-8  border rounded bg-gray-50 border-gray-300 text-gray-900 text-sm"
        onClick={onClick}
        value={value}
        readOnly
      />
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex flex-col">
        <label className="text-black text-xs mb-1">DEPARTURE DATE</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          customInput={<CustomDatePickerInput />}
        />
      </div>
      <span className="text-jet-black-500 mx-0 md:mx-5 my-2 md:my-0">to</span>
      <div className="flex flex-col">
        <label className="text-black text-xs mb-1">RETURN DATE</label>
        <input
          type="text"
          className="lg:w-36 md:w-full sm:w-44 p-3 pl-4 border rounded bg-crem border-gray-300 text-gray-400 text-xs"
          value="ONE WAY ROUTE"
          disabled
        />
      </div>
    </div>
  );
};

export default DateRangePickerOneWay;
