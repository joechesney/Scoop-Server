
const getProductsList = require('./getProductsList');
const getSingleProduct = require('./getSingleProduct');
const loginAuth = require('./loginAuth');
const firebaseAuth = require('./firebaseAuth');
const getCompShopData = require('./getCompShopData');
const sendText = require('./sendText');
const hyperionService = require('./hyperionService');
const postToFirebase = require('./postToFirebase');
const sendEmail = require('./sendEmail');

module.exports={
  getProductsList,
  getSingleProduct,
  loginAuth,
  sendText,
  getCompShopData,
  hyperionService,
  postToFirebase,
  sendEmail
}
