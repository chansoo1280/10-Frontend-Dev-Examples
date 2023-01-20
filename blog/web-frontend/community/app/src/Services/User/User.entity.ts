import { isDate, isString } from "@Utils"
import { ConditionOfKeys, verifyEntity } from "@Utils/VerifyEntity"

export interface User {
    email: string
    id: number
    name: string
    password: string
    salt: string
    created: Date
    deleted: Date | null
}
const requiredList: (keyof User)[] = ["email", "id", "name", "password", "salt", "created"]
const emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const passwordRegexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
const nameRegexp = new RegExp(/^[A-z0-9]{7,14}$/)
const conditionOfKeys: ConditionOfKeys<User, keyof User> = {
    email: (target) => isString(target) && target.length <= 100 && emailRegexp.test(target),
    id: (target) => isString(target),
    name: (target) => isString(target) && nameRegexp.test(target),
    password: (target) => isString(target) && passwordRegexp.test(target),
    salt: (target) => isString(target),
    created: (target) => isDate(target),
    deleted: (target) => isDate(target),
}
export const verifyUser = (user: Partial<User>, checkKeyList: (keyof User)[]) => verifyEntity(user, checkKeyList, requiredList, conditionOfKeys)
