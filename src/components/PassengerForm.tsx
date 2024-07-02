import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { increment, decrement } from "../features/passengerSlice";

const PassengerForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { child, adult, student } = useSelector(
    (state: RootState) => state.passenger
  );

  const handleIncrement = (field: keyof RootState["passenger"]) => {
    dispatch(increment(field));
  };

  const handleDecrement = (field: keyof RootState["passenger"]) => {
    dispatch(decrement(field));
  };

  return (
    <form className="max-w-xs mx-auto">
      <CounterField
        label="Child"
        value={child}
        increment={() => handleIncrement("child")}
        decrement={() => handleDecrement("child")}
        min={0}
        max={20}
      />
      <CounterField
        label="Adult"
        value={adult}
        increment={() => handleIncrement("adult")}
        decrement={() => handleDecrement("adult")}
        min={1}
        max={30}
      />
      <CounterField
        label="Student"
        value={student}
        increment={() => handleIncrement("student")}
        decrement={() => handleDecrement("student")}
        min={0}
        max={30}
      />
    </form>
  );
};

interface CounterFieldProps {
  label: string;
  value: number;
  increment: () => void;
  decrement: () => void;
  min: number;
  max: number;
}

const CounterField: React.FC<CounterFieldProps> = ({
  label,
  value,
  increment,
  decrement,
  min,
  max,
}) => {
  return (
    <div className="relative flex items-center mb-2">
      <button
        type="button"
        onClick={decrement}
        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        disabled={value <= min}
      >
        <svg
          className="w-3 h-3 text-gray-900 dark:text-white"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="text"
        className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        value={value}
        readOnly
      />
      <div className="absolute bottom-1 start-1/2 -translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
        <span>{label}</span>
      </div>
      <button
        type="button"
        onClick={increment}
        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        disabled={value >= max}
      >
        <svg
          className="w-3 h-3 text-gray-900 dark:text-white"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default PassengerForm;
