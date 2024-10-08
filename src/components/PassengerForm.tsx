import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchPassengerCategories,
  updateSelectedPassengers,
} from "../features/passengerSlice";

const PassengerForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalPassengers, categories, selectedPassengers } = useSelector(
    (state: RootState) => state.passengers
  );

  useEffect(() => {
    dispatch(fetchPassengerCategories());
  }, [dispatch]);

  useEffect(() => {}, [categories, selectedPassengers]);

  const handleIncrement = (categoryName: string) => {
    if (totalPassengers < 8) {
      const discountPercentage =
        categories.find((c) => c.categoryName === categoryName)
          ?.discountPercentage || 0;

      dispatch(
        updateSelectedPassengers({
          categoryName,
          count:
            (selectedPassengers.find((p) => p.categoryName === categoryName)
              ?.count || 0) + 1,
          discountPercentage,
        })
      );
    }
  };

  const handleDecrement = (categoryName: string) => {
    const passenger = selectedPassengers.find(
      (p) => p.categoryName === categoryName
    );

    if (passenger && passenger.count > 0) {
      console.log("Decrementing", categoryName);

      dispatch(
        updateSelectedPassengers({
          categoryName,
          count: passenger.count - 1,
          discountPercentage: passenger.discountPercentage,
        })
      );
    }
  };

  return (
    <form className="max-w-xs mx-auto">
      {categories.map((category) => {
        const passenger = selectedPassengers.find(
          (p) => p.categoryName === category.categoryName
        );
        return (
          <CounterField
            key={category.categoryName}
            label={category.categoryName}
            value={passenger?.count || 0}
            increment={() => handleIncrement(category.categoryName)}
            decrement={() => handleDecrement(category.categoryName)}
            min={0}
            max={10}
            totalPassengers={totalPassengers}
          />
        );
      })}
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
  totalPassengers: number;
}

const CounterField: React.FC<CounterFieldProps> = ({
  label,
  value,
  increment,
  decrement,
  min,
  max,
  totalPassengers,
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
        disabled={value >= max || totalPassengers >= 8}
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
