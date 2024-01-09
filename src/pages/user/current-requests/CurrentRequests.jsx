import { Link } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import useRequests from "../../../hooks/useRequests";
import { useEffect } from "react";
import { onlyDateConversion } from "../../../helper/dateConversion";
import useAuth from "../../../auth/useAuth";
import requestStatusConvert from "../../../helper/requestStatusConvert";

function CurrentRequests() {
  const { userData } = useAuth();
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
                <Link
                  to={
                    item.type === "bond"
                      ? item.status === "wage"
                        ? `/user/warranty-complet/${item.bond[0].id}`
                        : `/user/view-requests/bond/${item.id}`
                      : `/${
                          userData.type === "genuine" ||
                          userData.type === "legal"
                            ? "user"
                            : userData.type
                        }/view-requests/wf/${item.id}`
                  }
                >
                  <div className="bg-white rounded-xl p-4  ">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <p className="bg-s-2 p-0.5 pt-1 px-2 rounded-lg text-secondary text-xs">
                          وضعیت:
                        </p>
                        <p className={"text-blue-800 font-bold mx-2 text-xs"}>
                          {item.status && requestStatusConvert(item.status)}
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
                        ? "درخواست حد اعتباری"
                        : "درخواست ضمانت"}
                    </p>
                    {item.facilities.length > 0 && (
                      <p className="font-bold text-sm pt-2 ">{`عنوان : ${item.facilities[0].title}`}</p>
                    )}
                    {item.warranty.length > 0 && (
                      <p className="font-bold text-sm pt-2 ">{`عنوان : ${item.warranty[0].title}`}</p>
                    )}
                    {item.bond.length > 0 && (
                      <p className="font-bold text-sm pt-2 ">{`عنوان : ${item.bond[0].title}`}</p>
                    )}

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
