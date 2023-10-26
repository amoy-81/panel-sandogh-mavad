import React, { useState } from "react";

import DownIcon from "@assets/svg/sidebar/downIcon.svg";
import { Link } from "react-router-dom";

function Dropdown({ title, icon, drop, links }) {
  const [isDown, setIsDown] = useState(false);
  return (
    <li
      className={` mt-2 rounded-3xl overflow-hidden transition-colors ${
        isDown ? `bg-p-2` : `hover:bg-p-1`
      }`}
    >
      <div
        onClick={() => setIsDown((prev) => !prev)}
        className=" flex items-center justify-between p-3 cursor-pointer"
      >
        <div className=" flex items-center">
          <img className=" ml-2" src={icon} alt="" />
          <h2 className=" ml-2">{title}</h2>
        </div>
        <img
          className={isDown ? " transition rotate-180" : "transition"}
          src={DownIcon}
          alt="down"
        />
      </div>
      <div
        className={`flex flex-col transition ${
          isDown ? ` translate-y-0` : `translate-y-[-35px]`
        }`}
      >
        {isDown &&
          drop.map((item, index) => (
            <Link to={links[index]} key={index} className=" text-sm p-3 pr-6">
              {item}
            </Link>
          ))}
      </div>
    </li>
  );
}

export default Dropdown;
