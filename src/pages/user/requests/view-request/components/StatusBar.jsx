import React, { useEffect, useState } from "react";
import useRequests from "../../../../../hooks/useRequests";
import { useLocation } from "react-router-dom";
import requestStatusConvert from "../../../../../helper/requestStatusConvert";

function StatusBar({ requestId }) {
  const { pathname } = useLocation();
  const {
    response: statusResponse,
    error: statusError,
    loading: statusLoading,
    getRequest: getStatus,
  } = useRequests({
    url: `/v1/get_all_status/${requestId}`,
  });

  const [statusNames, setStatusNames] = useState(null);

  useEffect(() => {
    getStatus();
  }, [pathname]);

  useEffect(() => {
    if (statusResponse) {
      const wfStatus = ["check", "assessment", "report", "commite", "credit"];
      const bStatus = [
        "check",
        "wage",
        "evidence",
        "check_evidence",
        "agreement",
      ];
      setStatusNames(statusResponse.type === "bond" ? bStatus : wfStatus);
    }
  }, [statusResponse]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center">
        <p
          className={
            statusResponse?.check
              ? "bg-s-2 p-0.5 pt-1 px-3 rounded-xl  text-secondary "
              : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
          }
        >
          1
        </p>
        <p
          className={
            statusResponse?.check
              ? " text-secondary font-bold mx-2 text-sm"
              : "text-gray-300 font-bold mx-2 text-sm"
          }
        >
          {requestStatusConvert(statusNames?.[0])}
        </p>
      </div>
      <div className="w-10 px-2">
        <div
          className={
            statusResponse?.assessment || statusResponse?.wage
              ? "border-t border-2  border-secondary h-full rounded"
              : "border-t border-2 border-gray-300 h-full rounded"
          }
        ></div>
      </div>
      <div className="flex items-center">
        <p
          className={
            statusResponse?.assessment || statusResponse?.wage
              ? "bg-s-2 p-0.5 pt-1 px-3 rounded-xl  text-secondary "
              : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
          }
        >
          2
        </p>
        <p
          className={
            statusResponse?.assessment || statusResponse?.wage
              ? " text-secondary font-bold mx-2 text-sm"
              : "text-gray-300 font-bold mx-2 text-sm"
          }
        >
          {" "}
          {requestStatusConvert(statusNames?.[1])}
        </p>
      </div>
      <div className="w-10 px-2">
        <div
          className={
            statusResponse?.report || statusResponse?.evidence
              ? "border-t border-2  border-secondary h-full rounded"
              : "border-t border-2 border-gray-300 h-full rounded"
          }
        ></div>
      </div>
      <div className="flex items-center">
        <p
          className={
            statusResponse?.report || statusResponse?.evidence
              ? "bg-s-2 p-0.5 pt-1 px-3 rounded-xl  text-secondary "
              : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
          }
        >
          3
        </p>
        <p
          className={
            statusResponse?.report || statusResponse?.evidence
              ? " text-secondary font-bold mx-2 text-sm"
              : "text-gray-300 font-bold mx-2 text-sm"
          }
        >
          {requestStatusConvert(statusNames?.[2])}
        </p>
      </div>
      <div className="w-10 px-2">
        <div
          className={
            statusResponse?.commite || statusResponse?.check_evidence
              ? "border-t border-2  border-secondary h-full rounded"
              : "border-t border-2 border-gray-300 h-full rounded"
          }
        ></div>
      </div>
      <div className="flex items-center">
        <p
          className={
            statusResponse?.commite || statusResponse?.check_evidence
              ? "bg-s-2 p-0.5 pt-1 px-3 rounded-xl  text-secondary "
              : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
          }
        >
          4
        </p>
        <p
          className={
            statusResponse?.commite || statusResponse?.check_evidence
              ? " text-secondary font-bold mx-2 text-sm"
              : "text-gray-300 font-bold mx-2 text-sm"
          }
        >
          {requestStatusConvert(statusNames?.[3])}
        </p>
      </div>
      <div className="w-10 px-2">
        <div
          className={
            statusResponse?.committee || statusResponse?.agreement
              ? "border-t border-2  border-secondary h-full rounded"
              : "border-t border-2 border-gray-300 h-full rounded"
          }
        ></div>
      </div>
      <div className="flex items-center">
        <p
          className={
            statusResponse?.committee || statusResponse?.agreement
              ? "bg-s-2 p-0.5 pt-1 px-3 rounded-xl  text-secondary "
              : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
          }
        >
          5
        </p>
        <p
          className={
            statusResponse?.committee || statusResponse?.agreement
              ? " text-secondary font-bold mx-2 text-sm"
              : "text-gray-300 font-bold mx-2 text-sm"
          }
        >
          {requestStatusConvert(statusNames?.[4])}
        </p>
      </div>
    </div>
  );
}

export default StatusBar;
