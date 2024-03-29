import { User } from "@Services/User"
import { isArray, isNumber, isString } from "@Utils"

import { ConditionOfKeys, verifyEntity } from "@Utils/VerifyEntity"
export interface Question {
    id: number
    title: string
    contents: string
    authorId: User["id"]
    tags: string[] | null
    created: string
    deleted: string | null
}
export interface QuestionWithAuthor extends Pick<Question, "title" | "id" | "created" | "authorId" | "tags"> {
    author: Pick<User, "id" | "name" | "email">
}
export interface QuestionWithAuthorRow extends Omit<Question, "tags"> {
    tags: null | string
    author_id: User["id"]
    author_name: User["name"]
    author_email: User["email"]
}
export interface QuestionInfoWithAuthor extends QuestionWithAuthor {
    contents: Question["contents"]
}
const requiredList: (keyof Question)[] = ["id", "title", "contents", "authorId", "created"]
const conditionOfKeys: ConditionOfKeys<Question, keyof Question> = {
    id: (target) => isNumber(target),
    title: (target) => isString(target),
    contents: (target) => isString(target),
    authorId: (target) => isNumber(target),
    tags: (target) => isArray(target),
    created: (target) => isString(target),
    deleted: (target) => isString(target),
}
export const verifyQuestion = (user: Partial<Question>, checkKeyList: (keyof Question)[]) => verifyEntity(user, checkKeyList, requiredList, conditionOfKeys)
