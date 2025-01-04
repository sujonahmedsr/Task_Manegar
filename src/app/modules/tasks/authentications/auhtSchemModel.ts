import { model, Schema } from "mongoose";
import { IUserRegistration } from "./authInterface";
import bcrypt from 'bcrypt'

// user Registraion schema 
const userSchema = new Schema<IUserRegistration>({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
            },
            message: '{VALUE} is not a valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    photo: {
        type: String
    },
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(10))
    next()
})

userSchema.post('save', async function (doc, next) {
    doc.password = ''
    next()
})


// user Registraion model 
export const UserModel = model<IUserRegistration>('UsersTask', userSchema)