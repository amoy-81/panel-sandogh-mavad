import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../auth/useAuth";
import useRequests from "../../../hooks/useRequests";
import Loader from "../../../components/loader/Loader";

export default function FailedRequests() {
  const { userData } = useAuth();
  const {
    response: currentRequestsRes,
    error: currentRequestsErr,
    loading: currentRequestsLoading,
    getRequest: getCurrentRequests,
  } = useRequests({ url: `/admin/get_failed` });

  useEffect(() => {
    getCurrentRequests();
  }, []);

  return (
    <div>
      <div className=" py-6">
        <p className="text-xl font-extrabold">درخواست های رد شده</p>
      </div>
      <div className="flex flex-wrap ">
        {currentRequestsLoading && <Loader />}
        {currentRequestsRes &&
          currentRequestsRes.map((item) => {
            // console.log(item);
            return (
              <Link
                to={`/${userData.type}/dashboard`}
                style={{ textDecoration: "none" }}
                className="p-3 w-1/3"
              >
                <div key={item.id} className="w-full">
                  <div className="bg-white rounded-xl p-4 flex flex-col ">
                    <div>
                      <p>
                        درخواست :{" "}
                        <span className="text-gray-500 p-1">
                          {item.request.type === "facilities"
                            ? "تسهیلات"
                            : "ضمانت"}
                        </span>
                      </p>
                    </div>
                    <p>
                      شناسه درخواست :{" "}
                      <span className="text-blue-500">
                        {item.request.shenaseh}
                      </span>
                    </p>
                    <div className="flex justify-around"></div>
                  </div>
                </div>
              </Link>
            );
          })}
        {!currentRequestsRes?.length && (
          <div className="w-full mt-[50px] flex justify-center">
            <p>درخواستی وجود ندارد</p>
          </div>
        )}
      </div>
    </div>
  );
}
