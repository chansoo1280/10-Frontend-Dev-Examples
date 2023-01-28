import jwt from "jsonwebtoken"
import { User } from "@Services/User"
import { checkHash } from "@Utils/Crypto"

export const validatePassword = (user: User, inputPassword: string): boolean => {
    return checkHash(user.password, inputPassword, user.salt)
}

export const generateAccessToken = (tokenInfo: jwt.JwtPayload): string => {
    return jwt.sign(tokenInfo, process.env.SERVER_SECRET || "", {
        expiresIn: "3h",
    })
}

export const generateRefreshToken = (tokenInfo: jwt.JwtPayload): string => {
    return jwt.sign(tokenInfo, process.env.SERVER_SECRET || "", {
        expiresIn: "180 days",
    })
}
export const verifyRefreshToken = (token?: string) => {
    if (token === undefined) {
        return undefined
    }
    try {
        const result = jwt.verify(token, process.env.SERVER_SECRET || "", undefined) as (Pick<User, "email" | "name" | "id"> & { sessionId: string }) | string
        if (typeof result === "string") {
            return null
        }
        return result
    } catch (error) {
        return null
    }
}

export const verifyAccessToken = (token?: string) => {
    if (token === undefined) {
        return undefined
    }
    // Authorization: `Bearer ${user.token}`
    try {
        const result = jwt.verify(token.replace("Bearer ", ""), process.env.SERVER_SECRET || "", undefined) as (Pick<User, "email" | "name" | "id"> & { sessionId: string }) | string
        if (typeof result === "string") {
            return null
        }
        return result
    } catch (error) {
        return null
    }
}

export const refreshAccessToken = (token: string): string | null => {
    const result = jwt.verify(token, process.env.SERVER_SECRET || "", undefined)
    if (typeof result === "string") {
        return null
    }
    return generateAccessToken({
        id: result.id,
        name: result.name,
        email: result.email,
        sessionId: result.sessionId,
    })
}

export const generateResetPwToken = (email: string): string => {
    return jwt.sign({ email: email }, process.env.SERVER_SECRET || "", {
        expiresIn: "3h",
    })
}
export const verifyResetPwToken = (token?: string) => {
    if (token === undefined) {
        return undefined
    }
    try {
        const result = jwt.verify(token, process.env.SERVER_SECRET || "", undefined) as { email: User["email"] } | string
        if (typeof result === "string") {
            return null
        }
        return result
    } catch (error) {
        return null
    }
}
