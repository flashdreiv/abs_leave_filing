import axiosActions from "../axiosApi";

import {
  USER_FILING_REQUEST,
  USER_FILING_SUCCESS,
  USER_FILING_FAIL,
  USER_FILING_LIST,
  USER_EDIT_FILING_REQUEST,
  USER_EDIT_FILING_SUCCESS,
  USER_EDIT_FILING_FAIL,
  USER_DELETE_FILING,
  APPROVE_FILING_REQUEST,
  APPROVE_FILING_SUCCESS,
  APPROVE_FILING_FAIL,
} from "../constants/LeaveFilingConstants";

//Insert Leave
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
//Get listings of leave
export const listLeave = (listType) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FILING_REQUEST,
    });

    const { data } = await axiosActions[0].get("filings/", {
      params: {
        leave_type_status: listType,
      },
    });
    localStorage.setItem("filing_list", JSON.stringify(data));

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
//Edit leave
export const editLeave = (
  leaveID,
  leave_type,
  day_type,
  leave_date_from,
  leave_date_to,
  remarks
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_EDIT_FILING_REQUEST,
    });
    let editInfo = {
      leave_type,
      day_type,
      leave_date_from,
      leave_date_to,
      remarks,
    };
    const { data } = await axiosActions[0].put(`filings/${leaveID}`, editInfo);
    console.log(data);

    dispatch({
      type: USER_EDIT_FILING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_EDIT_FILING_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//Delete leave
export const deleteLeave = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FILING_REQUEST,
    });
    const { data } = await axiosActions[0].delete(`filings/${id}`);

    dispatch({
      type: USER_DELETE_FILING,
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

//Approve Leave
export const approveLeave = (id, approved, remarks) => async (dispatch) => {
  try {
    dispatch({
      type: APPROVE_FILING_REQUEST,
    });
    const approveInfo = { approved: approved, remarks: remarks };
    const { data } = await axiosActions[0].post(
      `filings/approvals/${id}`,
      approveInfo
    );

    dispatch({
      type: APPROVE_FILING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_FILING_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
