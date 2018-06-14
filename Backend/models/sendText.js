
let secrets = require('./secrets');
module.exports = () => {
  let SMSclient = new require('twilio')(secrets.twilioAccountSID, secrets.twilioAuthToken);
  SMSclient.messages.create({
    body: 'Hello from Scoop!',
    to: "+16154389707",  // Text this number
    from: secrets.twilioPhoneNumber, // From a valid Twilio number
  })
  .then((error, message) => console.log("sendText.js", error || message.sid));
}