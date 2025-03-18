import React, { useEffect, useState } from "react";
import { fetchVideos } from "../api/youtube";
import VideoCard from "./VideoCard";
import "../style.css";

const VideoList = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const data = await fetchVideos();
            setVideos(data);
        };
        getVideos();
    }, []);

    return (
        <div className="video-grid">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};

export default VideoList;
