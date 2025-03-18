import React from "react";
import { useParams } from "react-router-dom";

const VideoPage = () => {
    const { id } = useParams();

    return (
        <div className="video-page">
            <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default VideoPage;
