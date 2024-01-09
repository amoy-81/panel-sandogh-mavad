import React, { useEffect } from "react";
import UserIcon from "@assets/png/user.png";
import useRequests from "../../../../../hooks/useRequests";

function ExpertDetails({ requestId }) {
  // const {
  //   response: expertResponse,
  //   error: expertError,
  //   loading: expertLoading,
  //   getRequest: getExpert,
  // } = useRequests({
  //   url: `/v1/get_expert/${requestId}`,
  // });

  // useEffect(() => {
  //   getExpert();
  // }, []);

  // console.log(expertResponse)
  return (
    <div className=" w-1/3 p-4 bg-white">
      <h1 className=" p-2 font-extrabold"> کارشناس</h1>
      <div className=" flex gap-4 items-center py-4 pb-6">
        <img src={UserIcon} className=" w-14 h-14" alt="user" />
        <h1>علی مویدی</h1>
      </div>
      <div className=" w-full p-2">
        <p className=" p-2 text-g-6">شغل : {"برنامه نویس"}</p>
        <div className=" flex justify-center">
          <hr className="w-3/4 border-[1px] border-dashed border-g-2" />
        </div>
      </div>
      <div className=" w-full p-2">
        <p className=" p-2 text-g-6">شغل : {"برنامه نویس"}</p>
        <div className=" flex justify-center">
          <hr className="w-3/4 border-[1px] border-dashed border-g-2" />
        </div>
      </div>
      <div className=" w-full p-2">
        <p className=" p-2 text-g-6">شغل : {"برنامه نویس"}</p>
        <div className=" flex justify-center">
          <hr className="w-3/4 border-[1px] border-dashed border-g-2" />
        </div>
      </div>
      <div className=" w-full p-2">
        <p className=" p-2 text-g-6">شغل : {"برنامه نویس"}</p>
        <div className=" flex justify-center">
          <hr className="w-3/4 border-[1px] border-dashed border-g-2" />
        </div>
      </div>
    </div>
  );
}

export default ExpertDetails;
