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
// import Buses from "./admin/Bus";
import RouteAdmin from "./admin/RouteAdmin";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/route-view" element={<RoutesView />} />
        <Route path="/return-route" element={<ReturnRoutesView />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/company" element={<Company />} />
        {/* <Route path="/admin/bus" element={<Buses />} /> */}
        <Route path="/admin/route" element={<RouteAdmin />} />
      </Routes>
    </Router>
  </Provider>
);
