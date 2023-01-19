import jwt from "jsonwebtoken"
import { User } from "@Services/User"
import { checkHash } from "@Services/Crypto"

export const validatePassword = (user: User, inputPassword: string): boolean => {
    return checkHash(user.password, inputPassword, user.salt)
}

export const generateAccessToken = (user: jwt.JwtPayload): string => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SERVER_SECRET || "", {
        expiresIn: "3h", // For test
    })
}

export const generateRefreshToken = (user: jwt.JwtPayload): string => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SERVER_SECRET || "", {
        expiresIn: "180 days",
    })
}

export const verifyAccessToken = (token?: string): jwt.JwtPayload | null | undefined => {
    if (token === undefined) {
        return undefined
    }
    // Authorization: `Bearer ${user.token}`
    try {
        const result = jwt.verify(token.replace("Bearer ", ""), process.env.SERVER_SECRET || "", undefined)
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
