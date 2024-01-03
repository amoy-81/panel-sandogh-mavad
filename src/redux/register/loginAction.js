const userLoginSuccess = (data) => {
  return {
    type: "USER_LOGIN_SUCCESS",
    payload: data,
  };
};

const userLogout = () => {
  return {
    type: "USER_LOGOUT",
  };
};

export { userLoginSuccess , userLogout };
