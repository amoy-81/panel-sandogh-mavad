import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function NullFile() {
  return (
    <div className=" w-full p-14">
      <div className=" w-full flex justify-center">
        <AiOutlineCloseCircle className=" w-12 h-12 text-red-500" />
      </div>
      <p className=" text-red-500 font-bold text-center p-2">
        هنوز فایلی بارگذاری نشده
      </p>
    </div>
  );
}

export default NullFile;
