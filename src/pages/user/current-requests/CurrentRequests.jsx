import { Link } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import useRequests from "../../../hooks/useRequests";
import { useEffect } from "react";
import { onlyDateConversion } from "../../../helper/dateConversion";

function CurrentRequests() {
  const {
    response: currentRequestsRes,
    error: currentRequestsErr,
    loading: currentRequestsLoading,
    getRequest: getCurrentRequests,
  } = useRequests({ url: "/v1/get_current_request_user" });

  useEffect(() => {
    getCurrentRequests();
  }, []);

  return (
    <div className="px-6">
      <div className=" py-6">
        <p className="text-xl font-extrabold text-backColor">
          {" "}
          درخواست های جاری
        </p>
      </div>
      <div className=" relative flex flex-wrap ">
        {currentRequestsLoading && <Loader />}
        {currentRequestsRes &&
          currentRequestsRes.map((item) => {
            return (
              <div key={item.id} className="p-3 w-1/3">
                <Link to={`/panel/viewRequest/${item.id}`}>
                  <div className="bg-white rounded-xl p-4  ">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <p className="bg-blue-200 p-0.5 pt-1 px-2 rounded-lg text-blue-800 text-xs">
                          وضعیت:
                        </p>

                        {/* {رنگا و اسماشون مونده} */}
                        <p
                          className={
                            item.status === "null" || item.status === null
                              ? "text-yellow-400 font-bold mx-2 text-xs"
                              : item.status === "check"
                              ? "text-blue-800 font-bold mx-2 text-xs"
                              : item.status === "assessment"
                              ? "text-blue-800 font-bold mx-2 text-xs"
                              : item.status === "committee"
                              ? "text-blue-800 font-bold mx-2 text-xs"
                              : item.status === "credit"
                              ? "text-green-400 font-bold mx-2 text-xs"
                              : "text-blue-800 font-bold mx-2 text-xs"
                          }>
                          {item.status === "null" || item.status === null
                            ? "در انتظار بررسی"
                            : item.status === "check"
                            ? "بررسی مدارک"
                            : item.status === "assessment"
                            ? "ارزیابی"
                            : item.status === "report"
                            ? "گزارش ارزیابی"
                            : item.status === "committee"
                            ? "کمیته"
                            : item.status === "credit"
                            ? "اعلام حد اعتباری"
                            : "در حال بررسی"}
                        </p>
                      </div>
                      <p className="text-sm">
                        {onlyDateConversion(item.created_at)}
                      </p>
                    </div>
                    <p className="font-bold text-sm pt-2 ">
                      {item.type === "facilities"
                        ? "درخواست تسهیلات"
                        : item.type === "warranty"
                        ? "درخواست ضمانت"
                        : "درخواست"}
                      {item.facilities[0] !== undefined && (
                        <p className="font-bold text-sm pt-2 ">{`عنوان : ${item.facilities[0].title}`}</p>
                      )}
                      {item.warranty[0] !== undefined && (
                        <p className="font-bold text-sm pt-2 ">{`عنوان : ${item.warranty[0].title}`}</p>
                      )}
                    </p>
                    {/* <p className="font-bold text-xs text-gray-400 pb-2 ">
                      درخواست دهنده: {item.user.name} {item.user.family}
                    </p> */}
                    <p className="font-bold text-xs text-gray-400 pb-2 ">
                      شناسه درخواست : {item.shenaseh}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CurrentRequests;
