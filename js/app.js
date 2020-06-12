'use strict';

// Form is built in sales.html
// Create an event handler that creates a new instance of a cookie stand that appends to the table upon form submission
//REMINDER:
// 1.   Target
// 2.   Listen
// 2.5  Type of event
// 2.5b Callback function to handle it (later)
//Forms MUST HAVE a .preventDefault handler to stop JS from clearing page

//event should trigger new Store(INPUT SHOULD GO HERE);

//========form info capture===========

var newStoreInput = document.getElementById('storeUpdateForm');
newStoreInput.addEventListener('submit', captureNewStoreInfo);

function captureNewStoreInfo (eventCapture){
  eventCapture.preventDefault();
  //hat tip Nich and https://www.w3schools.com/jsref/jsref_parseint.asp for info on parsing strings (user input) to number
  var captureLocation = eventCapture.target.inputLocation.value;
  var captureMinNum = parseInt(eventCapture.target.inputMinNum.value);
  var captureMaxNum = parseInt(eventCapture.target.inputMaxNum.value);
  var captureAvgCookiePerCust = parseInt(eventCapture.target.inputAvgCookiePerCust.value);

  console.log(captureLocation, captureMinNum, captureMaxNum, captureAvgCookiePerCust);

  var newStoreCapture = new Store(captureLocation, captureMinNum, captureMaxNum, captureAvgCookiePerCust);

  newStoreCapture.hourlyCookieSales(); //not working
  //erase footer
  document.getElementById('store-table').deleteRow(-1);
  newStoreCapture.renderStoreInTable();
  //add footer back in
  makeTableFooter();
  //helpful hints provided by https://www.w3schools.com/jsref/met_table_deleterow.asp

  //i will also want it to then clear the fields for better user experience?
}

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
