import React from 'react'
import { UserContextAPI } from '../context/UserContext';
import { useContext } from 'react';
const AdminRoutes = (props) => {
    let {userProfile}=useContext(UserContextAPI)

    if(userProfile?.role==="admin"){
        return props.children;
    
    }else{
        return <Navigate to="/"/>;
    }   
}

export default AdminRoutes