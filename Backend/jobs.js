
const {
  hyperionService,
  sendEmail,
  loginAuth
} = require("./models/");

module.exports = async() => {
  try {
    loginAuth()
    .then(async({ access_token }) => {
      console.log('email sent at ', Date.now().toLocaleString());
      const hypeListings = await hyperionService(access_token);
      await sendEmail({listings: hypeListings.body.listings});
  
    })
  } catch(err) {
    console.log('err : ', err);
  }
};
