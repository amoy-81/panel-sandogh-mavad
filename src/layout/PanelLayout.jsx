import React from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "../components/topbar/Topbar";
import { Sidebar } from "../components/sidebar/Sidebar";

function PanelLayout() {
  return (
    <div className=" flex p-2">
      <div className=" p-2 w-1/5 h-[95vh]">
        <Sidebar />
      </div>
      <div className=" p-2 w-4/5 ">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}

export default PanelLayout;
