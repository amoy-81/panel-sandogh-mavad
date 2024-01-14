import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import useRequests from "../hooks/useRequests";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/loader/Loader";

function CompleteInformationProvider({ children }) {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const {
    response: ProfileGenuineRes,
    error: ProfileGenuineErr,
    loading: ProfileGenuineLoading,
    getRequest: getProfileGenuine,
  } = useRequests({ url: "/v1/is_profile_genuine" });

  const {
    response: ProfileLegalRes,
    error: ProfileLegalErr,
    loading: ProfileLegalLoading,
    getRequest: getProfileLegal,
  } = useRequests({ url: "/v1/is_profile_legal" });

  useEffect(() => {
    if (userData.type === "genuine") {
      getProfileGenuine();
    } else {
      getProfileLegal();
    }
  }, []);

  useEffect(() => {
    if (ProfileGenuineRes !== null || ProfileLegalRes !== null) {
      if (userData.type === "genuine" && !ProfileGenuineRes) {
        toast.error("برای ثبت درخواست ابتدا اطلاعات خود را کامل نمایید");
        navigate("/user/record_genuine_profile");
      } else if (userData.type === "legal" && !ProfileLegalRes) {
        toast.error("برای ثبت درخواست ابتدا اطلاعات خود را کامل نمایید");
        navigate("/user/record_legal_profile");
      }
    }
  }, [ProfileGenuineRes, ProfileLegalRes]);

  if (ProfileGenuineLoading || ProfileLegalLoading) return <Loader />

  return children;
}

export default CompleteInformationProvider;
