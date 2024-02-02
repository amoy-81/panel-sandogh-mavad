import { Link } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import useRequests from "../../../hooks/useRequests";
import { useEffect } from "react";
import { onlyDateConversion } from "../../../helper/dateConversion";
import useAuth from "../../../auth/useAuth";
import requestStatusConvert from "../../../helper/requestStatusConvert";

function ExpertCurrentRequests() {
  const { userData } = useAuth();
  const {
    response: currentRequestsRes,
    error: currentRequestsErr,
    loading: currentRequestsLoading,
    getRequest: getCurrentRequests,
  } = useRequests({ url: `/admin/get_current_requests/${userData.id}` });

  const {
    response: allRes,
    error: AllRequestsErr,
    loading: AllRequestsLoading,
    getRequest: getAllRequests,
  } = useRequests({ url: `/admin/get_request_with_expert/${userData.id}` });

  useEffect(() => {
    getCurrentRequests();
    getAllRequests();
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
              <div key={item.request.id} className="p-3 w-1/3">
                <Link
                  to={`/${
                    userData.type === "genuine" || userData.type === "legal"
                      ? "user"
                      : userData.type
                  }/check-request/${item.request.id}`}
                >
                  <div className="bg-white rounded-xl p-4  ">
                    <div className="flex justify-between">
                      <p className="text-sm">
                        {onlyDateConversion(item.request.created_at)}
                      </p>
                    </div>
                    <p className="font-bold text-sm pt-2 ">
                      {item.request.type === "facilities"
                        ? "درخواست تسهیلات"
                        : item.request.type === "warranty"
                        ? "درخواست ضمانت"
                        : "درخواست حد اعتباری"}
                    </p>
                    {item.request.facilities?.length > 0 && (
                      <p className="font-bold text-sm pt-2 ">{`عنوان : ${item.request.facilities[0].title}`}</p>
                    )}
                    {item.request.warranty?.length > 0 && (
                      <p className="font-bold text-sm pt-2 ">{`عنوان : ${item.request.warranty[0].title}`}</p>
                    )}
                    {item.request.bond?.length > 0 && (
                      <p className="font-bold text-sm pt-2 ">{`عنوان : ${item.request.bond[0].title}`}</p>
                    )}
                    <p className="font-bold text-xs text-gray-400 pb-2 ">
                      شناسه درخواست : {item.request.shenaseh}
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

export default ExpertCurrentRequests;
