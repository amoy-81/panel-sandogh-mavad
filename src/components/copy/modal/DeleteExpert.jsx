import React, { useEffect } from "react";
import useRequests from "../../../hooks/useRequests";
import Loader from "../../loader/Loader";

export default function DeleteExpert({ expertData, close }) {
  const {
    response: deleteExpertRes,
    error: deleteExpertErr,
    loading: deleteExpertLoading,
    deleteRequest: deleteExpert,
  } = useRequests({ url: `/admin/expert/${expertData.id}` });

  useEffect(() => {
    if (deleteExpertRes) {
      close(false);
    }
  }, []);

  const confirmHandler = () => {
    deleteExpert();
  };
  if (deleteExpertLoading) return <Loader />;

  return (
    <div className="bg-gradient-to-b z-10 from-gray-600 to-transparent fixed inset-0 flex items-center justify-center">
      <div className="w-96 bg-white z-10 rounded-lg p-4 shadow-lg flex flex-col gap-4">
        <p className="text-center font-bold my-3 mb-1">
          آیا مایل به حذف کارشناس{" "}
          <span className="text-red-400">{`${expertData.name} ${expertData.family}`}</span>{" "}
          هستید؟
        </p>
        <p className="text-center my-3 mb-1">برای حذف روی تایید کلیک کنید</p>
        <div className="flex">
          <button
            onClick={() => close(null)}
            className="w-full m-1 rounded-lg border border-redColor mt-2 text-redColor p-3 font-bold text-xs"
          >
            بستن
          </button>
          <button
            onClick={confirmHandler}
            className="w-full m-1 rounded-lg bg-s-7 mt-2  text-white p-3 font-bold text-xs"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}
