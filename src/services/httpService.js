import axios from "axios";

const BASE_URL = "http://router.project-osrm.org"; // Define the base URL for the OSRM API

export const getRoute = async (origin, waypoints, destination) => {
  try {
    // Convert waypoints to a formatted string for the API request
    const waypointsString = waypoints
      .map((coord) => `${coord[1]},${coord[0]}`)
      .join(";");
    // Make a GET request to the OSRM API with specified parameters
    const response = await axios.get(
      `${BASE_URL}/route/v1/driving/${origin[1]},${origin[0]};${waypointsString};${destination[1]},${destination[0]}?steps=true&geometries=geojson&overview=full`
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных маршрута:", error);
    throw error;
  }
};
