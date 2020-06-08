'use strict';

//Write an object that keeps track of sales data for 5 locations, design it to scale for multiple/indeterminate number of locations. Operating hours are currently 6am-7pm, calculate number of cookies sold by randomly generating # of customers per hour (for each location), and multiplying by avg cookies sold/customer (unique to each location). Help from Skyler in a group w/ Colleen, Matt, Chandler, and Tia.


//=========global variables============
var operatingHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
//random number generator inclusive of minimum number https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function generateRandomNumber(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min 
}

var seattleStats = {
  location : 'Seattle',
  minNumSeattle: 23,
  maxNumSeattle: 64,
  avgCookiePerCust : 6.3,
  dailyHourSales : [], //will hold the sales numbers calculated via calculateEachHourCookieSales loop below in an array
  dailyTotalSales: 
  calculateEachHourCookieSales : function {
    for(var = i; operatingHours.length; i++){
      var footTraffic = generateRandomNumber(this.minNumSeattle, this.maxNumSeattle);
      var hourlySalesTotal = Math.round(footTraffic * this.avgCookiePerCust);
      this.dailyHourSales.push(hourlySalesTotal);
    }
  }
}