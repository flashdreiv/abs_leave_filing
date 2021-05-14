import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userSignupReducer } from "./reducers/userReducers";
import {
  ListFilingReducer,
  LeaveFilingReducer,
  ApproveLeaveReducer,
} from "./reducers/LeaveFilingReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userLogout: userLoginReducer,
  leaveFile: LeaveFilingReducer,
  userFilingList: ListFilingReducer,
  approveLeave: ApproveLeaveReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo");
// const userFilingListFromStorage = localStorage.getItem("filing_list");

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  // userFilingList: { userFilingList: userFilingListFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
