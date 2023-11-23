import React from "react";
import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className=" absolute top-0 left-0 backdrop-blur-[1px] bg-opacity-5 z-50 flex justify-center items-center h-screen w-full">
      <ClipLoader color="#F99D27" />
    </div>
  );
}

export default Loader;
