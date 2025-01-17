import { NextFunction, Request, Response } from "express"
import catchAsync from "./catchAsync"
import  jwt, { JwtPayload }  from "jsonwebtoken"
import { UserModel } from "../modules/authentications/auhtSchemModel"
import { StatusCodes } from "http-status-codes"
import AppError from "./AppError"

export const Auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization

        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "UnAuthorized access")
        }

        const decoded = jwt.verify(
            token, 
            process.env.SECTRETE as string,
        ) as JwtPayload;

        const {email} = decoded

        const user = await UserModel.findOne({email})

        if(!user){
            throw new AppError(StatusCodes.NOT_FOUND, "User not found")
        }

        if (user?.isBlocked) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'This user is Blocked !');
        }
        
        req.user = decoded as JwtPayload

        next()

    })
}