import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("token");
interface ProceedToPaymentPayload {
  orderData: {
    productName: string;
    price: number;
    quantity: number;
  }[];
}

export const proceedToPayment = createAsyncThunk(
  "payment/proceedToPayment",
  async ({ orderData }: ProceedToPaymentPayload) => {
    try {
      const token = getToken();
      const reservationResponse = await axios.post(
        `http://localhost:8081/reservations`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const reservation = reservationResponse.data;

      const paymentRequest = {
        reservationId: reservation.id,
        orderData,
      };

      const checkoutResponse = await axios.post(
        "http://localhost:8081/create-checkout-session",
        paymentRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { url } = checkoutResponse.data;
      localStorage.setItem("reservationId", reservation.id);
      window.location.href = url;

      return reservation.id;
    } catch (error) {
      console.error("Error processing payment:", error);
      return "Error processing payment";
    }
  }
);
