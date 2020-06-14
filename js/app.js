'use strict';

//========form info capture===========
//helpful hints provided by https://www.w3schools.com/jsref/met_table_deleterow.asp, as well as diff b/w parseInt and parseFloat and the .reset option and discussion w Nich to isolate the issue of user input strings (even though form type is "number")

var newStoreInput = document.getElementById('storeUpdateForm');
newStoreInput.addEventListener('submit', captureNewStoreInfo);

function captureNewStoreInfo (eventCapture){
  eventCapture.preventDefault();
  var captureLocation = eventCapture.target.inputLocation.value;
  var captureMinNum = parseInt(eventCapture.target.inputMinNum.value);
  var captureMaxNum = parseInt(eventCapture.target.inputMaxNum.value);
  var captureAvgCookiePerCust = parseFloat(eventCapture.target.inputAvgCookiePerCust.value);

  var newStoreCapture = new Store(captureLocation, captureMinNum, captureMaxNum, captureAvgCookiePerCust);

  newStoreCapture.hourlyCookieSales();
  //erase footer
  document.getElementById('store-table').deleteRow(-1);
  newStoreCapture.renderStoreInTable();
  //add footer back in
  makeTableFooter();
  //clear the form
  document.getElementById('storeUpdateForm').reset();
}

//=========global variables============
var operatingHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

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

  var table = document.getElementById('store-table');
  var tableRow = document.createElement('tr');
  var tableCell = document.createElement('th');
  tableCell.textContent = this.location;
  tableRow.appendChild(tableCell);

  for (var i = 0; i < this.dailyHourSales.length; i++) {

    tableCell = document.createElement('td');
    tableCell.textContent = this.dailyHourSales[i];
    tableRow.appendChild(tableCell);
  }
  var tableCellTotal = document.createElement('th');
  tableCellTotal.textContent = this.dailyTotalSales;
  tableRow.appendChild(tableCellTotal);
  table.appendChild(tableRow);
}

//=============New store constructor=============

function Store(location, minNum, maxNum, avgCookiePerCust) {
  this.location = location;
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
new Store('Seattle', 23, 64, 6.3);
new Store('Tokyo', 3, 24, 1.2);
new Store('Dubai', 11, 38, 3.7);
new Store('Paris', 20, 38, 2.3);
new Store('Lima', 2, 16, 4.6);

//=====get the words on the page=======!!
makeTableHeader();

//trigger this to rerun if new store entered?
for (var ii = 0; ii < allBranches.length; ii++) {
  allBranches[ii].hourlyCookieSales();
  allBranches[ii].renderStoreInTable();
}

makeTableFooter();
