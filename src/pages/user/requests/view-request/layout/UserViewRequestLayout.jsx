import React from "react";
import { Outlet, useParams } from "react-router-dom";
import ExpertDetails from "../components/ExpertDetails";
import StatusBar from "../components/StatusBar";
import Loader from "../../../../../components/loader/Loader";

function UserViewRequestLayout() {
  const { requestId } = useParams();
  return (
    <div className="px-5">
      {/* loading */}
      {/* {viewRequestLoading && <Loader />} */}
      <div className=" py-6">
        <p className="text-xl font-extrabold">بررسی درخواست </p>
      </div>
      <StatusBar requestId={requestId} />
      <div className="flex w-full mt-5">
        <div className="w-2/3 p-2 ">
          <Outlet />
        </div>
        {/* <ExpertDetails expert={viewRequestResponse.expert_assignment.expert}/> */}
        <ExpertDetails requestId={requestId} />
      </div>
    </div>
  );
}

export default UserViewRequestLayout;
