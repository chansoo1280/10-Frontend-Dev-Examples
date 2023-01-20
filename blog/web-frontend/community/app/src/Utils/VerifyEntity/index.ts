export type ConditionOfKeys<T, U extends keyof T> = {
    [key in U]: (target: any) => boolean
}
export const verifyEntity = <T, U extends keyof T>(entity: Partial<T>, checkKeyList: U[], requiredList: U[], conditionOfKeys: ConditionOfKeys<T, U>): string | true => {
    const checkResult =
        checkKeyList
            .map((key) => {
                if (checkKeyList.includes(key) === false) {
                    return null
                }
                if (requiredList.includes(key) && entity[key] === undefined) {
                    return String(key) + " 값은 필수입니다."
                }
                if (!conditionOfKeys[key](entity[key])) {
                    return String(key) + " 형식이 올바르지 않습니다."
                }
                return null
            })
            .find((cur) => cur !== null) || true
    return checkResult
}
