import crypto from "crypto"
export const getHash = (password: string) => {
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
    return { salt, hash }
}
export const checkHash = (password: string, inputPassword: string, salt: string) => {
    return password === crypto.pbkdf2Sync(inputPassword, salt, 1000, 64, "sha512").toString("hex")
}
