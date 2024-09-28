import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { proceedToPayment } from "../features/payment/paymentSlice";
import { confirmPayment } from "../features/payment/successSlice";

const ProceedToPayment: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("token");

  const selectedPassengers = useSelector(
    (state: RootState) => state.passengers.selectedPassengers
  );
  const categories = useSelector(
    (state: RootState) => state.passengers.categories
  );
  const selectedRoute = useSelector(
    (state: RootState) => state.routes.selectedRoute
  );
  const selectedReturnRoute = useSelector(
    (state: RootState) => state.returnRoutes.selectedReturnRoute
  );

  const [oneWaySeatIds, setOneWaySeatIds] = useState<number[]>([]);
  const [returnSeatIds, setReturnSeatIds] = useState<number[]>([]);

  useEffect(() => {
    const storedSeats = JSON.parse(
      localStorage.getItem("selectedSeats") || "[]"
    );

    if (selectedReturnRoute) {
      setOneWaySeatIds(storedSeats);
      setReturnSeatIds(storedSeats);
    } else {
      setOneWaySeatIds(storedSeats);
      setReturnSeatIds([]);
    }
  }, [selectedReturnRoute]);

  useEffect(() => {
    if (
      selectedPassengers.length > 0 &&
      selectedRoute &&
      oneWaySeatIds.length > 0
    ) {
      const orderData = selectedPassengers.map((passenger) => {
        const category = categories.find(
          (cat) => cat.categoryName === passenger.categoryName
        );
        const discount = category?.discountPercentage ?? 1;

        const price = selectedRoute?.basePrice
          ? selectedRoute.basePrice * discount
          : 0;

        return {
          productName: passenger.categoryName,
          price,
          quantity: passenger.count,
        };
      });

      const oneWayRouteId = selectedRoute.id;
      const returnRouteId = selectedReturnRoute?.id ?? null;
      const oneWayScheduleId = selectedRoute.scheduleId;
      const returnScheduleId = selectedReturnRoute?.scheduleId ?? null;

      dispatch(proceedToPayment({ orderData })).then((action) => {
        if (proceedToPayment.fulfilled.match(action)) {
          const reservationId = action.payload;

          let seatIndex = 0;

          selectedPassengers.forEach((passenger) => {
            for (let i = 0; i < passenger.count; i++) {
              const passengerCategoryId = categories.find(
                (cat) => cat.categoryName === passenger.categoryName
              )?.id;

              const oneWaySeatId = oneWaySeatIds[seatIndex] ?? null;
              const returnSeatId = returnSeatIds[seatIndex] ?? null;

              seatIndex++;

              if (passengerCategoryId && reservationId) {
                dispatch(
                  confirmPayment({
                    reservationId,
                    token: token || "",
                    price: selectedRoute.basePrice ?? 0,
                    oneWayRouteId,
                    returnRouteId,
                    oneWayScheduleId,
                    returnScheduleId,
                    passengerCategoryId,
                    oneWaySeatId,
                    returnSeatId,
                  })
                ).catch((error) =>
                  console.error("Error confirming payment:", error)
                );
              }
            }
          });
        }
      });
    }
  }, [
    dispatch,
    selectedRoute,
    selectedReturnRoute,
    selectedPassengers,
    categories,
    token,
    oneWaySeatIds,
    returnSeatIds,
  ]);

  return null;
};

export default ProceedToPayment;
