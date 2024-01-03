import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/register/loginAction";

function useAuth() {
  // get userdata
  const authState = useSelector((state) => state.authState.userData);
  const dispatch = useDispatch();

  const [isLogged, setIsLogged] = useState(false);

  // change isLogged state
  useEffect(() => {
    if (authState !== null) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [authState]);

  // logout
  const logout = () => {
    dispatch(userLogout());
  };

  return { userData: authState, isLogged, logout };
}

export default useAuth;
