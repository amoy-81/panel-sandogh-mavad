import React, { useEffect } from "react";
import useRequests from "../../../../../hooks/useRequests";

function StatusBar({ requestId }) {
  const {
    response: statusResponse,
    error: statusError,
    loading: statusLoading,
    getRequest: getStatus,
  } = useRequests({
    url: `/v1/get_all_status/${requestId}`,
  });

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center">
        <p
          className={
            statusResponse?.check
              ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
              : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
          }
        >
          1
        </p>
        <p
          className={
            statusResponse?.check
              ? "text-blue-800 font-bold mx-2 text-sm"
              : "text-gray-300 font-bold mx-2 text-sm"
          }
        >
          بررسی مدارک
        </p>
      </div>
      <div className="w-10 px-2">
        <div
          className={
            statusResponse?.assessment
              ? "border-t border-2 border-blue-800 h-full rounded"
              : "border-t border-2 border-gray-300 h-full rounded"
          }
        ></div>
      </div>
      <div className="flex items-center">
        <p
          className={
            statusResponse?.assessment
              ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
              : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
          }
        >
          2
        </p>
        <p
          className={
            statusResponse?.assessment
              ? "text-blue-800 font-bold mx-2 text-sm"
              : "text-gray-300 font-bold mx-2 text-sm"
          }
        >
          {" "}
          ارزیابی{" "}
        </p>
      </div>
      <div className="w-10 px-2">
        <div
          className={
            statusResponse?.report
              ? "border-t border-2 border-blue-800 h-full rounded"
              : "border-t border-2 border-gray-300 h-full rounded"
          }
        ></div>
      </div>
      <div className="flex items-center">
        <p
          className={
            statusResponse?.report
              ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
              : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
          }
        >
          3
        </p>
        <p
          className={
            statusResponse?.report
              ? "text-blue-800 font-bold mx-2 text-sm"
              : "text-gray-300 font-bold mx-2 text-sm"
          }
        >
          گزارش ارزیابی
        </p>
      </div>
      <div className="w-10 px-2">
        <div
          className={
            statusResponse?.commite
              ? "border-t border-2 border-blue-800 h-full rounded"
              : "border-t border-2 border-gray-300 h-full rounded"
          }
        ></div>
      </div>
      <div className="flex items-center">
        <p
          className={
            statusResponse?.commite
              ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
              : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
          }
        >
          4
        </p>
        <p
          className={
            statusResponse?.commite
              ? "text-blue-800 font-bold mx-2 text-sm"
              : "text-gray-300 font-bold mx-2 text-sm"
          }
        >
          کمیته
        </p>
      </div>
      <div className="w-10 px-2">
        <div
          className={
            statusResponse?.credit
              ? "border-t border-2 border-blue-800 h-full rounded"
              : "border-t border-2 border-gray-300 h-full rounded"
          }
        ></div>
      </div>
      <div className="flex items-center">
        <p
          className={
            statusResponse?.credit
              ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
              : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
          }
        >
          5
        </p>
        <p
          className={
            statusResponse?.credit
              ? "text-blue-800 font-bold mx-2 text-sm"
              : "text-gray-300 font-bold mx-2 text-sm"
          }
        >
          اعلام حد اعتباری
        </p>
      </div>
    </div>
  );
}

export default StatusBar;
