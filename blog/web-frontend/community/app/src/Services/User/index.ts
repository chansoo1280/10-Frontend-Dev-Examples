import excuteQuery, { QueryResult } from "@Server/db"
import { User } from "./User.entity"
export type { User }

export const findAllUser = async (): Promise<User[] | null> => {
    try {
        const result = await excuteQuery<User[]>({
            query: "SELECT * FROM user WHERE deleted IS NULL",
            values: [],
        })
        return result || null
    } catch (error) {
        console.log(error)
        return null
    }
}
export const findUserById = async (id: User["id"]): Promise<User | null> => {
    try {
        const result = await excuteQuery<User[]>({
            query: "SELECT * FROM user WHERE id = ? AND deleted IS NULL",
            values: [id],
        })
        const user = result[0]
        return user || null
    } catch (error) {
        console.log(error)
        return null
    }
}
export const findUserByEmail = async (email: User["email"]): Promise<User | null> => {
    try {
        const result = await excuteQuery<User[]>({
            query: "SELECT * FROM user WHERE email = ? AND deleted IS NULL",
            values: [email],
        })
        return result[0] || null
    } catch (error) {
        console.log(error)
        return null
    }
}
export const deleteAllUser = async (): Promise<User[] | null> => {
    const queryString = `UPDATE user SET deleted=?`
    const queryValues = [new Date()]
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return result.fieldCount === 0 ? [] : null
    } catch (error) {
        console.log(error)
        return null
    }
}
export const deleteUserById = async (id: User["id"]): Promise<true | null> => {
    const queryString = `UPDATE user SET deleted=? WHERE id = ?`
    const queryValues = [new Date(), id]
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return true
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createUser = async (user: Pick<User, "name" | "email" | "password" | "salt">): Promise<User["id"] | null> => {
    const queryString = `INSERT INTO user (email, name, password, salt, created) 
    VALUES (?, ?, ?, ?, ?);`
    const queryValues = [user.email, user.name, user.password, user.salt, new Date()]
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
