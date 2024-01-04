import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { userLoginSuccess } from "../redux/register/loginAction";
import { httpService } from "../core/http-service";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { isJson } from "../helper/isJson";

function PrivateRoutes({ children }) {
  // tools
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pathType = pathname.split("/")[1];

  const token = localStorage.getItem("token");
  const isLogged = token ? true : false;

  // states
  const authState = useSelector((state) => state.authState.userData);

  const [isLoading, setIsLoading] = useState(false);
  // not Login
  useEffect(() => {
    if (!authState && !isLogged) {
      navigate("/auth/login", { state: pathname });
    }
  }, []);

  // user logged
  if (
    authState &&
    (((authState?.type === "genuine" || authState?.type === "legal") &&
      pathType === "user") ||
      (authState?.type === "expert" && pathType === "expert") ||
      (authState?.type === "admin" && pathType === "admin"))
  ) {
    return children;
  }

  if (authState && authState?.type) {
    navigate(`/${authState?.type}/dashboard`);
  }

  // only local storage
  if (!authState && isLogged) {
    httpService
      .get("/v1/get_user_with_token", {
        headers: {
          authorization: `bearer ${isJson(token) ? JSON.parse(token) : token}`,
        },
      })
      .then((response) => {
        dispatch(userLoginSuccess(response.data));
        return children;
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate('/auth/login')
      });
  }
}

export default PrivateRoutes;
