const initialState = {
  userData: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return {
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default loginReducer;
