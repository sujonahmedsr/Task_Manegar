import { z } from "zod";

export const taskValidation = z.object({
    title: z.string({
        required_error: "This field is required",
    }),
    description: z.string({
        required_error: "This field is required",
    }),
    user: z.string({
        required_error: "This field is required",
    }),
})