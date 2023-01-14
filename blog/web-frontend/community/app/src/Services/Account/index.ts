import crypto from "crypto"
import jwt from "jsonwebtoken"
import excuteQuery, { QueryResult } from "@Server/db"
import { findUserByEmail, User } from "@Services/User"

export async function validatePassword(user: User, inputPassword: string) {
    const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512").toString("hex")
    return user.password === inputHash
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
