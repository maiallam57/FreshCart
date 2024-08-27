export interface Auth {
    message?: string,
    user?: User,
    token?: string
    statusMsg?: string
}

interface User {
    name: string,
    email: string,
    role: string
}



export interface ErrorRes {
    status?: number
    statusText?: string
    ok?: boolean
    name?: string
    message?: string
    error?: Error
}

export interface Error {
    statusMsg: string
    message: string
}
