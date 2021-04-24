import React from 'react'
import { Redirect } from 'react-router';
import { useSelector } from "react-redux";

const AdminOnly = ({Component}) => {
    const { userInfo } = useSelector((state) => state.userLogin);
    let user = typeof(userInfo) === "string" ? JSON.parse(userInfo) : userInfo
    try {
        return user.is_superuser ?  <Component/> : <Redirect to="/employee"/>
    }catch{
        return <Redirect to="/"/>
    }


}

export default AdminOnly
