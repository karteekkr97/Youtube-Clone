import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons

const Sidebar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State for sidebar toggle
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const API_KEY = "AIzaSyD4-IY-mSVNmZtCd0HBcKwg_g3rpU_3iKA";
      const url = `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.items) {
        setCategories(data.items);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
    navigate(`/category/${categoryId}`);
    setIsOpen(false); // Close sidebar on category selection (mobile)
  };

  return (
    <div>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 text-2xl z-50 p-2 bg-gray-800 text-white rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 p-4 transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"
        } md:w-1/4 md:translate-x-0 md:static md:h-screen`}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900">Categories</h2>
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category.id}
              className="block w-full text-left p-2 hover:bg-gray-300 text-gray-700 rounded-lg"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.snippet.title}
            </button>
          ))
        ) : (
          <p className="text-gray-500">Loading categories...</p>
        )}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
