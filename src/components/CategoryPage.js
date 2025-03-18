import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoList from "./VideoList";

const API_KEY = "AIzaSyD4-IY-mSVNmZtCd0HBcKwg_g3rpU_3iKA";

const CategoryPage = () => {
  const { id } = useParams(); // Get category ID from URL
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (id) {
      fetchVideosByCategory(id); // Fetch videos when category changes
    }
  }, [id]); // Depend on category ID change

  const fetchVideosByCategory = async (categoryId) => {
    try {
      const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=${categoryId}&maxResults=20&regionCode=IN&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.items) {
        setVideos(data.items);
      } else {
        setVideos([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold p-4">Videos for Category {id}</h2>
      <VideoList videos={videos} />
    </div>
  );
};

export default CategoryPage;
