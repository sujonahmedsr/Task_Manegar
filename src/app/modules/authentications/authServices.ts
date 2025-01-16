import sendMail from "../../utils/sendMail";
import { UserModel } from "./auhtSchemModel";
import { IUserLogin, IUserRegistration } from "./authInterface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authRegistraionToDb = async (payload: IUserRegistration) => {
    const { name, email, password } = payload;

    //validation
    if (!name || !email || !password) {
        // 400 Bad Request
        throw new Error("All fields are required");
    }

    // check if user exist 
    const user = await UserModel.findOne({ email })
    if (user) {
        throw new Error('This user already Registerd!')
    }

    // check password length
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
    }

    const result = await UserModel.create(payload)
    return result
}

const authLogins = async (payload: IUserLogin) => {
    const { email, password } = payload;
    const user = await UserModel.findOne({ email })
    if (!user) {
        throw new Error('User not found')
    }

    const isPassMatched = await bcrypt.compare(password, user?.password)
    if (!isPassMatched) {
        throw new Error('Wrong Password!!! Tell me who are you? 😈')
    }

    const jwtPayload = {
        email: user?.email
    }
    const token = jwt.sign(jwtPayload, "secreate1254hajibi", { expiresIn: '1d' })

    return { token, user };
}

const forgetPasswordDb = async (payload: { email: string }) => {
    const user = await UserModel.findOne({ email: payload.email })
    if (!user) {
        throw new Error('User not found')
    }

    const jwtPayload = {
        email: user?.email
    }

    const token = jwt.sign(jwtPayload, 'secret', { expiresIn: "10m" })

    const resetLink = `http://localhost:5173/reset-password?_id=${user?._id}&token=${token}`

    await sendMail(user?.email, "Reset password Link", resetLink)
}

const resetPassword = async (payload: { id: string, token: string, password: string }) => {
    const user = await UserModel.findById(payload.id)
    
    if (!user) {
        throw new Error('User not found!')
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    jwt.verify(payload.token, "secret", (err, decoded) => {
        if (err) {
            throw new Error('Invalid or expired token')
        }
    })

    //   /hash the new password
    payload.password = await bcrypt.hash(payload.password, Number(10))
    user.password = payload.password
    const result = await UserModel.findByIdAndUpdate(user._id, user, { new: true })
    return result;
}

export const authServices = {
    authRegistraionToDb,
    authLogins,
    forgetPasswordDb,
    resetPassword
}