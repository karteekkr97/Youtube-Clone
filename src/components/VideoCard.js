import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
    const navigate = useNavigate();
    return (
        <div className="video-card" onClick={() => navigate(`/video/${video.id}`)}>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <h4>{video.snippet.title}</h4>
            <p>{video.snippet.channelTitle}</p>
        </div>
    );
};

export default VideoCard;
