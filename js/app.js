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
  var table = document.getElementById(this.id); //table becomes grandparent!
  //making a new child element in the parent
  var tableRow = document.createElement('tr');

  var tableCell = document.createElement('td'); //new (grand) child element
  tableCell.textContent = this.location;
  tableRow.appendChild(tableCell); //append back to its parent

  for (var i = 0; i < this.dailyHourSales.length; i++) {

    tableCell = document.createElement('td');
    tableCell.textContent = this.dailyHourSales[i];
    tableRow.appendChild(tableCell); //append back to its parent
  }
  var tableCellTotal = document.createElement('td');
  tableCellTotal.textContent = this.dailyTotalSales;
  tableRow.appendChild(tableCellTotal);
  table.appendChild(tableRow); //append back to its parent

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

//===========Creating stores from constructor==============
var seattleStats = new Store('seattle-table', 'Seattle', 23, 64, 6.3);
var tokyoStats = new Store('tokyo-table', 'Tokyo', 3, 24, 1.2);
var dubaiStats = new Store('dubai-table', 'Dubai', 11, 38, 3.7);
var parisStats = new Store('paris-table', 'Paris', 20, 38, 2.3);
var limaStats = new Store('lima-table', 'Lima', 2, 16, 4.6);

//=====get the words on the page======
seattleStats.hourlyTraffic(); //1st - fill in some info via method
seattleStats.renderStoreInTable(); // 2nd render in table

tokyoStats.hourlyTraffic();
tokyoStats.renderStoreInTable();

dubaiStats.hourlyTraffic();
dubaiStats.renderStoreInTable();

parisStats.hourlyTraffic();
parisStats.renderStoreInTable();

limaStats.hourlyTraffic();
limaStats.renderStoreInTable();
