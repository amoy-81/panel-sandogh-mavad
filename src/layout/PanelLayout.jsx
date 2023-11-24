import React from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "../components/topbar/Topbar";
import { Sidebar } from "../components/sidebar/Sidebar";

function PanelLayout() {
  return (
    <div className=" flex p-2 h-screen overflow-hidden">
      <div className=" p-2 w-1/5 h-[95vh]">
        <Sidebar userRule={"user"} />
      </div>
      <div className=" p-2 w-4/5 max-h-screen ">
        <Topbar />
        <div className=" rounded-3xl h-[81vh] overflow-y-auto sc overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PanelLayout;
