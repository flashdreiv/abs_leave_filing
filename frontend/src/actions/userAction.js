import axiosInstance from "../axiosApi";
import axiosSignup from "../axiosApi";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axiosInstance.post("auth/login", {
      email: email,
      password: password,
    });
    axiosInstance.defaults.headers["Authorization"] = "JWT " + data.access;
    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const signup = (email, password, password2) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });

    let signupInfo = { email: email, password: password, password2: password2 };

    let data = fetch("http://localhost:8000/api/accounts/signup", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(signupInfo),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        return data;
      });

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
