import React from "react";

const User = ({ avatar, name, date }) => {
  return (
    <div className="flex flex-col gap-1 text-xs pl-2">
      <div className="flex-1 flex gap-4 items-center">
        <img className="w-12 h-12 rounded-[50%]" src={avatar} alt="" />
        <div className="flex-1 font-bold text-c-5">{name}</div>
      </div>
      <div className="text-c-10 mr-16">{date}</div>
    </div>
  );
};

export default User;
