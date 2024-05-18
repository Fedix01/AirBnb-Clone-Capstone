import React, { createContext, useState } from 'react'


export const AlertContext = createContext();

export default function AlertProvider({ children }) {

    const [alert, setAlert] = useState("")
    const value = {
        alert,
        setAlert
    }

    return (
        <AlertContext.Provider value={value}>
            {children}
        </AlertContext.Provider>
    )
}
