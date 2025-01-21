import { RequestHandler } from "express"
import { authServices } from "./authServices"
import httpStatus, { StatusCodes } from 'http-status-codes'
import catchAsync from "../../utils/catchAsync"
import { sendImgToCloudinary } from "../../utils/imageUpload"
import AppError from "../../utils/AppError"

const userRegistration: RequestHandler = catchAsync(async (req, res) => {
    const body = JSON.parse(req.body.data)

    if (req.file) {
        const imgName = 'Tour'
        const path = req.file?.path as string
        const { secure_url } = await sendImgToCloudinary(imgName, path)
        body.photo = secure_url
    }

    const result = await authServices.authRegistraionToDb(body)
    res.send({
        status: httpStatus.CREATED,
        success: true,
        message: 'User  created Successfully!',
        data: result
    })
})

const authLogin = catchAsync(async (req, res) => {
    const result = await authServices.authLogins(req.body)

    if (!result) {
        throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong")
    }

    res.cookie("token", result?.token, { httpOnly: true });
    res.send({
        status: httpStatus.OK,
        success: true,
        message: 'User Login Successfully!',
        data: result
    })
})

const forgetPassword = catchAsync(async (req, res) =>{
    const result = await authServices.forgetPasswordDb(req.body)
    res.send({
        status: httpStatus.OK,
        success: true,
        message: 'Password reset link sent to your email!',
        data: result
    })
})

const resetPassword = catchAsync(async(req, res) => {
    const result = await authServices.resetPassword(req.body)
    res.send({
        status: httpStatus.OK,
        success: true,
        message: 'Password reset Successfully!',
        data: result
    })
})

const logout = catchAsync(async (req, res) => {
    res.clearCookie("token");
    res.json({
        status: httpStatus.OK,
        success: true,
        message: 'User Logout Successfully!',
        data: null
    });
})

const getSingleUser = catchAsync(async (req, res) => {
    const {userId} = req.params
    const result = await authServices.getSingleUserFromDb(userId)
    res.send({
        status: httpStatus.OK,
        success: true,
        message: 'Get user Successfully!',
        data: result
    })
})

export const authController = {
    userRegistration,
    authLogin,
    forgetPassword,
    resetPassword,
    logout,
    getSingleUser
}