
// This function receives the productObj and just places some
// boolean values on it that will help the other functions
// determine what to do with this product
// Every product will be run through this function first

module.exports = (productObj) =>{

  // The first case is the ideal case
  // This will be true if the product itself has comparison
  // price data directly attached to it
  if(productObj._embedded !== undefined){
    productObj.SCOOP = {
      hasPriceGuide: true,
      hasCompShop: false,
      hasNeither: false,
    }
    return productObj;

    // The second case is the 2nd most ideal choice
    // These products do not have market price data attached to them,
    // but they do have a url attached that can be used to make another
    // ajax call where i can GET some market price data
  } else if((productObj._embedded == undefined) && (productObj._links.comparison_shopping)){
    productObj.SCOOP = {
      hasPriceGuide: false,
      hasCompShop: true,
      hasNeither: false,
    }
    return productObj;

    // These products that don't have price data attached AND
    // don't have a url where that data can be retieved are
    // fairly rare, but they do exist. These products are most likely
    // unique and/or "one off" items that are not sold very often
    // Because these items do not have market values to compare to,
    // they are never rendered to the site. This was an executive decision
    // made to not mislead users who might see the "This is the lowest price available"
    // banner and think that the product is a good deal, when it is not
  } else if((!productObj._embedded) && (!productObj._links.comparison_shopping)){
    productObj.SCOOP = {
      hasPriceGuide: false,
      hasCompShop: false,
      hasNeither: true,
    }
    return productObj;
  } else {
    // every single product should be returned by this time
    // If it's not returned by now, then this is an extremely rare
    // case, and this console log will let developers know about
    // this outlier product
    console.log('This Product is an outlier and has not been returned by determineSituationHelper: ',productObj);
  }
}