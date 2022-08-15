import dotenv from 'dotenv'
dotenv.config()

export const Config = {
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_NAME: process.env.EMAIL_NAME,
    TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,
    TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE,
    TWILIO_CELLPHONE_WHATSAPP: process.env.TWILIO_CELLPHONE_WHATSAPP,
    ADMIN_CELLPHONE: process.env.ADMIN_CELLPHONE
}