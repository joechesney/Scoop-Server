
// This function receives the productObj and just places some
// boolean values on it that will help the other functions
// determine what to do with this product
module.exports = (productObj) =>{
  if(productObj._embedded !== undefined){
    productObj.SCOOP = {
      hasPriceGuide: true,
      hasCompShop: false,
      hasNeither: false,
    }
    return productObj;

  } else if((productObj._embedded == undefined) && (productObj._links.comparison_shopping)){
    productObj.SCOOP = {
      hasPriceGuide: false,
      hasCompShop: true,
      hasNeither: false,
    }
    return productObj;

  } else if((!productObj._embedded) && (!productObj._links.comparison_shopping)){
    productObj.SCOOP = {
      hasPriceGuide: false,
      hasCompShop: false,
      hasNeither: true,
    }
    return productObj;
  }
}