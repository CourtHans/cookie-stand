'use strict';

//Write an object that keeps track of sales data for 5 locations, design it to scale for multiple/indeterminate number of locations. Operating hours are currently 6am-7pm, calculate number of cookies sold by randomly generating # of customers per hour (for each location), and multiplying by avg cookies sold/customer (unique to each location). Help from Skyler in a group w/ Colleen, Matt, Chandler, and Tia.


//=========global variables============
var operatingHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

//random number generator inclusive of minimum number https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// TODO: Figure out the daily pull
//====function to pull hourly and total sales *BUT THINK ONLY PULLING SEATTLE?====
function hourlyTraffic(seattleStats) {
  for (var i = 0; i < operatingHours.length; i++) {
    var footTraffic = generateRandomNumber(seattleStats.minNum, seattleStats.maxNum);
    var hourlySalesTotal = Math.round(footTraffic * seattleStats.avgCookiePerCust);
    seattleStats.dailyHourSales.push(hourlySalesTotal);
    seattleStats.dailyTotalSales += hourlySalesTotal;
  }
}

//=======test universal======
// var hourlyTraffic = function() {
//   for (var i = 0; i < operatingHours.length; i++) {
//     var footTraffic = generateRandomNumber(this.minNum, this.maxNum);
//     var hourlySalesTotal = Math.round(footTraffic * this.avgCookiePerCust);
//     this.dailyHourSales.push(hourlySalesTotal);
//     this.dailyTotalSales += hourlySalesTotal;
//   }
// };

//===========Seattle store==============
var seattleStats = {
  location: 'Seattle',
  minNum: 23,
  maxNum: 64,
  avgCookiePerCust: 6.3,
  dailyHourSales: [], //will hold the sales numbers calculated via hourlyTraffic loop above in an array
  dailyTotalSales: 0, //will hold the DAILY sales numbers calculated via hourlyTraffic loop above
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
      storeList.appendChild(storeStats);
    }
    storeStats = document.createElement('li');
    storeStats.textContent = 'Total : ' + this.dailyTotalSales + ' cookies';
    storeList.appendChild(storeStats);
  }
};

//===========Tokyo store==============
var tokyoStats = {
  location: 'Tokyo',
  minNum: 3,
  maxNum: 24,
  avgCookiePerCust: 1.2,
  dailyHourSales: [], //will hold the sales numbers calculated via calculateEachHourCookieSales loop below in an array
  dailyTotalSales: 0, //will hold the DAILY sales numbers calculated via calculateDailySales loop below
  // calculate daily total sales by adding all hourly sales


  renderToPage: function () {
    //Step 1: identify target
    var storeList = document.getElementById('tokyo-list');
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
      storeList.appendChild(storeStats);
    }
    storeStats = document.createElement('li');
    storeStats.textContent = 'Total : ' + this.dailyTotalSales + ' cookies';
    storeList.appendChild(storeStats);
  }
};

//===========Dubai store==============
var dubaiStats = {
  location: 'Dubai',
  minNum: 11,
  maxNum: 38,
  avgCookiePerCust: 3.7,
  dailyHourSales: [], //will hold the sales numbers calculated via calculateEachHourCookieSales loop below in an array
  dailyTotalSales: 0, //will hold the DAILY sales numbers calculated via calculateDailySales loop below
  // calculate daily total sales by adding all hourly sales


  renderToPage: function () {
    //Step 1: identify target
    var storeList = document.getElementById('dubai-list');
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
      storeList.appendChild(storeStats);
    }
    storeStats = document.createElement('li');
    storeStats.textContent = 'Total : ' + this.dailyTotalSales + ' cookies';
    storeList.appendChild(storeStats);
  }
};

//===========Paris store==============
var parisStats = {
  location: 'Paris',
  minNum: 20,
  maxNum: 38,
  avgCookiePerCust: 2.3,
  dailyHourSales: [], //will hold the sales numbers calculated via calculateEachHourCookieSales loop below in an array
  dailyTotalSales: 0, //will hold the DAILY sales numbers calculated via calculateDailySales loop below
  // calculate daily total sales by adding all hourly sales


  renderToPage: function () {
    //Step 1: identify target
    var storeList = document.getElementById('paris-list');
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
      storeList.appendChild(storeStats);
    }
    storeStats = document.createElement('li');
    storeStats.textContent = 'Total : ' + this.dailyTotalSales + ' cookies';
    storeList.appendChild(storeStats);
  }
};

//===========Lima store==============
var limaStats = {
  location: 'Lima',
  minNum: 2,
  maxNum: 16,
  avgCookiePerCust: 4.6,
  dailyHourSales: [], //will hold the sales numbers calculated via calculateEachHourCookieSales loop below in an array
  dailyTotalSales: 0, //will hold the DAILY sales numbers calculated via calculateDailySales loop below
  // calculate daily total sales by adding all hourly sales


  renderToPage: function () {
    //Step 1: identify target
    var storeList = document.getElementById('lima-list');
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
      storeList.appendChild(storeStats);
    }
    storeStats = document.createElement('li');
    storeStats.textContent = 'Total : ' + this.dailyTotalSales + ' cookies';
    storeList.appendChild(storeStats);
  }
};

//===========call the functions!=============
console.log('dailyHourSales', seattleStats.dailyHourSales);
console.log('dailyTotalSales', seattleStats.dailyTotalSales);
hourlyTraffic(seattleStats);
seattleStats.renderToPage();
hourlyTraffic(tokyoStats);
tokyoStats.renderToPage();
hourlyTraffic(dubaiStats);
dubaiStats.renderToPage();
hourlyTraffic(parisStats);
parisStats.renderToPage();
hourlyTraffic(limaStats);
limaStats.renderToPage();
