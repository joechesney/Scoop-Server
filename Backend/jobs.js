
const {
  hyperionService,
  sendEmail,
  loginAuth
} = require("./models/");

module.exports = async() => {
  try {
    loginAuth()
    .then(async(res) => {
      console.log('res : ', res);
      const { access_token } = res;
      const { listings } = await hyperionService(access_token);
      console.log('listings : ', listings);
      return await sendEmail({ listings });
    })
  } catch(err) {
    console.log('err in jobs: ', err);
    return err;
  }
};
