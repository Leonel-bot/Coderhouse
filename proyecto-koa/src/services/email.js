import {Config} from '../config/index'
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: Config.EMAIL,
        pass: Config.EMAIL_PASSWORD
    }
});


export const sendEmail = async (dest, subject, content ) => {
    const mailOptions = {
        form: {
            name: Config.EMAIL_NAME,
            address: Config.EMAIL
        },
        to: dest,
        subject,
        html: content
    }
    const response = await transporter.sendMail(mailOptions)
    return response
}
