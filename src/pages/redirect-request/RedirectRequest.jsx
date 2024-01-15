import { useNavigate, useParams } from "react-router-dom";
import useRequests from "../../hooks/useRequests";
import { useEffect } from "react";
import useAuth from "../../auth/useAuth";

function RedirectRequest() {
  const { userData } = useAuth();
  const { requestId } = useParams();
  const navigate = useNavigate();

  const {
    response: statusResponse,
    error: statusError,
    getRequest: getStatus,
  } = useRequests({
    url: `/v1/get_all_status/${requestId}`,
  });

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    if (statusResponse) {
      const reqType = statusResponse.type;
      const userType = userData.type;

      //   user
      if (userType === "genuine" || userType === "legal") {
        navigate(
          reqType === "bond"
            ? statusResponse.wage && !statusResponse.evidence
              ? `/user/current-requests`
              : `/user/view-requests/bond/${requestId}`
            : `/user/view-requests/wf/${requestId}`
        );
      }

      //   expert
      if (userType === "expert") {
        navigate(`/expert/check-request/${requestId}`);
      }

      //   admin
      if (userType === "admin") {
        navigate(`/admin/admin-check-request/${requestId}`);
      }
    }
  }, [statusResponse]);

  useEffect(() => {
    if (statusError) {
      navigate("/auth/login");
    }
  }, [statusError]);

  return <div className=" p-4 text-center h-screen">درحال بررسی...</div>;
}

export default RedirectRequest;
