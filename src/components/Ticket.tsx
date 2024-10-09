import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservation,
  findPlaceById,
  findRouteById,
  findScheduleById,
  Ticket,
} from "../features/mybookingSlice";
import { fetchPassengerCategories } from "../features/passengerSlice";
import { AppDispatch, RootState } from "../redux/store";
import { fetchAvailableSeats } from "../features/seatsSlice";

interface TicketListProps {
  tickets: Ticket[];
  onClose: () => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const places = useSelector((state: RootState) => state.reservation.places);
  const routes = useSelector((state: RootState) => state.reservation.routes);
  const schedules = useSelector(
    (state: RootState) => state.reservation.schedules
  );
  const passengerCategories = useSelector(
    (state: RootState) => state.passengers.categories
  );
  const seats = useSelector((state: RootState) => state.seats.seats);

  const findPassengerCategoryName = (categoryId: number): string => {
    const category = passengerCategories.find((c) => c.id === categoryId);
    return category ? category.categoryName : "";
  };

  const totalPrice = tickets.reduce((sum, ticket) => sum + ticket.price, 0);

  useEffect(() => {
    dispatch(fetchReservation());
    dispatch(fetchPassengerCategories());

    tickets.forEach((ticket) => {
      if (ticket.oneWayRouteId) {
        dispatch(findRouteById(ticket.oneWayRouteId)).then((action: any) => {
          const startPlaceId = action.payload?.startPlaceId;
          const endPlaceId = action.payload?.endPlaceId;
          if (startPlaceId) dispatch(findPlaceById(startPlaceId));
          if (endPlaceId) dispatch(findPlaceById(endPlaceId));
        });
      }
      if (ticket.returnRouteId) {
        dispatch(findRouteById(ticket.returnRouteId)).then((action: any) => {
          const startPlaceId = action.payload?.startPlaceId;
          const endPlaceId = action.payload?.endPlaceId;
          if (startPlaceId) dispatch(findPlaceById(startPlaceId));
          if (endPlaceId) dispatch(findPlaceById(endPlaceId));
        });
      }

      if (ticket.oneWayScheduleId)
        dispatch(findScheduleById(ticket.oneWayScheduleId));
      if (ticket.returnScheduleId)
        dispatch(findScheduleById(ticket.returnScheduleId));

      if (ticket.oneWayRouteId && ticket.oneWayScheduleId) {
        dispatch(
          fetchAvailableSeats({
            routeId: ticket.oneWayRouteId,
            scheduleId: ticket.oneWayScheduleId,
          })
        );
      }
      if (ticket.returnRouteId && ticket.returnScheduleId) {
        dispatch(
          fetchAvailableSeats({
            routeId: ticket.returnRouteId,
            scheduleId: ticket.returnScheduleId,
          })
        );
      }
    });
  }, [dispatch, tickets]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-80 flex justify-center items-center">
      <div className="bg-cream p-10 rounded-md shadow-md w-5/12 h-full max-h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Ticket List</h2>
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)]">
          {tickets.map((ticket) => {
            const oneWayRoute = routes[ticket.oneWayRouteId];
            const returnRoute = routes[ticket.returnRouteId];
            const oneWaySchedule = schedules[ticket.oneWayScheduleId];
            const returnSchedule = schedules[ticket.returnScheduleId];

            const startPlaceName =
              places[oneWayRoute?.startPlaceId]?.placeName || "";
            const endPlaceName =
              places[oneWayRoute?.endPlaceId]?.placeName || "";
            const returnStartPlaceName =
              places[returnRoute?.endPlaceId]?.placeName || "";
            const returnEndPlaceName =
              places[returnRoute?.startPlaceId]?.placeName || "";

            const oneWaySeat = seats.find(
              (seat) => seat.id === ticket.oneWaySeatId
            );
            const returnSeat = seats.find(
              (seat) => seat.id === ticket.returnSeatId
            );

            return (
              <div
                key={ticket.id}
                className="border border-light-green p-4 rounded-md bg-light-green"
              >
                <p>Price: {ticket.price}€</p>
                <p>
                  One way route: {startPlaceName} / {endPlaceName}
                </p>
                <p>
                  Return route: {returnEndPlaceName} / {returnStartPlaceName}
                </p>
                <p>
                  One way schedule:{" "}
                  {oneWaySchedule
                    ? `${oneWaySchedule.departureTime} - ${oneWaySchedule.arrivalTime}`
                    : "/"}
                </p>
                <p>
                  Return schedule:{" "}
                  {returnSchedule
                    ? `${returnSchedule.departureTime} - ${returnSchedule.arrivalTime}`
                    : "/"}
                </p>
                <p>
                  Passenger category:{" "}
                  {findPassengerCategoryName(ticket.passengerCategoryId)}
                </p>
                <p>One way seat: {oneWaySeat ? oneWaySeat.seatNumber : "/"}</p>
                <p>Return seat: {returnSeat ? returnSeat.seatNumber : "/"}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold">
            Total Price: {totalPrice.toFixed(2)}€
          </h3>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-jet-black text-white rounded-md px-4 py-3 w-36"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
