import excuteQuery, { QueryResult } from "@Server/db"
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
export async function findUserById(id: User["id"]): Promise<Pick<User, "id" | "name" | "email" | "salt"> | null> {
    try {
        const result = await excuteQuery<User[]>({
            query: "SELECT * FROM user WHERE id = ?",
            values: [id],
        })
        const user = result[0]
        return (
            {
                id: user.id,
                name: user.name,
                email: user.email,
                salt: user.salt,
            } || null
        )
    } catch (error) {
        return null
    }
}
export async function findUserByEmail(email: User["email"]): Promise<User | null> {
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
export async function deleteAllUser(): Promise<User[] | null> {
    const queryString = `DELETE FROM user`
    const queryValues: never[] = []
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return result.fieldCount === 0 ? [] : null
    } catch (error) {
        return null
    }
}
export async function deleteUserById(id: User["id"]): Promise<true | null> {
    const queryString = `DELETE FROM user WHERE id = ?`
    const queryValues = [id]
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return true
    } catch (error) {
        return null
    }
}

export async function createUser(user: Pick<User, "name" | "email" | "password" | "salt">): Promise<User["id"] | null> {
    const queryString = `INSERT INTO user (email, name, password, salt) 
    VALUES (?, ?, ?, ?);`
    const queryValues = [user.email, user.name, user.password, user.salt]
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return result.insertId
    } catch (error) {
        console.log(error)
        return null
    }
}
