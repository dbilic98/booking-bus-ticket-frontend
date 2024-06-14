import React from "react";

const SearchForm: React.FC = () => {
  return (
    <div className="bg-white p-10 shadow-lg rounded-md w-full max-w-md">
      <form className="space-y-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="FROM"
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            placeholder="TO"
            className="w-full p-3 border rounded"
          />
        </div>
        <div className="flex space-x-4">
          <button className="w-full p-3 border rounded">TODAY, NOW</button>
          <button className="w-full p-3 border rounded">ADD RETURN</button>
        </div>
        <button className="w-full p-3 border rounded mb-10">
          1 ADULT (16+)
        </button>
        <div>
          <button
            type="submit"
            className="w-full p-3 bg-black text-white rounded mt-14"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
