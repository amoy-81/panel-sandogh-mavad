import React from "react";
import Banner from "@assets/png/Frame 56.png";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="h-screen flex p-2 bg-white max-lg:px-6">
      <div className=" w-3/4 flex justify-center items-center max-lg:w-full">{<Outlet />}</div>
      <div className=" w-1/4 max-lg:hidden">
        <img src={Banner} className="h-full w-full" />
      </div>
    </div>
  );
}

export default AuthLayout;
