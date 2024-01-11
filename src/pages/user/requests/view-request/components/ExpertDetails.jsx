import React, { useEffect } from "react";
import useRequests from "../../../../../hooks/useRequests";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

function ExpertDetails({ requestId }) {
  const {
    response: expertResponse,
    error: expertError,
    loading: expertLoading,
    getRequest: getExpert,
  } = useRequests({
    url: `/v1/get_expert/${requestId}`,
  });

  useEffect(() => {
    getExpert();
  }, []);

  return (
    <div className=" w-1/3 h-fit rounded-lg p-4 bg-white">
      <h1 className=" p-2 font-extrabold"> کارشناس</h1>
      <div className=" flex justify-center">
        <hr className="w-full border-[1px] border-dashed border-g-2" />
      </div>
      <div className="relative w-full p-2">
        <p className=" p-2 font-bold">
          نام و نام خانوادگی :
          <span className=" text-g-6 font-semibold">
            {" "}
            {expertResponse?.[0].expert.name}{" "}
            {expertResponse?.[0].expert.family}
          </span>
        </p>

        <p className=" p-2 font-bold">
          شماره تلفن :
          <span className=" text-g-6 font-semibold">
            {" "}
            {expertResponse?.[0].expert.phone}
          </span>
        </p>
        {!expertResponse && (
          <div className=" absolute top-0 left-0 backdrop-blur-[1px] bg-opacity-5 z-50 flex justify-center items-center w-full h-full">
            <ClipLoader color="#F99D27" />
          </div>
        )}
      </div>
      <div className=" w-full flex gap-2 text-center">
        <Link
          to={`/user/current-requests`}
          className=" w-full p-2 border-2 font-semibold border-primary text-primary rounded-lg hover:text-white hover:bg-primary transition"
        >
          مشاهده مدارک
        </Link>
        <Link
          to={`/user/current-requests`}
          className=" w-full p-2 border-2 font-semibold border-secondary text-secondary rounded-lg hover:text-white hover:bg-secondary transition"
        >
          بازگشت
        </Link>
      </div>
    </div>
  );
}

export default ExpertDetails;
