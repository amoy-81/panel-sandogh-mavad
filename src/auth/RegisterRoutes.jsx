import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RegisterRoutes({ children }) {
  const token = localStorage.getItem("token");
  const isLogged = token ? true : false;

  // states
  const authState = useSelector((state) => state.authState.userData);

  if (authState || isLogged) return <Navigate to={`/user/dashboard`} />;
  if (!authState && !isLogged) return children;
}

export default RegisterRoutes;
