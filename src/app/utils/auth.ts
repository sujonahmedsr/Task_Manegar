import { NextFunction, Request, Response } from "express"
import catchAsync from "./catchAsync"
import  jwt, { JwtPayload }  from "jsonwebtoken"
import { UserModel } from "../modules/authentications/auhtSchemModel"

export const Auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization

        if (!token) {
            throw new Error("UnAuthorized access")
        }

        const decoded = jwt.verify(
            token, 
            "secreate1254hajibi",
        ) as JwtPayload;

        const {email} = decoded

        const user = await UserModel.findOne({email})

        if(!user){
            throw new Error("User not found")
        }

        if (user?.isBlocked) {
            throw new Error('This user is Blocked !');
        }
        
        req.user = decoded as JwtPayload

        next()

    })
}