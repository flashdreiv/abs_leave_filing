import axiosActions from "../axiosApi";

import {
  USER_FILING_REQUEST,
  USER_FILING_SUCCESS,
  USER_FILING_FAIL,
  USER_FILING_LIST,
} from "../constants/LeaveFilingConstants";

export const fileLeave = (
  leave_type,
  day_type,
  leave_date_from,
  leave_date_to,
  remarks
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FILING_REQUEST,
    });

    let filingInfo = {
      leave_type,
      day_type,
      leave_date_from,
      leave_date_to,
      remarks,
    };
    const { data } = await axiosActions[0].post("filings/", filingInfo);

    dispatch({
      type: USER_FILING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FILING_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listLeave = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_FILING_REQUEST,
    });
    const { data } = await axiosActions[0].get("filings/");

    dispatch({
      type: USER_FILING_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FILING_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
