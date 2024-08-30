import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { RootState } from "../redux/store";
import { Place } from "../features/placesSlice";
import { SearchParams } from "../features/routesSlice";
import { Route, Schedule } from "../features/routesSlice";
import { selectTotalSelectedPassengers } from "../features/passengerSlice";
import { MdDateRange } from "react-icons/md";
import { format, parseISO } from "date-fns";
import { BsArrowLeftRight, BsFillPersonFill } from "react-icons/bs";
import { FaGripLinesVertical } from "react-icons/fa";
import { CgArrowLongDownC } from "react-icons/cg";
import { setSelectedRoute } from "../features/routesSlice";

const RoutesView: React.FC = () => {
  const location = useLocation();
  const searchParams = location.state?.searchParams as SearchParams;
  const startPlace = location.state?.startPlace as Place;
  const endPlace = location.state?.endPlace as Place;
  const tripType = location.state?.tripType as "roundtrip" | "oneway";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedRoute, setSelectedRoutes] = useState<{
    basePrice: number;
    departureTime: string;
    arrivalTime: string;
  } | null>(null);

  const formattedDate = format(
    parseISO(searchParams.scheduleDate),
    "EEE d MMM yyyy"
  );

  const routes = useSelector(
    (state: RootState) => state.routes.routes
  ) as Route[];
  const loading = useSelector((state: RootState) => state.routes.loading);
  const error = useSelector((state: RootState) => state.routes.error);

  const filteredRoutes = routes.map((route) => ({
    ...route,
    scheduleList: route.scheduleList.filter(
      (schedule) => schedule.scheduleDate === searchParams.scheduleDate
    ),
  }));

  const handleSelect = (route: Route, schedule: Schedule) => {
    const routeData = {
      basePrice: route.basePrice,
      departureTime: schedule.departureTime,
      arrivalTime: schedule.arrivalTime,
    };
    setSelectedRoutes(routeData);
  };

  const handleContinue = () => {
    if (selectedRoute) {
      dispatch(setSelectedRoute(selectedRoute));
      const routePath =
        tripType === "oneway" ? "/seat-selection" : "/return-route";

      navigate(routePath, {
        state: { selectedRoute, searchParams, startPlace, endPlace },
      });
    }
  };

  const totalSelectedPassengers = useSelector(selectTotalSelectedPassengers);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-light-green p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 space-y-4 md:space-y-6 lg:space-y-8">
        <div className="flex flex-col md:flex-row md:space-x-8 text-cream">
          {startPlace && endPlace && (
            <div className="bg-jet-black p-4 shadow-lg rounded-md flex items-center justify-center text-base w-full md:w-[24vw] h-[56px]">
              <div className="flex items-center justify-center w-full">
                <p className="mr-4 md:mr-10">{startPlace.placeName}</p>
                <BsArrowLeftRight className="mx-2 text-xl" />
                <p className="ml-4 md:ml-10">{endPlace.placeName}</p>
              </div>
            </div>
          )}
          {searchParams && (
            <div className="bg-jet-black p-4 shadow-lg rounded-md flex items-center justify-center text-base w-full md:w-[21vw] h-[56px]">
              <div className="flex items-center space-x-2">
                <MdDateRange />
                <p className="mr-2">{searchParams.scheduleDate}</p>
              </div>

              <FaGripLinesVertical className="text-cream mx-2" />

              <div className="flex items-center space-x-2">
                <MdDateRange />
                {searchParams.endScheduleDate && (
                  <p>{searchParams.endScheduleDate}</p>
                )}
              </div>
            </div>
          )}
          <div className="bg-jet-black p-4 shadow-lg rounded-md flex items-center justify-center text-base w-full md:w-[11.5vw] h-[56px]">
            <p className="flex items-center">
              <BsFillPersonFill className="mr-2" />
              Passenger {totalSelectedPassengers}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between md:flex-row md:space-x-8">
          <div className="bg-cream p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg rounded-md w-full md:w-[60vw] h-full">
            <h2 className="text-xl font-bold mb-4">OUTBOUND TIP</h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left rounded-md">
                <thead>
                  <tr>
                    <th className="border-y bg-light-green p-2 pl-8">
                      <p className="block font-sans text-sm text-black font-bold leading-none opacity-70">
                        Departure Time
                      </p>
                    </th>
                    <th className="border-y bg-light-green p-4">
                      <p className="block font-sans text-sm text-black font-bold leading-none opacity-70">
                        Arrival Time
                      </p>
                    </th>
                    <th className="border-y bg-light-green pl-4 sm:pl-12">
                      <p className="block font-sans text-sm text-black font-bold leading-none opacity-70">
                        Company Name
                      </p>
                    </th>
                    <th className="border-y bg-light-green pr-4 sm:pr-20">
                      <p className="block font-sans text-sm text-black font-bold leading-none opacity-70">
                        Base Price
                      </p>
                    </th>
                    <th className="border-y bg-light-green p-4">
                      <p className="block font-sans text-sm text-black font-bold leading-none opacity-70"></p>
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="p-4 sm:p-6 overflow-x-auto">
                <div className="space-y-4">
                  {filteredRoutes.map((route) =>
                    route.scheduleList.map((schedule: Schedule) => (
                      <div
                        key={schedule.id}
                        className="bg-white p-4 sm:p-6 shadow rounded-md flex flex-col md:flex-row justify-between items-start md:items-center"
                      >
                        <div className="flex flex-col mb-4 md:mb-0">
                          <p className="text-base">{schedule.departureTime}</p>
                          <p className="text-sm text-gray-500">
                            {startPlace.placeName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formattedDate}
                          </p>
                        </div>
                        <div className="flex flex-col mb-4 md:mb-0">
                          <p className="text-base">{schedule.arrivalTime}</p>
                          <p className="text-sm text-gray-500">
                            {endPlace.placeName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formattedDate}
                          </p>
                        </div>
                        <div className="flex flex-col mb-4 md:mb-0">
                          <p className="text-base font-major-mono">
                            {schedule.companyName}
                          </p>
                        </div>
                        <div className="flex flex-col mb-4 md:mb-0">
                          <p className="text-base font-major-mono font-extrabold">
                            {route.basePrice} €
                          </p>
                        </div>
                        <button
                          className="bg-jet-black text-white px-4 py-2 rounded-full"
                          onClick={() => handleSelect(route, schedule)}
                        >
                          Select
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cream p-10 rounded-md w-[20vw] h-full">
            <h2 className="font-bold mb-4 text-xs">OUTBOUND</h2>

            {selectedRoute && (
              <div>
                <div className="flex items-center mb-2">
                  <p className="text-2xl font-major-mono font-extrabold">
                    € {selectedRoute.basePrice}.00
                  </p>
                  <button
                    className="flex ml-14 bg-jet-black text-white px-5 py-2 rounded-full"
                    onClick={handleContinue}
                  >
                    CONTINUE
                  </button>
                </div>
                <div className=" bg-light-green p-2"></div>
                <p className="font-bold pt-4">SELECTED JOURNEY</p>

                <div className="border border-gray-300 p-4 rounded-md">
                  <p className="mb-2">
                    <span className="font-bold">
                      {selectedRoute.departureTime}
                    </span>{" "}
                    {startPlace.placeName}
                    {" bus station "}
                  </p>
                  <div className="flex ml-4 mb-2">
                    <CgArrowLongDownC />
                  </div>
                  <p>
                    <span className="font-bold">
                      {selectedRoute.arrivalTime}
                    </span>{" "}
                    {endPlace.placeName}
                    {" bus station"}
                  </p>
                </div>
                <div>
                  <p className="font-bold pt-4">
                    PASSENGER {totalSelectedPassengers}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesView;
