import React from "react";
import { Menu as AntdMenu, Spin } from "antd";

function RouteList({ coordinates, selectedRouteIndex, handleRouteClick }) {
  // Display a loading spinner if coordinates are not available yet
  if (!coordinates.length) {
    return <Spin size="large" />;
  }

  return (
    // Display the menu with route options
    <AntdMenu
      onClick={({ key }) => handleRouteClick(Number(key))}
      selectedKeys={
        selectedRouteIndex !== null ? [selectedRouteIndex.toString()] : []
      }
      mode="inline"
    >
      {coordinates.map((_, index) => (
        <AntdMenu.Item key={index} style={{ cursor: "pointer" }}>
          Маршрут {index + 1}
        </AntdMenu.Item>
      ))}
    </AntdMenu>
  );
}

export default RouteList;
