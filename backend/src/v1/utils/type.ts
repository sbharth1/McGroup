
export interface  JwtPayload {
    id: number,
    email:string,
}

export interface User {
    id:number,
    email:string,
    passwordHash:string
}