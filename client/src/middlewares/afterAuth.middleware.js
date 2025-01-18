import React from "react"
import { AppContext } from "../contexts/AppContext.jsx"
import { useNavigate } from "react-router-dom"

const afterAuth = async (req, res, next) => {
    const { isLoggedIn } = React.useContext(AppContext)

    const navigate = useNavigate();

    if(!isLoggedIn) {
        navigate('/')
    }

    next()
    
}

export default afterAuth;