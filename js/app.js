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
    var allBranchHourlySales = 0;
    for (var j = 0; j < allBranches.length; j++){
      allBranchHourlySales += allBranches[j].dailyHourSales[i];
    }
    tableFooterTotals.textContent = allBranchHourlySales;
    theTableFooter.appendChild(tableFooterTotals);
  }
  var tableFooterAllUpTotal = document.createElement('th');
  var allUpTotal = 0;
  for (var jj = 0; jj < allBranches.length; jj++){
    allUpTotal += allBranches[jj].dailyTotalSales;
  }
  tableFooterAllUpTotal.textContent = allUpTotal;
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
  this.id = id; //may not need this, leaving for now
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
new Store('seattle-object', 'Seattle', 23, 64, 6.3);
new Store('tokyo-object', 'Tokyo', 3, 24, 1.2);
new Store('dubai-object', 'Dubai', 11, 38, 3.7);
new Store('paris-object', 'Paris', 20, 38, 2.3);
new Store('lima-object', 'Lima', 2, 16, 4.6);

//=====get the words on the page=======!
makeTableHeader();

for (var ii = 0; ii < allBranches.length; ii++) {
  allBranches[ii].hourlyCookieSales();
  allBranches[ii].renderStoreInTable();
}

makeTableFooter();
