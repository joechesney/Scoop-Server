
const {
  hyperionService,
  sendEmail,
  loginAuth
} = require("./models/");

module.exports = async() => {
  try {
    loginAuth()
    .then(async(res) => {
      const { body: { access_token } } = res;
      const  { listings } = await hyperionService(access_token);
      return await sendEmail(listings);
    })
  } catch(err) {
    console.log('err in jobs: ', err);
    return err;
  }
};
