import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { userLoginSuccess } from "../redux/register/loginAction";

function PrivateRoutes({ children }) {
  // tools
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const pathType = pathname.split("/")[1];

  const token = localStorage.getItem("token");
  const isLogged = token ? true : false;

  // states
  const authState = useSelector((state) => state.authState.userData);

  // user logged
  if (
    authState &&
    (((authState?.type === "genuine" || authState?.type === "legal") &&
      pathType === "user") ||
      (authState?.type === "expert" && pathType === "expert") ||
      (authState?.type === "admin" && pathType === "admin"))
  ) {
    return children;
  } else if (authState && authState?.type) {
    return <Navigate to={`/${authState?.type}/dashboard`} />;
  }

  // only local storage
  if (!authState && isLogged) {
    const fakeRes = {
      name: "Local",
      token: "aaaaaaaaaaa",
      type: "genuine",
      family: "Storage",
    };
    dispatch(userLoginSuccess(fakeRes));
    return children;
  }

  // not Login
  if (!authState && !isLogged) return <Navigate to={"/auth/login"} />;
}

export default PrivateRoutes;
