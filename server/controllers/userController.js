import userModel from "../models/userModel.js";


export const getUserData = async (req, res) => {
    const { userId } = req.body;

    if([userId].some((field) => !field?.trim?.())) {
        return res.json({
            success: false,
            message: 'User ID Required'
        })
    }
    
    try {
        
        const user = await userModel.findById(userId).select('-_id -password -reset -resetOtpExpireAt');
    
        if(!user) {
            return res.json({
                success: false,
                message: 'Invalid User ID'
            })
        }
    
        return res.json({
            success: true,
            message: 'User Found',
            data: user
        })

    } catch (error) {
        return res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }

}