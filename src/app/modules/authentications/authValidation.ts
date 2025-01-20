import { z } from "zod";

export const userRegisterValidation = z.object({
    name: z.string({required_error: "Name must be provieded!"}),
    email: z.string({required_error: "Email must be provieded!"}),
    password: z.string({required_error: "Password must be provieded!"}),
})
export const userLoginValidation = z.object({
    email: z.string({required_error: "Email must be  provieded!"}),
    password: z.string({required_error: "Password must be provieded!"})
})