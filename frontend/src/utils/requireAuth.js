import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function RequireAuth({ Component }) {
  const { userInfo } = useSelector((state) => state.userLogin);
  let user = typeof(userInfo) === "string" ? JSON.parse(userInfo) : userInfo
  try {
    return user.is_superuser ? <Redirect to="/admin"/> : <Component/>
  }catch {
    return <Redirect to="/"/>
  }
  
}

export default RequireAuth;
