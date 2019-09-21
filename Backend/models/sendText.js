
module.exports = () => {
  let SMSclient = new require('twilio')(secrets.twilioAccountSID, secrets.twilioAuthToken);
  SMSclient.messages.create({
    body: 'Hello from Scoop!',
    to: secrets.personalPhoneNumber,  // Text this number
    from: secrets.twilioPhoneNumber, // From a valid Twilio number
  })
  .then((error, message) => console.log("sendText.js", error || message.sid));
}