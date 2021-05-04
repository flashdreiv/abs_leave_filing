import {
  USER_FILING_REQUEST,
  USER_FILING_SUCCESS,
  USER_FILING_FAIL,
  USER_FILING_LIST,
  USER_EDIT_FILING_REQUEST,
  USER_EDIT_FILING_SUCCESS,
  USER_EDIT_FILING_FAIL,
  USER_DELETE_FILING,
} from "../constants/LeaveFilingConstants";

export const LeaveFilingReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FILING_REQUEST:
      return { loading: true };

    case USER_FILING_SUCCESS:
      return { loading: false, filingInfo: action.payload };

    case USER_FILING_LIST:
      return { loading: false, userFilingList: action.payload };

    case USER_DELETE_FILING:
      return { loading: false, filingInfo: action.payload };

    case USER_FILING_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const EditLeaveFilingReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_FILING_REQUEST:
      return { loading: true };

    case USER_EDIT_FILING_SUCCESS:
      return { loading: false, filingInfo: action.payload };

    case USER_EDIT_FILING_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
