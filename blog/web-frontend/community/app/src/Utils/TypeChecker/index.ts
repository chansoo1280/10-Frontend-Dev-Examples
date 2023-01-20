export const getType = (target: unknown) => {
    return Object.prototype.toString.call(target).slice(8, -1)
}

export const isString = (target: unknown) => {
    return getType(target) === "String"
}

export const isNumber = (target: unknown) => {
    return getType(target) === "Number"
}

export const isBoolean = (target: unknown) => {
    return getType(target) === "Boolean"
}

export const isNull = (target: unknown) => {
    return getType(target) === "Null"
}

export const isUndefined = (target: unknown) => {
    return getType(target) === "Undefined"
}

export const isObject = (target: unknown) => {
    return getType(target) === "Object"
}

export const isArray = (target: unknown) => {
    return getType(target) === "Array"
}

export const isDate = (target: unknown) => {
    return getType(target) === "Date" && target instanceof Date
}

export const isRegExp = (target: unknown) => {
    return getType(target) === "RegExp"
}

export const isFunction = (target: unknown) => {
    return getType(target) === "Function"
}
