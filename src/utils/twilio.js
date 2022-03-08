import twilio from 'twilio';
import config from '../config.js';

const clientSid = config.twilio.CLIENT_SID; 
const authToken = config.twilio.AUTH_TOKEN;
const client = twilio(clientSid, authToken);

const sendWhatsapp = function (order) {
  let body = `
    ${order.name} ${order.last_name}
    just placed and order for ${JSON.stringify(order.products)}
  `;
  return client.messages.create({
    from: `whatsapp:${config.twilio.WHATSAPP_FROM}`,
    to: `whatsapp:${config.twilio.WHATSAPP_TO}`,
    body: body
  });
};

export default sendWhatsapp;
