
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
      const { products } = await assessScoopDeals(token, `/api/my/feed?page=1&per_page=40`);
      const  { listings } = await hyperionService(token);
      const allDeals = products.concat(listings);
      return await sendEmail(allDeals);
    })
  } catch(err) {
    console.log('err in jobs: ', err);
    return err;
  }
};
