import { isDate, isString } from "@Utils"

export interface User {
    email: string
    id: number
    name: string
    password: string
    salt: string
    created: Date
    deleted: Date | null
}
const requiredList = ["email", "id", "name", "password", "salt", "created"]
const emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const passwordRegexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
const nameRegexp = new RegExp(/^[A-z0-9]{7,14}$/)
const conditionOfKeys: {
    [key in keyof User]: (target: any) => boolean
} = {
    email: (target) => isString(target) && target.length <= 100 && emailRegexp.test(target),
    id: (target) => isString(target),
    name: (target) => isString(target) && nameRegexp.test(target),
    password: (target) => isString(target) && passwordRegexp.test(target),
    salt: (target) => isString(target),
    created: (target) => isDate(target),
    deleted: (target) => isDate(target),
}
export const verifyUser = (user: Partial<User>, checkKeyList: (keyof User)[]): string | true => {
    const checkResult =
        checkKeyList
            .map((key) => {
                if (checkKeyList.includes(key) === false) {
                    return null
                }
                if (requiredList.includes(key) && user[key] === undefined) {
                    return key + " 값은 필수입니다."
                }
                if (conditionOfKeys[key](user[key]) === false) {
                    return key + " 형식이 올바르지 않습니다."
                }
            })
            .find((cur) => cur !== null) || true
    return checkResult
}
