import excuteQuery from "@Server/db"
import { User } from "./User.entity"
export type { User }
export default async function findUserByEmail(email: string): Promise<User | null> {
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
