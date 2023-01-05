import excuteQuery from "@Server/db"
import { User } from "./User.entity"
export type { User }

export async function findAllUser(): Promise<User[] | null> {
    try {
        const result = await excuteQuery<User[]>({
            query: "SELECT * FROM user",
            values: [],
        })
        return result || null
    } catch (error) {
        return null
    }
}
export async function findUserByEmail(email: string): Promise<User | null> {
    try {
        const result = await excuteQuery<User[]>({
            query: "SELECT * FROM user WHERE email = ?",
            values: [email],
        })
        return result[0] || null
    } catch (error) {
        return null
    }
}
export async function createUser(user: Pick<User, "name" | "email" | "password">): Promise<User["id"] | null> {
    const queryString = `INSERT INTO user (email, name, password) 
    VALUES (?, ?, ?);`
    const queryValues = [user.email, user.name, user.password]
    try {
        const result = await excuteQuery<{
            fieldCount: number
            affectedRows: number
            insertId: number
            serverStatus: number
            warningCount: number
            message: string
            protocol41: boolean
            changedRows: number
        }>({
            query: queryString,
            values: queryValues,
        })
        return result.insertId
    } catch (error) {
        return null
    }
}
