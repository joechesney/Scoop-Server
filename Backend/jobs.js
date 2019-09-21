
var CronJob = require('cron').CronJob;
const {
  hyperionService,
  sendEmail,
  loginAuth
} = require("./models/");

module.exports = async() => {
  console.log('hello : ');
  loginAuth()
  .then(async({ access_token }) => {
    console.log('access_token : ', access_token);
    const hypeListings = await hyperionService(access_token);
    await sendEmail({listings: hypeListings.body.listings});

    // const ids = hypeListings.body.listings.map((listing) => listing.id);

    
    // const every12Hours = '* * */12 * * *';
    // const every12Minutes = '* */12 * * * *';
    // const morning = new CronJob(every12Minutes, async function() {
    //   const emailResponse = await sendEmail({listings: hypeListings.body.listings});
    //   console.log('emailResponse : ', Date.now().toLocaleString(), emailResponse);
    // }, null, true, 'America/Chicago');
    // res.send(hypeListings);

    // morning.start();
  })
};
