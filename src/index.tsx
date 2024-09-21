import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import App from "./App";
import RoutesView from "./components/RoutesView";
import "./index.css";
import ReturnRoutesView from "./components/ReturnRoutesView";
import SeatSelection from "./components/SeatSelection";
import Dashboard from "./admin/Dashboard";
import Company from "./admin/Company";
import Buses from "./admin/Bus";
import RouteAdmin from "./admin/RouteAdmin";
import Schedule from "./admin/Schedule";
import Registrations from "./auth/Registration";
import LogIn from "./auth/Login";
import LogOut from "./auth/Logout";
import MyBooking from "./components/MyBooking";
import ProceedToPayment from "./payment/ProceedToPayment";
import SuccessPage from "./payment/SuccessPage";
import FailurePage from "./payment/FailurePage";
import About from "./components/About";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<App />} />
        <Route path="/route-view" element={<RoutesView />} />
        <Route path="/return-route" element={<ReturnRoutesView />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/company" element={<Company />} />
        <Route path="/admin/bus" element={<Buses />} />
        <Route path="/admin/route" element={<RouteAdmin />} />
        <Route path="/admin/schedule" element={<Schedule />} />
        <Route path="/registration" element={<Registrations />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/mybooking" element={<MyBooking />} />
        <Route path="/create-checkout-session" element={<ProceedToPayment />} />
        <Route path="/payment/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </Provider>
);
