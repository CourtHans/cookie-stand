'use strict';

//Write an object that keeps track of sales data for 5 locations, design it to scale for multiple/indeterminate number of locations. Operating hours are currently 6am-7pm, calculate number of cookies sold by randomly generating # of customers per hour (for each location), and multiplying by avg cookies sold/customer (unique to each location). Help from Skyler in a group w/ Colleen, Matt, Chandler, and Tia.


//=========global variables============
var operatingHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
//random number generator inclusive of minimum number https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function hourlyTraffic(seattleStats) {
  for (var i = 0; i < operatingHours.length; i++) {
    var footTraffic = generateRandomNumber(seattleStats.minNumSeattle, seattleStats.maxNumSeattle);
    var hourlySalesTotal = Math.round(footTraffic * seattleStats.avgCookiePerCust);
    seattleStats.dailyHourSales.push(hourlySalesTotal);
    seattleStats.dailyTotalSales += hourlySalesTotal;
  }
}

//===========Seattle store==============
var seattleStats = {
  location: 'Seattle',
  minNumSeattle: 23,
  maxNumSeattle: 64,
  avgCookiePerCust: 6.3,
  dailyHourSales: [], //will hold the sales numbers calculated via calculateEachHourCookieSales loop below in an array
  dailyTotalSales: 0, //will hold the DAILY sales numbers calculated via calculateDailySales loop below
  // calculate daily total sales by adding all hourly sales


  renderToPage: function () {
    //Step 1: identify target
    var storeList = document.getElementById('seattle-list');
    //Step 2: create new element
    var storeStats = document.createElement('h2');
    //Step 2.5: get content
    storeStats.textContent = this.location;
    //Step 3: insert element/content into target
    storeList.appendChild(storeStats);

    //write list of hours and hourly sales
    for (var i = 0; i < operatingHours.length; i++) {
      storeStats = document.createElement('li');
      storeStats.textContent = operatingHours[i] + ' : ' + this.dailyHourSales[i] + ' cookies';
      console.log(this.calculateEachHourCookieSales);
      storeList.appendChild(storeStats);
    }
    storeStats = document.createElement('li');
    storeStats.textContent = 'Total : ' + this.dailyTotalSales + ' cookies';
    storeList.appendChild(storeStats);
    //add in total sales
    // storeStats = document.createElement('li');
    // storeStats = textContent = this.location;
    // storeList.appendChild()
  }
};

console.log('dailyHourSales', seattleStats.dailyHourSales);
hourlyTraffic(seattleStats);
seattleStats.renderToPage();
