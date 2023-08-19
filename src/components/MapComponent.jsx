import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker as MarkerL,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { Layout } from "antd";
import RouteList from "./RouteList";
import { coords } from "../constants/coords";

const { Sider } = Layout;

function MapComponent() {
  const coordinates = useSelector((state) => state.track.data);

  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);

  // Reference to the map container
  const mapRef = useRef(null);

  const handleRouteClick = (index) => {
    setSelectedRouteIndex(index);
    if (mapRef.current) {
      // Fit the map bounds to the selected route
      const bounds = L.latLngBounds(convertCoordinates(coordinates[index]));
      mapRef.current.fitBounds(bounds);
    }
  };

  // Helper function to convert coordinates data for Polyline
  const convertCoordinates = (coordinatesData) => {
    return coordinatesData.map((coord) => [coord[1], coord[0]]);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} theme="light">
        <h2
          style={{
            padding: "10px",
            textAlign: "center",
            backgroundColor: "darkblue",
            color: "white",
          }}
        >
          Маршруты
        </h2>
        <RouteList
          coordinates={coordinates}
          selectedRouteIndex={selectedRouteIndex}
          handleRouteClick={handleRouteClick}
        />
      </Sider>
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[59.84660399, 30.29496392]}
          zoom={13}
          style={{ height: "100vh" }}
          ref={mapRef}
        >
          {selectedRouteIndex != null ? (
            <>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {coordinates[selectedRouteIndex] && (
                <>
                  <Polyline
                    positions={convertCoordinates(
                      coordinates[selectedRouteIndex]
                    )}
                    color="green"
                  />
                  {coords.map(
                    (item, index) =>
                      index === selectedRouteIndex && (
                        <>
                          <MarkerL
                            key={index + "start"}
                            position={item.startCoord}
                          >
                            <Popup>Стартовый маркер</Popup>
                          </MarkerL>

                          <MarkerL
                            key={index + "middle"}
                            position={item.middleCoord}
                          >
                            <Popup>Средний маркер</Popup>
                          </MarkerL>

                          <MarkerL key={index + "end"} position={item.endCoord}>
                            <Popup>Конечный маркер</Popup>
                          </MarkerL>
                        </>
                      )
                  )}
                </>
              )}
            </>
          ) : (
            // Display a message if no route is selected
            <div
              style={{
                fontSize: "24px",
                marginTop: "20%",
                textAlign: "center",
              }}
            >
              Маршрут не выбран
            </div>
          )}
        </MapContainer>
      </div>
    </Layout>
  );
}

export default MapComponent;
