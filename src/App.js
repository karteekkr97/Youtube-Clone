import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import VideoList from "./components/VideoList";
import VideoPage from "./pages/VideoPage";
import Sidebar from "./components/Sidebar";
import CategoryPage from "./components/CategoryPage"; // New category page component

const API_KEY = "AIzaSyD4-IY-mSVNmZtCd0HBcKwg_g3rpU_3iKA";

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos("mostPopular");
  }, []);

  const fetchVideos = async (searchQuery) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=20&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    setVideos(data.items);
  };

  const fetchVideosByCategory = async (categoryId) => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&videoCategoryId=${categoryId}&maxResults=20&regionCode=IN&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    setVideos(data.items);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar onCategorySelect={fetchVideosByCategory} />
        <div className="flex-1">
          <Header onSearch={fetchVideos} />
          <Routes>
            <Route path="/" element={<VideoList videos={videos} />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/video/:id" element={<VideoPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
