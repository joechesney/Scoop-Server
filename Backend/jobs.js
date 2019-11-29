
const {
  hyperionService,
  sendEmail,
  loginAuth
} = require("./services/");

const { assessScoopDeals } = require('./services/assessScoopDeals');


module.exports.jobs = async() => {
  try {
    loginAuth()
    .then(async(token) => {
      const scoopDeals = assessScoopDeals();
      const  { listings } = await hyperionService(token);
      const allDeals = scoopDeals.concat(listings);
      return await sendEmail(allDeals);
    })
  } catch(err) {
    console.log('err in jobs: ', err);
    return err;
  }
};
