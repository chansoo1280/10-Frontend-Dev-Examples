import jwt from "jsonwebtoken"
import { User } from "@Services/User"
import { checkHash } from "@Services/Crypto"

export async function validatePassword(user: User, inputPassword: string) {
    return checkHash(user.password, inputPassword, user.salt)
}

export function generateAccessToken(user: jwt.JwtPayload) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SERVER_SECRET || "", {
        expiresIn: "3h", // For test
    })
}

export function generateRefreshToken(user: jwt.JwtPayload) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SERVER_SECRET || "", {
        expiresIn: "180 days",
    })
}

export function verifyAccessToken(token: string) {
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

export function refreshAccessToken(token: string) {
    const result = jwt.verify(token, process.env.SERVER_SECRET || "", undefined)
    if (typeof result === "string") {
        return null
    }
    return generateAccessToken(result)
}
