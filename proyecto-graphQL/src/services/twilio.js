import { Config } from '../config';
import twilio from 'twilio';


const client = new twilio(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_TOKEN);


export const sendMessage =  async (cellphoneNumber, message) => {
    const params = {
      body: message,
      from: Config.TWILIO_CELLPHONE,
      to: cellphoneNumber,
    };

    const response = await client.messages.create(params);
    return response
}


export const sendWhatsAppMessage = async (cellphoneNumber, message) => {

    const params = {
        body: message,
        from: `whatsapp:${Config.TWILIO_CELLPHONE_WHATSAPP}`,
        to: `whatsapp:${cellphoneNumber}`,
    };
  
    const response = await client.messages.create(params);
    return response

}