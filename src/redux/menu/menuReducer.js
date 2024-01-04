const initialState = {
  isOpen: false,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISPATCH_MENU_STATE":
      return {
        isOpen: action.payload,
      };
    default:
      return state;
  }
};

export default menuReducer;
