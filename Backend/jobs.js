
const {
  hyperionService,
  sendEmail,
  loginAuth
} = require("./models/");

module.exports = async() => {
  loginAuth()
  .then(async({ access_token }) => {
    const hypeListings = await hyperionService(access_token);
    await sendEmail({listings: hypeListings.body.listings});

  })
};
