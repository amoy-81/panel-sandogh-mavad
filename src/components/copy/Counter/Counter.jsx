import React from "react";

const Counter = ({ logo, title, number }) => {
  return (
    <div className="px-8 py-6 bg-white rounded-2xl flex gap-4">
      <div className="w-c-18 h-c-18 flex justify-center items-center bg-c-15 rounded-full">
        <img src={logo} alt='counter logo' />
      </div>
      <div className=" flex-1 flex flex-col font-bold">
        <div className="text-c-lg">{number}</div>
        <div className="text-xs text-c-8">{title}</div>
      </div>
    </div>
  );
};

export default Counter;
