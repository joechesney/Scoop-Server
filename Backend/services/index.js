
const { getProductsList } = require('./getProductsList');
const { getSingleProduct } = require('./getSingleProduct');
const { loginAuth } = require('./loginAuth');
const { getCompShopData } = require('./getCompShopData');
const { hyperionService } = require('./hyperionService');
const { sendEmail } = require('./sendEmail');

module.exports = {
  getProductsList,
  getSingleProduct,
  loginAuth,
  getCompShopData,
  hyperionService,
  sendEmail
}
