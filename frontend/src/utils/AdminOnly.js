import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const AdminOnly = ({ Component }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  let user = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
  try {
    return user.is_superuser ? <Component /> : <Navigate to="/employee" />;
  } catch {
    return <Navigate to="/" />;
  }
};

export default AdminOnly;
