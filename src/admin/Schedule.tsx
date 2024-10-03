import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchSchedule,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  Schedule,
} from "../features/admin/scheduleSlice";
import { findPlaces, Place } from "../features/placesSlice";
import { fetchRoute, Route } from "../features/admin/routeAdminSlice";
import { fetchBus, Bus } from "../features/admin/busSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const Schedules: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const schedule = useSelector(
    (state: RootState) => state.schedule.schedule
  ) as Schedule[];
  const routes = useSelector(
    (state: RootState) => state.route.route
  ) as Route[];
  const places = useSelector(
    (state: RootState) => state.places.places
  ) as Place[];
  const buses = useSelector((state: RootState) => state.buses.bus) as Bus[];

  const [isAddScheduleVisible, setIsAddScheduleVisible] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date>(new Date());
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [routeId, setRouteId] = useState<number | null>(null);
  const [busId, setBusId] = useState<number | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const error = useSelector((state: RootState) => state.schedule.error);

  useEffect(() => {
    dispatch(fetchSchedule());
    dispatch(fetchRoute());
    dispatch(findPlaces());
    dispatch(fetchBus());
  }, [dispatch]);

  const findPlaceName = (placeId: number): string => {
    const place = places.find((p) => p.id === placeId);
    return place ? place.placeName : "";
  };

  const findBusName = (busId: number): string => {
    const bus = buses.find((b) => b.id === busId);
    return bus ? bus.model : "";
  };

  const handleAddScheduleClick = () => {
    setIsAddScheduleVisible(!isAddScheduleVisible);
  };

  const updateScheduleRef = useRef<HTMLDivElement>(null);
  if (updateScheduleRef.current) {
    updateScheduleRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleAddSchedule = async () => {
    try {
      if (routeId && busId && scheduleDate) {
        await dispatch(
          addSchedule({
            scheduleDate: format(scheduleDate, "yyyy-MM-dd"),
            departureTime,
            arrivalTime,
            routeId,
            busId,
          })
        );
        dispatch(fetchSchedule());

        setScheduleDate(new Date());
        setDepartureTime("");
        setArrivalTime("");
        setRouteId(null);
        setBusId(null);
        setIsAddScheduleVisible(false);
      } else {
        alert(
          "Please select both route and bus, and set a valid schedule date."
        );
      }
    } catch (error) {
      alert("Failed to add schedule: ");
    }
  };

  const handleUpdateClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setScheduleDate(schedule.scheduleDate);
    setDepartureTime(schedule.departureTime);
    setArrivalTime(schedule.arrivalTime);
    setRouteId(schedule.routeId);
    setBusId(schedule.busId);
    setIsEditing(true);
  };

  const handleUpdateSubmit = async () => {
    if (selectedSchedule && routeId && busId) {
      await dispatch(
        updateSchedule({
          id: selectedSchedule.id,
          scheduleDate,
          departureTime,
          arrivalTime,
          routeId,
          busId,
        })
      );
      dispatch(fetchSchedule());
      setIsEditing(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      dispatch(deleteSchedule(id));
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col justify-between md:flex-row md:space-x-8">
        <div className="bg-[#F7F8FA] p-4 ml-10 sm:p-6 md:p-8 lg:p-10 shadow-lg rounded-md w-full md:w-[60vw] h-full">
          <h2 className="text-xl font-bold mb-4">SCHEDULE</h2>

          {error && (
            <div
              className="bg-red-100 border px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">
                You cannot delete this record because it is linked to other
                records in the system.
              </strong>
              <span className="block sm:inline"></span>
            </div>
          )}

          <div className="overflow-x-auto rounded-2xl">
            <div className="flex justify-end mb-10 mr-4 ">
              <button
                className="bg-white text-[#0C3D2E] font-medium px-4 py-3 rounded-md"
                onClick={handleAddScheduleClick}
              >
                + Add new schedule
              </button>
            </div>

            <div className="bg-[#0C3D2E] text-white font-bold p-3 mb-2 rounded-t-md grid grid-cols-6 gap-6">
              <div className="w-1/2">
                <p className="text-sm">Schedule date</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">Departure time</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">Arrival time</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">Route</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">Bus</p>
              </div>
              <div className="w-1/2 text-right mr-20">
                <p className="text-sm">Action</p>
              </div>
            </div>

            <div className="space-y-4">
              {schedule.map((scheduleItem) => {
                const route = routes.find(
                  (route) => route.id === scheduleItem.routeId
                );

                const startPlaceName = route
                  ? findPlaceName(route.startPlaceId)
                  : "";
                const endPlaceName = route
                  ? findPlaceName(route.endPlaceId)
                  : "";

                return (
                  <div
                    key={scheduleItem.id}
                    className="bg-white p-4 sm:p-6 shadow rounded-md grid grid-cols-6 gap-2 items-center"
                  >
                    <p className="text-base">
                      {scheduleItem.scheduleDate
                        ? scheduleItem.scheduleDate.toString()
                        : ""}
                    </p>
                    <p className="text-base">{scheduleItem.departureTime}</p>
                    <p className="text-base">{scheduleItem.arrivalTime}</p>
                    <p className="text-base">
                      <span>{startPlaceName}</span>
                      <span>-</span>
                      <span>{endPlaceName}</span>
                    </p>
                    <p className="text-base">
                      {findBusName(scheduleItem.busId)}
                    </p>

                    <div className="flex space-x-2">
                      <button
                        className="bg-[#0C3D2E] text-white px-4 py-2 rounded-md"
                        onClick={() => handleUpdateClick(scheduleItem)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-700 text-white px-4 py-2 rounded-md"
                        onClick={() => handleDeleteClick(scheduleItem.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {isEditing && selectedSchedule && (
            <div
              ref={updateScheduleRef}
              className="mt-16 p-5 border-2 border-gray-200"
            >
              <h2 className="font-bold mb-4 text-sm">UPDATE SCHEDULE</h2>
              <p className="block text-gray-700 text-sm font-bold">
                Schedule date
              </p>
              <DatePicker
                selected={scheduleDate}
                onChange={(date: Date | null) => {
                  if (date) {
                    setScheduleDate(date);
                  }
                }}
                dateFormat="yyyy-MM-dd"
                className="border rounded w-full py-2 px-3 mb-5 date-picker-custom"
              />

              <p className="block text-gray-700 text-sm font-bold">
                Departure time
              </p>
              <input
                className="border rounded w-full py-2 px-3 mb-5"
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
              />
              <p className="block text-gray-700 text-sm font-bold">
                Arrival time
              </p>
              <input
                className="border rounded w-full py-2 px-3 mb-5"
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
              />
              <button
                className="mt-2 bg-[#0C3D2E] text-white px-5 py-2 rounded-md"
                onClick={handleUpdateSubmit}
              >
                Save changes
              </button>
            </div>
          )}
        </div>

        {isAddScheduleVisible && (
          <div className="bg-[#F7F8FA] p-10 mt-10 rounded-md w-[20vw] h-[76vh]">
            <h2 className="font-bold mb-4 text-sm">ADD SCHEDULE</h2>
            <div>
              <div className="flex items-center mb-2"></div>
              <div className="bg-[#0C3D2E] p-2"></div>
              <p className="font-bold pt-4 pb-1">
                Registartions have schedules
              </p>

              <div className="border border-gray-300 p-4 rounded-md">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Schedule date
                  </label>
                  <DatePicker
                    selected={scheduleDate}
                    onChange={(date: Date | null) => {
                      if (date) {
                        setScheduleDate(date);
                      }
                    }}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="border rounded w-full py-2 px-3 text-gray-700 pr-20"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Departure time
                  </label>
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Arrival time
                  </label>
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Bus
                  </label>
                  <select
                    value={busId || ""}
                    onChange={(e) => setBusId(Number(e.target.value))}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  >
                    <option>Select bus</option>
                    {buses.map((bus) => (
                      <option key={bus.id} value={bus.id}>
                        {findBusName(bus.id)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Route
                  </label>
                  <select
                    value={routeId || ""}
                    onChange={(e) => setRouteId(Number(e.target.value))}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  >
                    <option>Select route</option>
                    {routes.map((route) => (
                      <option key={route.id} value={route.id}>
                        {findPlaceName(route.startPlaceId)}-{" "}
                        {findPlaceName(route.endPlaceId)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button
                  className="w-full mt-10 bg-[#0C3D2E] text-white px-5 py-2 rounded-md"
                  onClick={handleAddSchedule}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedules;
