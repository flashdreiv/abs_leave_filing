import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function RequireAuth({ Component }) {
  const { userInfo } = useSelector((state) => state.userLogin);

  if (userInfo) {
    if (userInfo.is_superuser) return <Redirect exact to="/" />;
  } else {
    return <Redirect exact to="/" />;
  }
  return <Component />;
}

export default RequireAuth;
