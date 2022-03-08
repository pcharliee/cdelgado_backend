import twilio from 'twilio';
const clientSid = process.env.TWILIO_CLIENT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(clientSid, authToken);

const sendWhatsapp = function (order) {
  let body = `
    ${order.name} ${order.last_name}
    just placed and order for ${JSON.stringify(order.products)}
  `;
  return client.messages.create({
    from: `whatsapp:${process.env.WHATSAPP_FROM}`,
    to: `whatsapp:${process.env.WHATSAPP_TO}`,
    body: body
  });
};

export default sendWhatsapp;
