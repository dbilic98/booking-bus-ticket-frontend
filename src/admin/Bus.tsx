import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addBus,
  Bus,
  deleteBus,
  fetchBus,
  updateBus,
} from "../features/admin/busSlice";
import { Company, fetchCompany } from "../features/admin/companySlice";

const Buses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const buses = useSelector((state: RootState) => state.buses.bus) as Bus[];
  const companies = useSelector(
    (state: RootState) => state.company.company
  ) as Company[];

  const [isAddBusVisible, setIsAddBusVisible] = useState(false);
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [seats, setSeats] = useState(40);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchBus());
    dispatch(fetchCompany());
  }, [dispatch]);

  const findCompanyName = (companyId: number): string => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company?.companyName : "";
  };

  const handleAddBusClick = () => {
    setIsAddBusVisible(!isAddBusVisible);
  };

  const updateBusRef = useRef<HTMLDivElement>(null);
  if (updateBusRef.current) {
    updateBusRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleAddBus = async () => {
    try {
      if (companyId) {
        const fixedSeats = 40;
        await dispatch(
          addBus({
            model,
            licensePlate,
            companyId,
            seats: fixedSeats,
          })
        );
        dispatch(fetchBus());

        setModel("");
        setLicensePlate("");
        setCompanyId(null);
        setSeats(fixedSeats);
      } else {
        alert("Please select both company");
      }
    } catch (error) {
      alert("Failed to add bus");
    }
  };

  const handleUpdateClick = (bus: Bus) => {
    setSelectedBus(bus);
    setModel(bus.model);
    setLicensePlate(bus.licensePlate);
    setCompanyId(bus.companyId);
    setSeats(bus.seats);
    setIsEditing(true);
  };

  const handleUpdateSubmit = async () => {
    if (selectedBus && companyId) {
      await dispatch(
        updateBus({
          id: selectedBus.id,
          model,
          licensePlate,
          companyId,
          seats,
        })
      );
      dispatch(fetchBus());
      setIsEditing(false);
    }
    console.log("Modell", model);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      dispatch(deleteBus(id));
    }
  };
  return (
    <div className="flex min-h-screen">
      {" "}
      <Sidebar />
      <div className="flex flex-col justify-between md:flex-row md:space-x-8">
        <div className="bg-[#F7F8FA] p-4 mt-5 ml-10 sm:p-6 md:p-8 lg:p-10 shadow-lg rounded-md w-full md:w-[60vw] h-full">
          <h2 className="text-xl font-bold mb-4">BUS</h2>

          <div className="overflow-x-auto rounded-2xl">
            <div className="flex justify-end mb-10 mr-4">
              <button
                className="bg-white text-[#0C3D2E] font-medium px-4 py-3 rounded-md"
                onClick={handleAddBusClick}
              >
                + Add new bus
              </button>
            </div>

            <div className="bg-[#0C3D2E] text-white font-bold p-3 mb-2 rounded-t-md grid grid-cols-4 gap-4">
              <div className="w-1/2">
                <p className="text-sm">Model</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">License plate</p>
              </div>
              <div className="">
                <p className="text-sm">Company</p>
              </div>
              <div className="w-1/2 text-right mr-20">
                <p className="text-sm">Action</p>
              </div>
            </div>

            <div className="space-y-4">
              {buses.map((busItem) => (
                <div
                  key={busItem.id}
                  className="bg-white p-4 sm:p-6 shadow rounded-md grid grid-cols-4 gap-4 items-center"
                >
                  <p className="text-base">{busItem.model}</p>
                  <p className="text-base">{busItem.licensePlate}</p>
                  <p className="text-base">
                    {findCompanyName(busItem.companyId)}
                  </p>

                  <div className="flex space-x-2">
                    <button
                      className="bg-[#0C3D2E] text-white px-4 py-2 rounded-md"
                      onClick={() => handleUpdateClick(busItem)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-700 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDeleteClick(busItem.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isEditing && selectedBus && (
            <div
              ref={updateBusRef}
              className="mt-16 p-5 border-2 border-gray-200"
            >
              <h2 className="font-bold mb-4 text-sm">UPDATE BUS</h2>
              <p className="block text-gray-700 text-sm font-bold">Model</p>
              <input
                className="border rounded w-full py-2 px-3 mb-5"
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <p className="block text-gray-700 text-s font-bold">
                License plate
              </p>
              <input
                className="border rounded w-full py-2 px-3 mb-5"
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
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

        {isAddBusVisible && (
          <div className="bg-[#F7F8FA] p-10 mt-10 rounded-md w-[20vw] h-[67vh]">
            <h2 className="font-bold mb-4 text-sm">ADD BUS</h2>
            <div>
              <div className="flex items-center mb-2"></div>
              <div className="bg-[#0C3D2E] p-2"></div>
              <p className="font-bold pt-4 pb-1">Registartions have buses</p>

              <div className="border border-gray-300 p-4 rounded-md">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Model
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    placeholder="Model"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    License plate
                  </label>
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    placeholder="License plate"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Number of seats
                  </label>
                  <input
                    type="number"
                    value={seats}
                    onChange={(e) => {
                      const newSeats = Number(e.target.value);
                      if (newSeats !== 40) {
                        setSeats(40);
                      }
                    }}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Company
                  </label>
                  <select
                    value={companyId || ""}
                    onChange={(e) => setCompanyId(Number(e.target.value))}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  >
                    <option>Select company</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {findCompanyName(company.id)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <button
                  className=" w-full mt-10 bg-[#0C3D2E] text-white px-5 py-2 rounded-md"
                  onClick={handleAddBus}
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

export default Buses;
