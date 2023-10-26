import React from "react";
import NotifIcon from "@assets/svg/topbar/notif.svg";
import UserIcon from "@assets/svg/topbar/user.svg";
import DownIcon from "@assets/svg/topbar/down.svg";

export function Topbar() {
  return (
    <header className=" flex justify-between bg-white w-full rounded-3xl p-7">
      <h1 className=" text-[#0D294E] font-extrabold flex items-center">
        محمد محمدی گرامی
      </h1>
      <div className=" flex gap-10">
        <button className=" flex items-center ">
          <img className=" pl-2" src={NotifIcon} alt="notif" />
          <h2 className=" font-normal text-sm text-[#0D294E]">اعلانات</h2>
        </button>
        <button className=" flex items-center ">
          <img
            className=" ml-2 w-10 h-10 bg-s-1 p-1 rounded-full"
            src={UserIcon}
            alt="notif"
          />
          <img className=" " src={DownIcon} alt="notif" />
        </button>
      </div>
    </header>
  );
}
