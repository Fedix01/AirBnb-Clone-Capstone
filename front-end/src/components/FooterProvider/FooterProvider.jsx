import React, { createContext, useState } from 'react'


export const FooterContext = createContext(null)
export default function FooterProvider({ children }) {
    const [showAllFooter, setShowAllFooter] = useState(false);

    const value = {
        showAllFooter,
        setShowAllFooter
    }
    return (
        <FooterContext.Provider value={value}>
            {children}
        </FooterContext.Provider>
    )
}
