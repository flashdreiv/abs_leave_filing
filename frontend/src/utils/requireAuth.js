import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RequireAuth({ Component }) {
  const { userInfo } = useSelector((state) => state.userLogin);
  let user = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
  try {
    return user.is_superuser ? <Navigate to="/admin" /> : <Component />;
  } catch {
    console.log('shit');
    return <Navigate to="/login" />;
  }
}

export default RequireAuth;
