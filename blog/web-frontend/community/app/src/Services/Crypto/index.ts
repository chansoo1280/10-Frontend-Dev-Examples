import crypto from "crypto"
export const getHash = (password: string) => {
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
    return { salt, hash }
}
export const checkHash = (password: string, inputPassword: string, salt: string) => {
    return password === crypto.pbkdf2Sync(inputPassword, salt, 1000, 64, "sha512").toString("hex")
}
const algorithm = "aes-256-ctr"
export const encrypt = (str: string) => {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(process.env.NEXT_PUBLIC_CLIENT_SECRET || ""), iv)
    const encrypted = Buffer.concat([cipher.update(str), cipher.final()])
    return iv.toString("hex") + ":" + encrypted.toString("hex")
}
export const decrypt = (str: string) => {
    if (str === "" || str.includes(":") === false) {
        return ""
    }
    const textParts = str.split(":")
    const iv = Buffer.from(textParts[0] || "", "hex")
    if (iv.length !== 16) {
        return ""
    }
    const encryptedText = Buffer.from(textParts[1], "hex")
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(process.env.NEXT_PUBLIC_CLIENT_SECRET || ""), iv)
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()])
    return decrypted.toString()
}
