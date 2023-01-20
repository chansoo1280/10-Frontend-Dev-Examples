import { User } from "@Services/User"
import { isDate, isNumber, isString } from "@Utils"

import { ConditionOfKeys, verifyEntity } from "@Utils/VerifyEntity"
export interface Question {
    id: number
    title: string
    contents: string
    authorId: User["id"]
    created: string
    deleted: string | null
}
const requiredList: (keyof Question)[] = ["id", "title", "contents", "authorId", "created"]
const conditionOfKeys: ConditionOfKeys<Question, keyof Question> = {
    id: (target) => isNumber(target),
    title: (target) => isString(target),
    contents: (target) => isString(target),
    authorId: (target) => isNumber(target),
    created: (target) => isDate(target),
    deleted: (target) => isDate(target),
}
export const verifyQuestion = (user: Partial<Question>, checkKeyList: (keyof Question)[]) => verifyEntity(user, checkKeyList, requiredList, conditionOfKeys)
