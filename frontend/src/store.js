import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userSignupReducer } from './reducers/userReducers';
import {
  ListFilingReducer,
  LeaveFilingReducer,
  ApproveLeaveReducer,
  ListApprovalReducer
} from './reducers/LeaveFilingReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userLogout: userLoginReducer,
  leaveFile: LeaveFilingReducer,
  listFiling: ListFilingReducer,
  approveLeave: ApproveLeaveReducer,
  listApproval: ListApprovalReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo');
// const userFilingListFromStorage = localStorage.getItem('filing_list');

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
  // listFiling: { userFilingList: userFilingListFromStorage }
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
