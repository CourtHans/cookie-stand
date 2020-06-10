'use strict';

// Plan. Then do. Replace all object literals with a single constructor function that, when called with the ‘new’ keyword, it creates a new instance.
// Replace the lists data for each store and build a single table of data instead.


//=========global variables============
var operatingHours = ['6:00 am', '7:00 am', '8:00 am', '9:00am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm'];
var allBranches = [];

//=======random number generator=======

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//==========function to render to a header row within TABLE=======

function makeTableHeader(){
  var table = document.getElementById('store-table');
  var theTableHeader = document.createElement('tr');
  var tableStoreHeading = document.createElement('th');
  tableStoreHeading.textContent = 'Store';
  theTableHeader.appendChild(tableStoreHeading);

  for (var i = 0; i < operatingHours.length; i++){
    var tableHourHeadings = document.createElement('th');
    tableHourHeadings.textContent = operatingHours[i];
    theTableHeader.appendChild(tableHourHeadings);
  }
  var tableDailyTotalHeading = document.createElement('th');
  tableDailyTotalHeading.textContent = 'Daily Location Total';
  theTableHeader.appendChild(tableDailyTotalHeading);

  table.appendChild(theTableHeader);
}

//========make a footer for table with daily total sales by hour

function makeTableFooter(){
  var table = document.getElementById('store-table');
  var theTableFooter = document.createElement('tr');
  var tableHourlyTotalFooter = document.createElement('th');
  tableHourlyTotalFooter.textContent = 'Hourly totals';
  theTableFooter.appendChild(tableHourlyTotalFooter);

  for (var i = 0; i < operatingHours.length; i++){
    var tableFooterTotals = document.createElement('td');
    tableFooterTotals.textContent = seattleStats.dailyHourSales[i] + tokyoStats.dailyHourSales[i] + dubaiStats.dailyHourSales[i] + parisStats.dailyHourSales[i] + limaStats.dailyHourSales[i]; //is there a cleaner/more scalable way to do this?
    theTableFooter.appendChild(tableFooterTotals);
  }
  var tableFooterAllUpTotal = document.createElement('th');
  tableFooterAllUpTotal.textContent = seattleStats.dailyTotalSales + tokyoStats.dailyTotalSales + dubaiStats.dailyTotalSales + parisStats.dailyTotalSales + limaStats.dailyTotalSales; //is there a cleaner/more scalable way to do this?
  theTableFooter.appendChild(tableFooterAllUpTotal);

  table.appendChild(theTableFooter);
}

//===create function to render store info into a table===

function renderStoreInTable() {
  //creating a target
  var table = document.getElementById('store-table'); //table becomes grandparent!

  //making a new child element in the parent
  var tableRow = document.createElement('tr');

  var tableCell = document.createElement('th'); //new (grand) child element
  tableCell.textContent = this.location;
  tableRow.appendChild(tableCell); //append back to its parent

  for (var i = 0; i < this.dailyHourSales.length; i++) {

    tableCell = document.createElement('td');
    tableCell.textContent = this.dailyHourSales[i];
    tableRow.appendChild(tableCell); //append back to its parent
  }
  var tableCellTotal = document.createElement('th');
  tableCellTotal.textContent = this.dailyTotalSales;
  tableRow.appendChild(tableCellTotal);
  table.appendChild(tableRow); //append back to its parent
}

//=============New store constructor=============

function Store(id, location, minNum, maxNum, avgCookiePerCust) {
  this.id = id;
  this.location = location + ' store';
  this.minNum = minNum;
  this.maxNum = maxNum;
  this.avgCookiePerCust = avgCookiePerCust;
  this.dailyHourSales = [];
  this.dailyTotalSales = 0;
  allBranches.push(this);
}
//==========create hourlyCookieSales method=========

Store.prototype.hourlyCookieSales = function () {
  for (var i = 0; i < operatingHours.length; i++) {
    var footTraffic = generateRandomNumber(this.minNum, this.maxNum);
    var hourlySalesTotal = Math.round(footTraffic * this.avgCookiePerCust);
    this.dailyHourSales.push(hourlySalesTotal);
    this.dailyTotalSales += hourlySalesTotal;
  }
};

//==attach renderStoreInTable method to Store constructor
Store.prototype.renderStoreInTable = renderStoreInTable;

//===========Creating stores from constructor==============
var seattleStats = new Store('seattle-table', 'Seattle', 23, 64, 6.3);
var tokyoStats = new Store('tokyo-table', 'Tokyo', 3, 24, 1.2);
var dubaiStats = new Store('dubai-table', 'Dubai', 11, 38, 3.7);
var parisStats = new Store('paris-table', 'Paris', 20, 38, 2.3);
var limaStats = new Store('lima-table', 'Lima', 2, 16, 4.6);

//=====get the words on the page======!
makeTableHeader();

for (var ii = 0; ii < allBranches.length; ii++) {
  allBranches[ii].hourlyCookieSales();
  allBranches[ii].renderStoreInTable();
}

makeTableFooter();
