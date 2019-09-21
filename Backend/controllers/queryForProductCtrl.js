
const {
  loginAuth,
  hyperionService,
  firebaseAuth,
  postToFirebase,
  sendEmail
} = require("../models/");


module.exports.queryForProductCtrl = (req, res, next) => {
  loginAuth()
  .then(async({ access_token }) => {
    // 1. get the listings
    const hypeListings = await hyperionService(access_token);
    const ids = hypeListings.body.listings.map((listing) => listing.id);
    console.log('ids : ', ids);
    // const firebaseResponse = await postToFirebase({ endpoint: 'first', data: 'sup'})
    // console.log('firebaseResponse : ', firebaseResponse);
    // 2. check that the current array is different from the array on firebase
    // const firebaseAuthStuff = await firebaseAuth()
    // 3. email the listings of the DIFFERENT ids
    // 4. send the array of listing ids to firebase to save
    
    res.send(hypeListings)
  })
  .catch(err => next(err))
}
