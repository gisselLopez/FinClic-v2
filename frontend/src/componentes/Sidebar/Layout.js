// Layout.js
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="app">
    <Sidebar />
      <div className="d-flex">
          <Outlet />
      </div>
    </div>
  );
}

export default Layout;
