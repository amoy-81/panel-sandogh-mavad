import { combineReducers } from "redux";
import loginReducer from "./register/loginReducer";
import menuReducer from "./menu/menuReducer";

const rootReducer = combineReducers({
  authState: loginReducer,
  menuState: menuReducer,
});

export default rootReducer;
