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
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if(error) throw(error)
      return (info);
    });

  } catch(error) {
    console.log('err in sendEmail: ', err);
    return (error)
  }

}

