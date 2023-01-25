import { SMTPClient } from "emailjs"

export async function sendEmail({ text, to, subject }: { text: string; to: string; subject: string }) {
    const client = new SMTPClient({
        user: process.env.mail,
        password: process.env.password,
        host: "smtp.gmail.com",
        ssl: true,
    })
    client.send(
        {
            text: text,
            from: [process.env.mail || ""],
            to: to,
            subject: subject,
        },
        (e) => {
            console.log(e)
        },
    )
}
