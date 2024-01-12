import { useEffect } from "react";
import useRequests from "../../../../hooks/useRequests";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserInformation from "../components/UserInformation";
import StatusBar from "../../../user/requests/view-request/components/StatusBar";

function CheckRequestLayout({ children }) {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const {
    response: viewRequestResponse,
    error: viewRequestError,
    loading: viewRequestLoading,
    getRequest: getviewRequest,
  } = useRequests({
    url: `/v1/get_last_state?request_id=${requestId}`,
  });

  const {
    response: allStatusResponse,
    error: allStatusError,
    loading: allStatusLoading,
    getRequest: getallStatus,
  } = useRequests({
    url: `/v1/get_all_status/${requestId}`,
  });

  const {
    response: showUserResponse,
    error: showUserError,
    loading: showUserLoading,
    getRequest: getshowUser,
  } = useRequests({
    url: `/v1/show_user/${allStatusResponse?.user_id}`,
  });

  // api call
  useEffect(() => {
    getviewRequest();
    getallStatus();
  }, []);

  // redirect
  useEffect(() => {
    const wfStatus = ["check", "assessment", "report", "commite", "credit"];
    const bStatus = [
      "check",
      "wage",
      "evidence",
      "check_evidence",
      "agreement",
    ];

    if (viewRequestResponse && allStatusResponse) {
      getshowUser();
      console.log(showUserResponse);
      const statusIndex =
        allStatusResponse?.type === "bond"
          ? bStatus.findIndex((e) => e === viewRequestResponse.status)
          : wfStatus.findIndex((e) => e === viewRequestResponse.status);

      console.log(viewRequestResponse.status === "committee");
      if (viewRequestResponse.status === "committee") {
        return navigate(`/expert/check-request/credit/${requestId}`);
      }
      if (viewRequestResponse.status === "agreement") {
        return navigate(`/expert/check-request/agreement/${requestId}`);
      }

      if (statusIndex === -1) {
        navigate(`/expert/check-request/check/${requestId}`);
      } else {
        navigate(
          `/expert/check-request/${
            allStatusResponse?.type === "bond"
              ? bStatus[
                  statusIndex + 1 === bStatus.length
                    ? statusIndex
                    : statusIndex + 1
                ]
              : wfStatus[
                  statusIndex + 1 === wfStatus.length
                    ? statusIndex
                    : statusIndex + 1
                ]
          }/${requestId}`
        );
      }
    }
  }, [viewRequestResponse, allStatusResponse]);

  useEffect(() => {
    if (viewRequestError || allStatusError) {
      toast.error("خطادر برقراری ارتباط");
      navigate(`/expert/current-requests`);
    }
  }, [viewRequestError, allStatusError]);
  return (
    <div className=" px-6">
      <div className=" py-6">
        <p className="text-xl font-extrabold text-backColor">مشاهده درخواست</p>
      </div>
      <StatusBar requestId={requestId} />
      <div className="flex w-full mt-5">
        <div className="w-2/3 max-lg:w-full p-2 ">
          <Outlet />
        </div>
        <UserInformation
          requestType={
            allStatusResponse?.type ? allStatusResponse?.type : "bond"
          }
          requestId={requestId}
          showUserResponse={showUserResponse}
        />
      </div>
    </div>
  );
}

export default CheckRequestLayout;
