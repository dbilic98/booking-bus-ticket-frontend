import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchReservation, Reservation } from "../features/mybookingSlice";
import { format } from "date-fns";

const Reservations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reservation = useSelector(
    (state: RootState) => state.reservation.reservation
  ) as Reservation[];

  useEffect(() => {
    dispatch(fetchReservation());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      {" "}
      <Sidebar />
      <div className="flex flex-col justify-between md:flex-row md:space-x-8">
        <div className="bg-[#F7F8FA] p-4 ml-10 sm:p-6 md:p-8 lg:p-10 shadow-lg rounded-md w-full md:w-[60vw] h-full">
          <h2 className="text-xl font-bold mb-24">RESERVATION</h2>

          <div className="overflow-x-auto rounded-2xl">
            <div className="bg-[#0C3D2E] text-white font-bold p-3 mb-2 rounded-t-md grid grid-cols-3 gap-10">
              <div className="w-1/2">
                <p className="text-sm">Date of reservation</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">Status</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">User</p>
              </div>
            </div>
            <div className="space-y-4">
              {reservation.map((reservationItems) => (
                <div
                  key={reservationItems.id}
                  className="bg-white p-4 sm:p-6 shadow rounded-md grid grid-cols-3 gap-10 items-center"
                >
                  <p className="text-base">
                    {reservationItems.dateOfReservation
                      ? format(
                          new Date(reservationItems.dateOfReservation),
                          "E d MMM yyyy - HH:mm:ss"
                        )
                      : ""}
                  </p>
                  <p className="text-base">{reservationItems.status}</p>
                  <p className="text-base">
                    {reservationItems.firstName +
                      " " +
                      reservationItems.lastName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reservations;
