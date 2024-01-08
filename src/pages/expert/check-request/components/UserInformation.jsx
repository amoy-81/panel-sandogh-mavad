import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function UserInformation({ showUserResponse }) {
  const navigate = useNavigate();
  return (
    <div className=" w-1/3 max-lg:w-full p-4 bg-white rounded-xl">
      <h1 className=" p-2 font-extrabold">اطلاعات کاربر</h1>
      <div className="relative w-full p-2">
        <div className=" flex justify-center">
          <hr className=" w-11/12 border-[1px] border-dashed border-g-2" />
        </div>
        <p className=" p-2 font-bold">
          نام و نام خانوادگی :
          <span className=" text-g-6 font-semibold">
            {" "}
            {showUserResponse?.name} {showUserResponse?.family}
          </span>
        </p>

        <p className=" p-2 font-bold">
          شماره تلفن :
          <span className=" text-g-6 font-semibold">
            {" "}
            {showUserResponse?.phone}
          </span>
        </p>
        {!showUserResponse && (
          <div className=" absolute top-0 left-0 backdrop-blur-[1px] bg-opacity-5 z-50 flex justify-center items-center w-full h-full">
            <ClipLoader color="#F99D27" />
          </div>
        )}
      </div>
      <div className=" w-full flex gap-2 text-center">
        <Link
          to={`/مشاهده مدارک`}
          className=" w-full p-2 border-2 font-semibold border-[#B9393A] text-[#B9393A] rounded-lg hover:text-white hover:bg-[#B9393A] transition"
        >
          ناقصی مدارک
        </Link>
        <Link
          to={`/مشاهده مدارک`}
          className=" w-full p-2 border-2 font-semibold border-secondary text-secondary rounded-lg hover:text-white hover:bg-secondary transition"
        >
          مشاهده مدارک
        </Link>
      </div>
      <div className=" w-full mt-2 text-center">
        <button
          onClick={() => navigate(-1)}
          className=" w-full p-2 border-2 font-semibold border-secondary text-secondary hover:text-white hover:bg-secondary rounded-lg transition"
        >
          بازگشت
        </button>
      </div>
    </div>
  );
}

export default UserInformation;
