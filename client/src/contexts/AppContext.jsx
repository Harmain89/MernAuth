import React from "react"

export const AppContext = React.createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [userData, setUserData] = React.useState(false)

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}