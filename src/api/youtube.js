import axios from 'axios';

const API_KEY = "AIzaSyD4-IY-mSVNmZtCd0HBcKwg_g3rpU_3iKA";  // Replace with your key
const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

export const fetchVideos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/videos`, {
            params: {
                part: "snippet,contentDetails,statistics",
                chart: "mostPopular",
                maxResults: 50,
                regionCode: "IN",
                key: API_KEY,
            },
        });
        return response.data.items;
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
};
