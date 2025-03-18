import React, { useState } from "react";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query); // Pass the search query to the parent
  };

  return (
    <div className="flex items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">YouTube Clone</h1>
      <input
        type="text"
        className="ml-4 p-2 w-1/2 border rounded text-black"
        placeholder="Search videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="ml-2 p-2 bg-red-600 rounded" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Header;
