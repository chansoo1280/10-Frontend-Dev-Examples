import { User } from "@Services/User"
import { SMTPClient } from "emailjs"

export async function sendEmail(email: User["email"]) {
    const client = new SMTPClient({
        user: process.env.mail,
        password: process.env.password,
        host: "smtp.gmail.com",
        ssl: true,
    })
    client.send(
        {
            text: `Just for testing purpose`,
            from: [process.env.mail || ""],
            to: email,
            subject: "testing emailjs",
        },
        (e) => {
            console.log(e)
        },
    )
}
