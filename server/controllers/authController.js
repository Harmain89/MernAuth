import { ApiError } from "../utils/ApiError.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import { consoleCheck } from "../utils/Miscellenous.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";


export const register = async (req, res) => {
    const {name, email, password} = req.body;
    
    try {
        
        if ([name, email, password].some((field) => !field?.trim?.())) {
            // throw new ApiError(500, "Missing Details");
            return res.json({
                success: false,
                message: "Missing Details",
            });
        }

        const existingUser = await userModel.findOne({email})

        if(existingUser) {
            return res.json({
                success: false,
                message: "User already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userModel({name, email, password: hashedPassword})
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Sending Welcome Email
        const mailOptions = {
            from: `"MernAuth Registration 👻" ${process.env.SENDER_Email}`,
            to: email,
            subject: 'Welcome to the MernAuth',
            text: `Welcome to the MernAuth, Your account has been created successfully with emailId: ${email}`
        }

        const info = await transporter.sendMail(mailOptions);
        // console.log(info)

        return res.json({
            success: true,
            message: "User created Successfully"
        })
    
    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        
        if([email, password].some((field) => !field?.trim?.())) {
            return res.json({
                success: false,
                message: "Missing Details"
            })
        }
        
        const user = await userModel.findOne({email})
        // consoleCheck(user)
    
        if(!user) {
            return res.json({
                success: false,
                message: "Invalid Email"
            })
        }
    
        const isMatch = await bcrypt.compare(password, user?.password)
    
        if(!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Password"
            })
        }
    
        const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
    
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
    
        return res.json({
            success: true
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const logout = (req, res) => {
    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        return res.json({
            success: true,
            message: 'Logged Out'
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {

        const { userId } = req.body;

        const user = await userModel.findById(userId)

        if(user?.isAccountVerified) {
            return res.json({
                success: false,
                message: 'Account already verified'
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() * 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_Email,
            to: user?.email,
            subject: 'Account Verification OTP',
            // text: `Your OTP is ${otp}. Verify your account using this OTP.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: 'Verification OTP has been sent on Email'
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Verify the email by OTP
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if([userId, otp].some((field) => !field?.trim?.())) {
        return res.json({
            success: false,
            message: 'Missing Details'
        })
    }

    try {

        const user = await userModel.findById(userId)

        if(!user) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        if(user?.verifyOtp === '' || user?.verifyOtp !== otp) {
            return res.json({
                success: false,
                message: 'Invalid Otp'
            })
        }

        if(user?.verifyOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: 'OTP Expired'
            })
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        user.save();

        return res.status(201).json({
            success: true,
            message: 'Email Verified Successfully'
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Check if user is authenticated or not
export const isAuthenticated = async (req, res) => {
    try {
        
        return res.status(200).json({
            success: true,
            message: 'Authenticated'
        })

    } catch (error) {
        return res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

// Send Password Reset OTP
export const sendResetOtp = async (req, res) => {

    const { email } = req.body;
    // console.warn('jkhkkhkhjk')
    if(!email) {
        return res.status(200).json({
            success: false,
            message: 'Email Required'
        })
    }

    try {
        
        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(200).json({
                success: false,
                message: 'Invalid Email'
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() * 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_Email,
            to: user?.email,
            subject: 'Password Reset OTP',
            // text: `Your OTP is ${otp}. Reset your account using this OTP.`,
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }

        const info = await transporter.sendMail(mailOptions)
        
        return res.json({
            success: true,
            message: 'Reset OTP has been sent on Email'
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


// Verify the email by OTP
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if([email, otp, newPassword].some((field) => !field?.trim?.())) {
        return res.json({
            success: false,
            message: 'Missing Details'
        })
    }

    try {

        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        if(user?.resetOtp === '' || user?.resetOtp !== otp) {
            return res.json({
                success: false,
                message: 'Invalid Otp'
            })
        }

        if(user?.resetOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: 'OTP Expired'
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword

        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        user.save();

        return res.status(201).json({
            success: true,
            message: 'Password has been reset Successfully'
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}