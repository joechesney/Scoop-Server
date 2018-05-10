// Only object that have neither price-guide data nor
// comparison_shopping data will be passed into this function

module.exports = (productObj) => {
  if((productObj._embedded == undefined) && (!productObj._links.comparison_shopping)){
    productObj.SCOOP.priceToDisplay = +productObj.price.amount;
    return productObj;
  } else {
    console.log('WTFFFFF in _neither.js',productObj.model);
  }
}