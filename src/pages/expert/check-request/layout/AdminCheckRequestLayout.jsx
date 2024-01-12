import { useEffect } from "react";
import useRequests from "../../../../hooks/useRequests";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserInformation from "../components/UserInformation";
import StatusBar from "../../../user/requests/view-request/components/StatusBar";

function AdminCheckRequestLayout({ children }) {
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

  useEffect(() => {
    if (allStatusResponse) {
        getshowUser()
    }
  } , [allStatusResponse])

  // api call
  useEffect(() => {
    getviewRequest();
    getallStatus();
  }, []);

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
          {children}
        </div>
        <UserInformation showUserResponse={showUserResponse} />
      </div>
    </div>
  );
}

export default AdminCheckRequestLayout;
