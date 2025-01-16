import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    
    const { token } = req.cookies;

    if(!token) {
        return res.json({
            success: false,
            message: 'Not Authorized, Login Again'
        })
    }

    try {

        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!tokenDecoded?.id) {
            return res.json({
                success: false,
                message: 'Not Authorized, Login Again'
            })
        }
        else {
            req.body.userId = tokenDecoded?.id;
        }

        next();
        
    } catch (error) {
        return res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

export default userAuth;