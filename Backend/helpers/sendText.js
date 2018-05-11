const secrets = require('./secrets');
const SMSclient = new require('twilio')(secrets.twilioAccountSID, secrets.twilioAuthToken);

module.exports = (user) => {
  client.messages.create({
    body: 'Hello from Scoop!',
    to: user.phoneNumber,  // Text this number
    from: secrets.twilioPhoneNumber, // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
}