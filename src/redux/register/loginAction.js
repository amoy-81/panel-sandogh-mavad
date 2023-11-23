const userLoginSuccess = (data) => {
  return {
    type: "USER_LOGIN_SUCCESS",
    payload: data,
  };
};

export { userLoginSuccess };
