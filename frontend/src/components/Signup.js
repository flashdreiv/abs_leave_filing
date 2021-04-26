import React, { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup } from "../actions/userAction";

const Signup = ({ history }) => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [password2, setPassword2] = useState([]);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    try {
      if (userInfo) {
        history.push("/");
      }
    } catch {
      history.push("/");
    }
  }, [history, userInfo]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log(password2);
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
