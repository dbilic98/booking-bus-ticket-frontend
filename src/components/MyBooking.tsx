import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchReservation, Reservation } from "../features/mybookingSlice";
import { format } from "date-fns";
import TicketList from "../components/Ticket";
import { Ticket } from "../features/mybookingSlice";

const MyBooking: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reservation = useSelector(
    (state: RootState) => state.reservation.reservation
  ) as Reservation[];
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
  const [showTicketList, setShowTicketList] = useState(false);

  useEffect(() => {
    dispatch(fetchReservation());
  }, [dispatch]);

  const handleDetailsClick = (ticketList: Ticket[]) => {
    setSelectedTickets(ticketList);
    setShowTicketList(true);
  };

  const closeTicketList = () => {
    setShowTicketList(false);
    setSelectedTickets([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-screen h-screen p-4">
        <div className="bg-cream p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg rounded-md w-full h-full">
          <h2 className="text-xl font-bold mb-14">MY BOOKING</h2>

          <div className="bg-light-green font-bold p-3 mb-2 rounded-t-md grid grid-cols-3 gap-3">
            <div className="w-1/2">
              <p className="text-sm">Date of reservation</p>
            </div>
            <div className="w-1/2">
              <p className="text-sm">Status</p>
            </div>
            <div className="w-1/2">
              <p className="text-sm">More</p>
            </div>
          </div>
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div className="space-y-4">
              {reservation.map((reservationItems) => (
                <div
                  key={reservationItems.id}
                  className="bg-white p-4 sm:p-6 shadow rounded-md grid grid-cols-3 gap-3 items-center"
                >
                  <div className="">
                    <p className="text-base">
                      {reservationItems.dateOfReservation
                        ? format(
                            new Date(reservationItems.dateOfReservation),
                            "E d MMM yyyy - HH:mm:ss"
                          )
                        : ""}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-base">{reservationItems.status}</p>
                  </div>
                  <div className="">
                    <button
                      className="border-4 rounded-md"
                      onClick={() =>
                        handleDetailsClick(reservationItems.ticketList)
                      }
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showTicketList && (
            <TicketList tickets={selectedTickets} onClose={closeTicketList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
