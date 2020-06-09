'use strict';

// Plan. Then do. Replace all object literals with a single constructor function that, when called with the ‘new’ keyword, it creates a new instance.
// Replace the lists data for each store and build a single table of data instead.


//=========global variables============
var operatingHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];


//=======random number generator=======
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//==========function to render to page=======
function renderStore() {
  var storeList = document.getElementById(this.id);
  var storeStats = document.createElement('h2');
  storeStats.textContent = this.location;
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

//==========function to render to TABLE=======
function renderStoreInTable() {
  //creating a target
  var table = document.getElementById(this.id);
  //making a new child element in the parent
  var tableRow = document.createElement('tr');

  var tableCell = document.createElement('td');
  tableCell.textContent = this.location;
  tableRow.appendChild(tableCell);

  for (var i = 0; i < operatingHours.length; i++) {

    tableCell = document.createElement('td');
    tableCell.textContent = operatingHours[i];
    tableRow.appendChild(tableCell);
  }

  table.appendChild(tableRow);

}

//==========New store constructor======
function Store(id, location, minNum, maxNum, avgCookiePerCust) {
  this.id = id;
  this.location = location + ' store';
  this.minNum = minNum;
  this.maxNum = maxNum;
  this.avgCookiePerCust = avgCookiePerCust;
  this.dailyHourSales = [];
  this.dailyTotalSales = 0;
}
//==========create hourlyTraffic method=========
Store.prototype.hourlyTraffic = function () {
  for (var i = 0; i < operatingHours.length; i++) {
    var footTraffic = generateRandomNumber(this.minNum, this.maxNum);
    var hourlySalesTotal = Math.round(footTraffic * this.avgCookiePerCust);
    this.dailyHourSales.push(hourlySalesTotal);
    this.dailyTotalSales += hourlySalesTotal;
  }
};
//==attach renderToPage method to Store constructor
Store.prototype.renderToPage = renderStore;

//==attach renderStoreInTable method to Store constructor
Store.prototype.renderStoreInTable = renderStoreInTable;

//===========Seattle store from constructor==============
var seattleStats = new Store('seattle-table', 'Seattle', 23, 64, 6.3);

//=====get the words on the page======
seattleStats.hourlyTraffic(); //1st - fill it
// seattleStats.renderToPage(); //2nd - render it (unnecessary bc now in table)
seattleStats.renderStoreInTable(); // render in table



//===========Seattle store OLD/object literal ==============
// var seattleStats0 = {
//   location: 'Seattle',
//   minNum: 23,
//   maxNum: 64,
//   avgCookiePerCust: 6.3,
//   dailyHourSales: [], //will hold the sales numbers calculated via hourlyTraffic loop above in an array
//   dailyTotalSales: 0, //will hold the DAILY sales numbers calculated via hourlyTraffic loop above
//   // calculate daily total sales by adding all hourly sales
//   hourlyTraffic:

//     renderToPage: function() {
//       //Step 1: identify target
//       var storeList = document.getElementById('seattle-list');
//       //Step 2: create new element
//       var storeStats = document.createElement('h2');
//       //Step 2.5: get content
//       storeStats.textContent = this.location;
//       //Step 3: insert element/content into target
//       storeList.appendChild(storeStats);

//       //write list of hours and hourly sales
//       for (var i = 0; i < operatingHours.length; i++) {
//         storeStats = document.createElement('li');
//         storeStats.textContent = operatingHours[i] + ' : ' + this.dailyHourSales[i] + ' cookies';
//         storeList.appendChild(storeStats);
//       }
//       storeStats = document.createElement('li');
//       storeStats.textContent = 'Total : ' + this.dailyTotalSales + ' cookies';
//       storeList.appendChild(storeStats);
//     }
// };



// //===========call the functions!=============
// console.log('dailyHourSales', seattleStats.dailyHourSales);
// console.log('dailyTotalSales', seattleStats.dailyTotalSales);
// seattleStats.hourlyTraffic();
// seattleStats.renderToPage();
// hourlyTraffic(tokyoStats);
// tokyoStats.renderToPage();
// hourlyTraffic(dubaiStats);
// dubaiStats.renderToPage();
// hourlyTraffic(parisStats);
// parisStats.renderToPage();
// hourlyTraffic(limaStats);
// limaStats.renderToPage();
