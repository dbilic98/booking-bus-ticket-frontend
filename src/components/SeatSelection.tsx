import React, { useState } from "react";
import Navbar from "./Navbar";
import { CgArrowLongDownC } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { Place } from "../features/placesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  calculateTotalPrice,
  formatPassengerSelection,
} from "../features/passengerSlice";
import { SearchParams } from "../features/routesSlice";
import { format, parseISO } from "date-fns";
import { fetchAvailableSeats } from "../features/seatsSlice";
import { AppDispatch } from "../redux/store";
import { Seat } from "../features/seatsSlice";
import { proceedToPayment } from "../features/payment/paymentSlice";

const SeatSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const startPlace = location.state?.startPlace as Place;
  const endPlace = location.state?.endPlace as Place;
  const searchParams = location.state?.searchParams as SearchParams;
  const tripType = location.state?.tripType as "roundtrip" | "oneway";
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);

  const seats = useSelector((state: RootState) => state.seats.seats);

  const formattedDate = format(
    parseISO(searchParams.scheduleDate),
    "EEE d MMM yyyy"
  );
  const formattedEndScheduleDate = searchParams.endScheduleDate
    ? format(parseISO(searchParams.endScheduleDate), "EEE d MMM yyyy")
    : null;

  const selectedRoute = useSelector(
    (state: RootState) => state.routes.selectedRoute
  );

  const selectedReturnRoute = useSelector(
    (state: RootState) => state.returnRoutes.selectedReturnRoute
  );

  const { selectedPassengers } = useSelector(
    (state: RootState) => state.passengers
  );

  const formattedSelection = formatPassengerSelection(selectedPassengers);

  const oneWayPrice = selectedRoute
    ? calculateTotalPrice(selectedPassengers, selectedRoute.basePrice)
    : 0;

  const returnPrice =
    tripType === "roundtrip" && selectedRoute && selectedReturnRoute
      ? calculateTotalPrice(selectedPassengers, selectedReturnRoute.basePrice)
      : 0;

  const totalPrice =
    tripType === "roundtrip" ? oneWayPrice + returnPrice : oneWayPrice;

  const hasReturnRoute = !!selectedReturnRoute;

  const totalSeatsNeeded = selectedPassengers.reduce(
    (sum, passenger) => sum + passenger.count,
    0
  );

  React.useEffect(() => {
    if (selectedRoute?.id && selectedRoute.scheduleId) {
      dispatch(
        fetchAvailableSeats({
          routeId: selectedRoute.id,
          scheduleId: selectedRoute.scheduleId,
        })
      );
    }
  }, [dispatch, selectedRoute]);

  const handleSeatSelect = (seatNumber: number) => {
    const seat = seats.find((s: Seat) => s.seatNumber === seatNumber);
    if (
      seat &&
      (selectedSeatIds.length < totalSeatsNeeded ||
        selectedSeatIds.includes(seat.id))
    ) {
      setSelectedSeatIds((prevSelectedSeatIds) =>
        prevSelectedSeatIds.includes(seat.id)
          ? prevSelectedSeatIds.filter((id) => id !== seat.id)
          : [...prevSelectedSeatIds, seat.id]
      );
    }
  };

  const handleContinueClick = () => {
    const orderData = selectedPassengers.map((passenger) => {
      const price = selectedRoute
        ? calculateTotalPrice([passenger], selectedRoute.basePrice)
        : 0;
      return {
        productName: passenger.categoryName,
        price,
        quantity: passenger.count,
      };
    });

    dispatch(proceedToPayment({ orderData }));

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatIds));
    navigate("/create-checkout-session");
  };

  const row1 = Array.from({ length: 10 }, (_, i) => i + 1);
  const row2 = Array.from({ length: 10 }, (_, i) => i + 11);
  const row3 = Array.from({ length: 10 }, (_, i) => i + 21);
  const row4 = Array.from({ length: 10 }, (_, i) => i + 31);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-light-green p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
        <div className="flex flex-col md:flex-row">
          <div className="bg-cream p-1 sm:p-2 md:p-4 lg:p-6 shadow-lg rounded-md w-full md:w-[50vw] h-[80vh]">
            <h2 className="font-bold">SEAT RESERVATION</h2>
            <table className="mt-6">
              <tbody>
                <tr>
                  <td className="nedostupna">
                    <div className="w-5 h-5 bg-gray-500 rounded-full mr-1"></div>
                  </td>
                  <td>
                    <span className="mr-7"> Unavailable seat</span>
                  </td>
                  <td className="slobodno">
                    <div className="w-5 h-5 bg-light-green rounded-full mr-1"></div>
                  </td>
                  <td>
                    <span className="mr-7">Free seat</span>
                  </td>
                  <td className="izabrano">
                    <div className="w-5 h-5 bg-amber-500 rounded-full mr-1"></div>
                  </td>
                  <td>
                    <span className="mr-7">The seat you selected </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-20 border-2 p-6 border-gray-200">
              <div className="p-4">
                <div className="grid grid-cols-10 gap-4">
                  {/* First row of seats */}
                  {row1.map((number) => {
                    const seat = seats.find(
                      (s: Seat) => s.seatNumber === number
                    );
                    const isFree = seat ? seat.free : false;
                    const isSelected =
                      seat && selectedSeatIds.includes(seat.id);

                    return (
                      <div
                        key={number}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
                          isSelected
                            ? "bg-amber-500"
                            : isFree
                            ? "bg-light-green"
                            : "bg-gray-500"
                        }`}
                        onClick={() => isFree && handleSeatSelect(number)}
                        style={{ cursor: isFree ? "pointer" : "not-allowed" }}
                      >
                        {number}
                      </div>
                    );
                  })}

                  {/* Second row of seats */}
                  {row2.map((number) => {
                    const seat = seats.find(
                      (s: Seat) => s.seatNumber === number
                    );
                    const isFree = seat ? seat.free : false;
                    const isSelected =
                      seat && selectedSeatIds.includes(seat.id);

                    return (
                      <div
                        key={number}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
                          isSelected
                            ? "bg-amber-500"
                            : isFree
                            ? "bg-light-green"
                            : "bg-gray-500"
                        }`}
                        onClick={() => isFree && handleSeatSelect(number)}
                        style={{ cursor: isFree ? "pointer" : "not-allowed" }}
                      >
                        {number}
                      </div>
                    );
                  })}

                  {/* Separator */}
                  <div className="col-span-10 h-10 bg-gray-300"></div>

                  {/* Third row of seats */}
                  {row3.map((number) => {
                    const seat = seats.find(
                      (s: Seat) => s.seatNumber === number
                    );
                    const isFree = seat ? seat.free : false;
                    const isSelected =
                      seat && selectedSeatIds.includes(seat.id);
                    return (
                      <div
                        key={number}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
                          isSelected
                            ? "bg-amber-500"
                            : isFree
                            ? "bg-light-green"
                            : "bg-gray-500"
                        }`}
                        onClick={() => isFree && handleSeatSelect(number)}
                        style={{ cursor: isFree ? "pointer" : "not-allowed" }}
                      >
                        {number}
                      </div>
                    );
                  })}

                  {/* Fourth row of seats */}
                  {row4.map((number) => {
                    const seat = seats.find(
                      (s: Seat) => s.seatNumber === number
                    );
                    const isFree = seat ? seat.free : false;
                    const isSelected =
                      seat && selectedSeatIds.includes(seat.id);

                    return (
                      <div
                        key={number}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
                          isSelected
                            ? "bg-amber-500"
                            : isFree
                            ? "bg-light-green"
                            : "bg-gray-500"
                        }`}
                        onClick={() => isFree && handleSeatSelect(number)}
                        style={{ cursor: isFree ? "pointer" : "not-allowed" }}
                      >
                        {number}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3 w-full md:w-[25vw] md:ml-48">
            <div className="bg-cream p-1 sm:p-1 md:p-2 lg:p-4 rounded-md">
              <h2 className="font-bold mb-1 text-xs text-center">
                YOUR BOOKING
              </h2>
              <div className="flex items-center space-x-1">
                <p className="text-ml font-bold text-black pb-1">
                  {formattedDate}
                </p>
              </div>
              <div>
                {selectedRoute && (
                  <div className="border border-gray-300 p-2 rounded-md">
                    <p className="mb-1">
                      <span className="font-bold">
                        {selectedRoute.departureTime}
                      </span>{" "}
                      {startPlace.placeName}
                      {" bus station "}
                    </p>
                    <div className="flex ml-4 mb-2">
                      <CgArrowLongDownC />
                    </div>
                    <p>
                      <span className="font-bold">
                        {selectedRoute.arrivalTime}
                      </span>{" "}
                      {endPlace.placeName}
                      {" bus station"}
                    </p>
                  </div>
                )}

                <p className="font-bold pt-4">PASSENGER: </p>
                <p className="font-thin">
                  {formattedSelection.map((part, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <span className="font-bold text-black"> | </span>
                      )}
                      {part}
                    </React.Fragment>
                  ))}
                </p>
                <div className="bg-jet-black p-1 mt-4"></div>
                <div className="flex justify-between items-center">
                  <p className="font-bold">PRICE:</p>
                  <p className="text-base font-bold">
                    {oneWayPrice.toFixed(2)} €
                  </p>
                </div>
              </div>
            </div>

            {hasReturnRoute && (
              <div className="bg-cream p-1 sm:p-1 md:p-2 lg:p-4 rounded-md">
                <div className="flex items-center space-x-1">
                  <p className="text-ml font-bold text-black pb-1">
                    {formattedEndScheduleDate}
                  </p>
                </div>
                <div>
                  {selectedReturnRoute && (
                    <div className="border border-gray-300 p-2 rounded-md">
                      <p className="mb-1">
                        <span className="font-bold">
                          {selectedReturnRoute.departureTime}
                        </span>{" "}
                        {endPlace.placeName}
                        {" bus station "}
                      </p>
                      <div className="flex ml-4 mb-2">
                        <CgArrowLongDownC />
                      </div>
                      <p>
                        <span className="font-bold">
                          {selectedReturnRoute.arrivalTime}
                        </span>{" "}
                        {startPlace.placeName}
                        {" bus station"}
                      </p>
                    </div>
                  )}

                  <p className="font-bold pt-4">PASSENGER: </p>
                  <p className="font-thin">
                    {formattedSelection.map((part, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && (
                          <span className="font-bold text-black"> | </span>
                        )}
                        {part}
                      </React.Fragment>
                    ))}
                  </p>
                  <div className="bg-jet-black p-1 mt-4"></div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">PRICE:</p>
                    <p className="text-base font-bold">
                      {returnPrice.toFixed(2)} €
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-cream p-1 sm:p-1 md:p-2 lg:p-4 rounded-md">
              <div className="flex justify-between items-center">
                <p className="font-bold">TOTAL PRICE:</p>
                <p className="text-lg font-bold">{totalPrice.toFixed(2)} €</p>
              </div>
            </div>
            <div className="bg-jet-black p-2 text-white rounded flex justify-center items-center">
              <button onClick={handleContinueClick} type="submit">
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
