import { User } from "@Services/User"

export interface Question {
    id: number
    title: string
    contents: string
    authorId: User["id"]
    created: string
    deleted: string | null
}
