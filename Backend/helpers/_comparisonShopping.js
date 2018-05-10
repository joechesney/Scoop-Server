// Only products that do not have price-guide data will be passed
// into this function. It should calculate the price based on the
// caomparison_shopping property of the object and send back
// the productObj with that determined value as the productObj.SCOOP.priceToDisplay

module.exports = (productObj) =>{
  console.log('comparison shopping function:',productObj.new_low_price);
  console.log('comparison shopping function:',productObj.used_low_price);
  if(+productObj.used_low_price.amount > 0){
    // if the products price is below the comparison_price used_low then show
    // its price compared to that low
    let decimalOfMSRP = (+productObj.used_low_price.amount/+productObj.new_low_price.amount);
    let percentOfMSRP = 100 * decimalOfMSRP;
    let percentBelowMSRP = 100 - percentOfMSRP;
    productObj.SCOOP.priceToDisplay = +productObj.price.amount;

  }
}