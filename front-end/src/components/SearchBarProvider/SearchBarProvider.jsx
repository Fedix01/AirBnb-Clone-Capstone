import React, { createContext, useState } from 'react'


export const searchBarContext = createContext();

export default function SearchBarProvider({ children }) {

    const [searchBar, setSearchBar] = useState(false);

    const value = {
        searchBar,
        setSearchBar
    }

    return (
        <searchBarContext.Provider value={value}>
            {children}
        </searchBarContext.Provider>
    )
}
