import nodemailer from "nodemailer"
const sendMail = async (to: string, text: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: "shofiqul.sujon2201@gmail.com",
            pass: "azgu thmh dvix fvbk",
        },
    });

    await transporter.sendMail({
        from: 'Task Management👻', // sender address
        to, // list of receivers
        subject: "Hello ✔", // Subject line
        text, // plain text body
        html, // html body
    });
}
export default sendMail