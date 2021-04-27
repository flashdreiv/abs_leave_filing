import React, { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/userAction";

const Signup = ({ history }) => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [password2, setPassword2] = useState([]);
  const { userInfo } = useSelector((state) => state.userSignup);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (userInfo.success) {
        history.push("/");
      }
    } catch {}
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(email, password, password2));
  };

  return (
    <div>
      <AuthForm
        formTitle="Sign up"
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        setPassword2={setPassword2}
      />
    </div>
  );
};

export default Signup;
