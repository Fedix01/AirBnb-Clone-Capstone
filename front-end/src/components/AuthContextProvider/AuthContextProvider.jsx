import React, { createContext, useEffect, useState } from 'react'


export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [authenticated, setAuthenticated] = useState(token !== "");

    const value = {
        token,
        setToken,
        authenticated
    }


    useEffect(() => {
        setAuthenticated(token !== "")
    }, [token])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
