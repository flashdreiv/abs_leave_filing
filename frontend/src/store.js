import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userSignupReducer } from "./reducers/userReducers";
import { LeaveFilingReducer } from "./reducers/LeaveFilingReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userLogout: userLoginReducer,
  leaveFile: LeaveFilingReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo");

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
