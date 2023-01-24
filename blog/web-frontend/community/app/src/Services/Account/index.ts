import jwt from "jsonwebtoken"
import { User } from "@Services/User"
import { checkHash } from "@Utils/Crypto"

export const validatePassword = (user: User, inputPassword: string): boolean => {
    return checkHash(user.password, inputPassword, user.salt)
}

export const generateAccessToken = (user: jwt.JwtPayload): string => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SERVER_SECRET || "", {
        expiresIn: "3h",
    })
}

export const generateRefreshToken = (user: jwt.JwtPayload): string => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SERVER_SECRET || "", {
        expiresIn: "180 days",
    })
}

export const verifyAccessToken = (token?: string) => {
    if (token === undefined) {
        return undefined
    }
    // Authorization: `Bearer ${user.token}`
    try {
        const result = jwt.verify(token.replace("Bearer ", ""), process.env.SERVER_SECRET || "", undefined) as { id: User["id"]; email: User["email"] } | string
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
    return generateAccessToken(result)
}
