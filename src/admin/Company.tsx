import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompany,
  deleteCompany,
  fetchCompany,
  updateCompany,
} from "../features/admin/companySlice";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { Company } from "../features/admin/companySlice";

const Companies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector(
    (state: RootState) => state.company.company
  ) as Company[];

  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [newCompanyName, setNewCompanyName] = useState("");

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  const handleAddCategoryClick = () => {
    setIsAddCategoryVisible(!isAddCategoryVisible);
  };

  const updateCompanyRef = useRef<HTMLDivElement>(null);
  if (updateCompanyRef.current) {
    updateCompanyRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleAddCompany = () => {
    dispatch(addCompany(newCompanyName));
    setNewCompanyName("");
  };

  const handleUpdateClick = (company: Company) => {
    setSelectedCompany(company);
    setNewCompanyName(company.companyName);
    setIsEditing(true);
  };

  const handleUpdateSubmit = () => {
    if (selectedCompany) {
      dispatch(
        updateCompany({ id: selectedCompany.id, companyName: newCompanyName })
      );
      setIsEditing(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      dispatch(deleteCompany(id));
    }
  };

  return (
    <div className="flex min-h-screen">
      {" "}
      <Sidebar />
      <div className="flex flex-col justify-between md:flex-row md:space-x-8">
        <div className="bg-[#F7F8FA] p-4 mt-5 ml-10 sm:p-6 md:p-8 lg:p-10 shadow-lg rounded-md w-full md:w-[60vw] h-full">
          <h2 className="text-xl font-bold mb-4">COMPANY</h2>

          <div className="overflow-x-auto rounded-2xl">
            <div className="flex justify-end mb-10 mr-4 ">
              <button
                className="bg-white text-[#0C3D2E] font-medium px-4 py-3 rounded-md"
                onClick={handleAddCategoryClick}
              >
                + Add new category
              </button>
            </div>

            <div className="flex justify-between bg-[#0C3D2E] text-white font-bold p-3 mb-2 rounded-t-md">
              <div className="w-1/2">
                <p className="text-sm">Company Name</p>
              </div>
              <div className="w-1/2 text-right mr-20">
                <p className="text-sm">Action</p>
              </div>
            </div>
            <div className="space-y-4">
              {company.map((companyItem) => (
                <div
                  key={companyItem.id}
                  className="bg-white p-4 sm:p-6 shadow rounded-md flex justify-between items-center"
                >
                  <p className="text-base">{companyItem.companyName}</p>

                  <div className="flex space-x-2">
                    <button
                      className="bg-[#0C3D2E] text-white px-4 py-2 rounded-md"
                      onClick={() => handleUpdateClick(companyItem)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-700 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDeleteClick(companyItem.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isEditing && selectedCompany && (
            <div
              ref={updateCompanyRef}
              className="mt-16 p-5 border-2 border-gray-200"
            >
              <h2 className="font-bold mb-4 text-sm">UPDATE COMPANY</h2>
              <label className="block text-gray-700 text-sm font-bold">
                Company name
              </label>
              <input
                className="border rounded w-full py-2 px-3 mb-5"
                type="text"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
              />
              <button
                className="mt-2 bg-[#0C3D2E] text-white px-5 py-2 rounded-md"
                onClick={handleUpdateSubmit}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {isAddCategoryVisible && (
          <div className="bg-[#F7F8FA] p-10 mt-10 rounded-md w-[20vw] h-[40vh]">
            <h2 className="font-bold mb-4 text-sm">ADD COMPANY</h2>
            <div>
              <div className="flex items-center mb-2"></div>
              <div className=" bg-[#0C3D2E] p-2"></div>
              <p className="font-bold pt-4 pb-1">
                Registrations have companies
              </p>

              <div className="border border-gray-300 p-4 rounded-md">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Company name
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    id="companyName"
                    type="text"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    placeholder="Company name"
                  ></input>
                </div>
              </div>
              <div>
                <button
                  className=" w-full mt-10 bg-[#0C3D2E] text-white px-5 py-2 rounded-md"
                  onClick={handleAddCompany}
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

export default Companies;
