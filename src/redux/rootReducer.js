import { combineReducers } from "redux";
import loginReducer from "./register/loginReducer";

const rootReducer = combineReducers({
  authState: loginReducer,
});

export default rootReducer;