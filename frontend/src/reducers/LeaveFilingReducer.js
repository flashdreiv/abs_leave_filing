import {
  USER_FILING_REQUEST,
  USER_FILING_SUCCESS,
  USER_FILING_FAIL,
  USER_FILING_LIST,
} from "../constants/LeaveFilingConstants";

export const LeaveFilingReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FILING_REQUEST:
      return { loading: true };

    case USER_FILING_SUCCESS:
      return { loading: false, filingInfo: action.payload };

    case USER_FILING_LIST:
      return { loading: false, userFilingList: action.payload };

    case USER_FILING_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
