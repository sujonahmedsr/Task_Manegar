export interface IUserRegistration {
    name: string,
    email: string,
    password: string,
    photo?: string
}

export interface IUserLogin {
    email: string,
    password: string
}