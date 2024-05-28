import React, { useContext } from 'react'
import { AuthContext } from '../AuthContextProvider/AuthContextProvider'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedAuthRoute() {

    const { authenticated } = useContext(AuthContext);
    if (authenticated === undefined) {
        // Render a loading indicator or nothing while checking authentication status
        return <div>Loading...</div>;
    }

    return authenticated ? <Outlet /> : <Navigate to={"/logIn"} />;

}
