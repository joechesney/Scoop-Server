// const { personalEmailAddress, personalEmailAddressKey } = require('./secrets');
const nodemailer = require('nodemailer');

module.exports = async ({ listings }) => {
  const listingsHTML = listings.map((listing) => (`
    <p>
      <br>
      <img src="${listing.photos[0]._links.thumbnail}">
      <a href=${listing._links.web.href} target="_blank">${listing.title} ${listing.price.display}</a>
      <br>
    </p>
  `));
  const email = process.env.EMAIL_DESTINATION;
  const key = process.env.EMAIL_KEY;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: key
    }
  });
  const mailOptions = {
    from: email,
    to: email,
    subject: "HYPERION",
    html: `
      ${listingsHTML}
    `
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log('err : ', err);
      return(err);
    }
    else return (info);
  });

}

