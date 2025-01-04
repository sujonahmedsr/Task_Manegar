import { Router } from "express";
import { authController } from "./authController";
import { userLoginValidation } from "./authValidation";
import validateRequest from "../../../utils/validRequest";
import { upload } from "../../../utils/imageUpload";

const authRoute = Router()

authRoute.post('/user-registraion', upload.single('files'), authController.userRegistration)

authRoute.post('/user-login', validateRequest(userLoginValidation), authController.authLogin)

authRoute.post('/forget-password', authController.forgetPassword)
authRoute.post('/reset-password', authController.resetPassword)

authRoute.post('/user-logout', authController.logout)

export default authRoute