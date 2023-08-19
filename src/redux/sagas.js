import { put, all } from "redux-saga/effects";
import { watchFetchRouteNice } from "./mapSlice";
import { coords } from "../constants/coords";
import { getRoute } from "../services/httpService";

export function* watchFetchRoute() {
  // Fetch route data for each set of coordinates using parallel requests
  try {
    const coordinatePayloads = yield all(
      coords.map((item) => {
        return getRoute(item.startCoord, [item.middleCoord], item.endCoord);
      })
    );

    // Extract the coordinates data from the fetched payloads
    const allCoordinates = coordinatePayloads.map(
      (payload) => payload.routes[0].geometry.coordinates
    );
    console.log(allCoordinates);
    yield put(watchFetchRouteNice(allCoordinates));
  } catch (error) {
    console.log(error);
  }
}
