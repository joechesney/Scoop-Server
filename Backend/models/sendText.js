
// let secrets = require('./secrets');
let secrets = {
  reverbClientId: "cf2d29ab7c5d15add1a720db31c3fc813ba54f073156c046f136bf1b690c2943",
  reverbClientSecret: "fec256cf61a8797d3537c5816c532d0e714ec62688475a4dee0afe2903538cc2",
  twilioAccountSID: "ACae93953dc9cf108cfcf316c27b67514f",
  twilioAuthToken: "f6ac32262e73863ff7978427c4dbc3d9",
  twilioPhoneNumber: "+16156516990",
};

module.exports = () => {
  let SMSclient = new require('twilio')(secrets.twilioAccountSID, secrets.twilioAuthToken);
  SMSclient.messages.create({
    body: 'Hello from Scoop!',
    to: "+16154389707",  // Text this number
    from: secrets.twilioPhoneNumber, // From a valid Twilio number
  })
  .then((error, message) => console.log("sendText.js", error || message.sid));
}