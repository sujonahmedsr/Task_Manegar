export interface IUserRegistration {
    name: string,
    email: string,
    password: string,
    photo?: string,
    isBlocked: boolean
}

export interface IUserLogin {
    email: string,
    password: string
}