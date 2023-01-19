export interface User {
    email: string
    id: number
    name: string
    password: string
    salt: string
    created: Date
    deleted: Date | null
}
const emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const passwordRegexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
const nameRegexp = new RegExp(/^[A-z0-9]{7,14}$/)
export const verifyUser = (user: Partial<User>, checkKeyList: (keyof User)[]) => {
    const requiredList = ["email", "id", "name", "password", "salt", "created"]

    const conditionOfKeys: {
        [key in keyof User]: (value: any) => boolean
    } = {
        email: (email) => email.length > 100 || emailRegexp.test(email) === false,
        id: (id) => typeof id !== "number",
        name: (name) => typeof name !== "string" || nameRegexp.test(name) === false,
        password: (password) => typeof password !== "string" || passwordRegexp.test(password) === false,
        salt: (salt: User["salt"]) => typeof salt !== "string",
        created: (created) => created instanceof Date === false,
        deleted: (deleted) => deleted instanceof Date === false,
    }
    for (let i = 0; i < checkKeyList.length; i++) {
        const key = checkKeyList[i]
        if (checkKeyList.includes(key) === false) {
            continue
        }
        if (requiredList.includes(key) && user[key] === undefined) {
            return key + " 값은 필수입니다."
        }
        if (conditionOfKeys[key](user[key])) {
            return checkKeyList[i] + " 형식이 올바르지 않습니다."
        }
    }

    // if (checkKeyList.includes("email")) {
    //     if (user.email === undefined) {
    //         return "email 값은 필수입니다."
    //     }
    //     if (user.email.length > 100 || emailRegexp.test(user.email) === false) {
    //         return "email 형식이 올바르지 않습니다."
    //     }
    // }
    // if (checkKeyList.includes("id")) {
    //     if (user.id === undefined) {
    //         return "id 값은 필수입니다."
    //     }
    //     if (typeof user.id === "number") {
    //         return "id 형식이 올바르지 않습니다."
    //     }
    // }
    // if (checkKeyList.includes("name")) {
    //     if (user.name === undefined) {
    //         return "name 값은 필수입니다."
    //     }
    //     if (typeof user.name === "string" || nameRegexp.test(user.name) === false) {
    //         return "name 형식이 올바르지 않습니다."
    //     }
    // }
    // if (checkKeyList.includes("password")) {
    //     if (user.password === undefined) {
    //         return "password 값은 필수입니다."
    //     }
    //     if (typeof user.password === "string" || passwordRegexp.test(user.password) === false) {
    //         return "password 형식이 올바르지 않습니다."
    //     }
    // }
    // if (checkKeyList.includes("salt")) {
    //     if (user.salt === undefined) {
    //         return "salt 값은 필수입니다."
    //     }
    //     if (typeof user.salt === "string") {
    //         return "salt 형식이 올바르지 않습니다."
    //     }
    // }
    // if (checkKeyList.includes("created")) {
    //     if (user.created === undefined) {
    //         return "created 값은 필수입니다."
    //     }
    //     if (user.created instanceof Date === false) {
    //         return "created 형식이 올바르지 않습니다."
    //     }
    // }
    // if (checkKeyList.includes("deleted")) {
    //     if (user.deleted instanceof Date === false) {
    //         return "deleted 형식이 올바르지 않습니다."
    //     }
    // }
    return true
}
