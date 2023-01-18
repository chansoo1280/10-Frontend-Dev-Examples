export interface User {
    email: string
    id: number
    name: string
    password: string
    salt: string
    created: string
    deleted: string | null
}
