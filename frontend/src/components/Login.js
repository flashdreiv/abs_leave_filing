import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import AuthForm from "./AuthForm";

const Login = ({ history }) => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      if (!userInfo.is_superuser) {
        history.push("/employee");
      } else {
        history.push("/admin");
      }
    } catch {
      history.push("/");
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div>
      <AuthForm
        formTitle="Sign in"
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </div>
  );
};

export default Login;
