// const { personalEmailAddress, personalEmailAddressKey } = require('./secrets');
const nodemailer = require('nodemailer');

module.exports.sendEmail = async (listings) => {
  const shits = [
    'balaguer',
    'devi',
    'wes audio',
    'wesaudio',
    'stagg'
  ];

  const onlyHyperions = listings.filter(listing => {
    let count = 0;
    const dems = shits.map(shit => {
      if (listing.title.toLowerCase().indexOf(shit) !== -1){
        count++;
      }
    });
    if (count === 0) {
      return listing;
    }
  });

  const noGuitars = onlyHyperions.filter(listing => {
    if (listing.price.amount_cents < 50000) return listing;
  })

  const listingsHTML = noGuitars.map((listing) => {
    return (`
    <p>
      <br>
      <img src="${listing.photos[0]._links.thumbnail.href}" />
      <a href=${listing._links.web.href} target="_blank">${listing.title} ${listing.price.display}</a>
      <br>
    </p>
  `)});
  // const secrets = require('./secrets');
  // const email = secrets.personalEmailAddress;
  // const key = secrets.personalEmailAddressKey;
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

