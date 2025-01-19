import axios from "axios"
import React from "react"
import { toast } from "react-toastify"

export const AppContext = React.createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [userData, setUserData] = React.useState(false)

    const getAuthState = async () => {
        try {

            // const { data } = await axios.get(backendUrl + '/api/auth/is-auth')
            const { data } = await axios.get(`${backendUrl}/api/users/data`);

            if(data.success) {
                setIsLoggedIn(true)
                getUserData()
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData = async () => {
        try {
            
            const { data } = await axios.get(backendUrl + '/api/users/data')
    
            data.success ? setUserData(data.data) : toast.error(data.message)

        } catch (error) {
            toast.error('getUserData' + error.message)
        }
    }

    React.useEffect(() => {
        axios.defaults.withCredentials = true
        getAuthState()
    }, [])
    

    const value = {
        backendUrl, 
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}