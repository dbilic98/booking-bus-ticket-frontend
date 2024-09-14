import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchRoute,
  addRoute,
  updateRoute,
  deleteRoute,
  Route,
} from "../features/admin/routeAdminSlice";
import { findPlaces, Place } from "../features/placesSlice";

const RouteAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useSelector((state: RootState) => state.route.route) as Route[];
  const places = useSelector(
    (state: RootState) => state.places.places
  ) as Place[];

  const [isAddRouteVisible, setIsAddRouteVisible] = useState(false);
  const [basePrice, setBasePrice] = useState(Number);
  const [totalDistance, setTotalDistance] = useState(Number);
  const [startPlaceId, setStartPlaceId] = useState<number | null>(null);
  const [endPlaceId, setEndPlaceId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    dispatch(fetchRoute());
    dispatch(findPlaces());
  }, [dispatch]);

  const findPlaceName = (placeId: number): string => {
    const place = places.find((p) => p.id === placeId);
    return place ? place.placeName : "";
  };
  const handleAddRouteClick = () => {
    setIsAddRouteVisible(!isAddRouteVisible);
  };

  const updateRouteRef = useRef<HTMLDivElement>(null);
  if (updateRouteRef.current) {
    updateRouteRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleAddRoute = async () => {
    try {
      if (startPlaceId && endPlaceId) {
        await dispatch(
          addRoute({
            basePrice,
            totalDistance,
            startPlaceId,
            endPlaceId,
          })
        );
        dispatch(fetchRoute());

        setBasePrice(0);
        setTotalDistance(0);
        setStartPlaceId(null);
        setEndPlaceId(null);
        setIsAddRouteVisible(false);
      } else {
        alert("Please select both start and end places.");
      }
    } catch (error) {
      alert("Failed to add route");
    }
  };

  const handleUpdateClick = (route: Route) => {
    setSelectedRoute(route);
    setBasePrice(route.basePrice);
    setTotalDistance(route.totalDistance);
    setStartPlaceId(route.startPlaceId);
    setEndPlaceId(route.endPlaceId);
    setIsEditing(true);
  };

  const handleUpdateSubmit = async () => {
    if (selectedRoute && startPlaceId && endPlaceId) {
      await dispatch(
        updateRoute({
          id: selectedRoute.id,
          basePrice,
          totalDistance,
          startPlaceId,
          endPlaceId,
        })
      );
      dispatch(fetchRoute());
      setIsEditing(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      dispatch(deleteRoute(id));
    }
  };

  return (
    <div className="flex min-h-screen">
      {" "}
      <Sidebar />
      <div className="flex flex-col justify-between md:flex-row md:space-x-8">
        <div className="bg-[#F7F8FA] p-4 mt-5 ml-10 sm:p-6 md:p-8 lg:p-10 shadow-lg rounded-md w-full md:w-[60vw] h-full">
          <h2 className="text-xl font-bold mb-4">ROUTE</h2>

          <div className="overflow-x-auto rounded-2xl">
            <div className="flex justify-end mb-10 mr-4 ">
              <button
                className="bg-white text-[#0C3D2E] font-medium px-4 py-3 rounded-md"
                onClick={handleAddRouteClick}
              >
                + Add new route
              </button>
            </div>

            <div className="bg-[#0C3D2E] text-white font-bold p-3 mb-2 rounded-t-md grid grid-cols-5 gap-4">
              <div className="w-1/2">
                <p className="text-sm">Base price</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">Total distance</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">Start place</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">End place</p>
              </div>
              <div className="w-1/2 text-right mr-20">
                <p className="text-sm">Action</p>
              </div>
            </div>

            <div className="space-y-4">
              {route.map((routeItem) => (
                <div
                  key={routeItem.id}
                  className="bg-white p-4 sm:p-6 shadow rounded-md grid grid-cols-5 gap-4 items-center"
                >
                  <p className="text-base">{routeItem.basePrice} KM</p>
                  <p className="text-base">{routeItem.totalDistance} km</p>
                  <p className="text-base">
                    {findPlaceName(routeItem.startPlaceId)}
                  </p>
                  <p className="text-base">
                    {findPlaceName(routeItem.endPlaceId)}
                  </p>

                  <div className="flex space-x-2">
                    <button
                      className="bg-[#0C3D2E] text-white px-4 py-2 rounded-md"
                      onClick={() => handleUpdateClick(routeItem)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-700 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDeleteClick(routeItem.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isEditing && selectedRoute && (
            <div
              ref={updateRouteRef}
              className="mt-16 p-5 border-2 border-gray-200"
            >
              <h2 className="font-bold mb-4 text-sm">UPDATE ROUTE</h2>
              <p className="block text-gray-700 text-sm font-bold">
                Base price
              </p>
              <input
                className="border rounded w-full py-2 px-3 mb-5"
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
              />
              <p className="block text-gray-700 text-sm font-bold">
                Total distance
              </p>
              <input
                className="border rounded w-full py-2 px-3 mb-5"
                type="number"
                value={totalDistance}
                onChange={(e) => setTotalDistance(Number(e.target.value))}
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

        {isAddRouteVisible && (
          <div className="bg-[#F7F8FA] p-10 mt-10 rounded-md w-[20vw] h-[67vh]">
            <h2 className="font-bold mb-4 text-sm">ADD ROUTE</h2>
            <div>
              <div className="flex items-center mb-2"></div>
              <div className=" bg-[#0C3D2E] p-2"></div>
              <p className="font-bold pt-4 pb-1">Registrations have routes</p>

              <div className="border border-gray-300 p-4 rounded-md">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Base price
                  </label>
                  <input
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    placeholder="Base price"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Total distance
                  </label>
                  <input
                    type="number"
                    value={totalDistance}
                    onChange={(e) => setTotalDistance(Number(e.target.value))}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    placeholder="Total distance"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Start place
                  </label>
                  <select
                    value={startPlaceId || ""}
                    onChange={(e) => setStartPlaceId(Number(e.target.value))}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  >
                    <option value="">Select start place</option>
                    {places.map((place) => (
                      <option key={place.id} value={place.id}>
                        {place.placeName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    End place
                  </label>
                  <select
                    value={endPlaceId || ""}
                    onChange={(e) => setEndPlaceId(Number(e.target.value))}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  >
                    <option value="">Select end place</option>
                    {places.map((place) => (
                      <option key={place.id} value={place.id}>
                        {place.placeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <button
                  className=" w-full mt-10 bg-[#0C3D2E] text-white px-5 py-2 rounded-md"
                  onClick={handleAddRoute}
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

export default RouteAdmin;
