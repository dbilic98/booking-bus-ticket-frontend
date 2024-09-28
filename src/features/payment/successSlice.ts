import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const confirmPayment = createAsyncThunk(
  "payment/confirmPayment",
  async ({
    reservationId,
    token,
    price,
    oneWayRouteId,
    returnRouteId,
    oneWayScheduleId,
    returnScheduleId,
    passengerCategoryId,
    oneWaySeatId,
    returnSeatId,
  }: {
    reservationId: number;
    token: string;
    price: number;
    oneWayRouteId: number;
    returnRouteId: number | null;
    oneWayScheduleId: number;
    returnScheduleId: number | null;
    passengerCategoryId: number;
    oneWaySeatId: number;
    returnSeatId: number | null;
  }) => {
    try {
      const token = getToken();
      await axios.post(
        "http://localhost:8081/tickets",
        {
          price,
          oneWayRouteId,
          returnRouteId,
          reservationId,
          oneWayScheduleId,
          returnScheduleId,
          passengerCategoryId,
          oneWaySeatId,
          returnSeatId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios.put(
        `http://localhost:8081/reservations/confirm/${reservationId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error confirming payment:", error);
      return "Error confirming payment";
    }
  }
);
