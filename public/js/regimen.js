var startDate = new Date();
var endDate;
var pagesPerDay;

var leisure = function() {
    // Guess we're pseudo coding this
    // Step 1: Pull the book's page count from the database
    // Step 2: get the $pagesPerDay from the user
    // Step 3: get a fresh startDate
    var startDate = new Date();
    // Step 4: use pageCount / $pagesPerDay to get how many days it'd take to read the book
    var numberOfDays = Math.ceil($pageCount / pagesPerDay);
    // Step 5: Use Datejs to calculate the proper date
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + numberOfDays);
    // Step 6: return that date
    return endDate
}

var required = function() {
    //insert 'retrieving variables' code here
    var numberOfDays = Math.round((endDate.getTime() - startDate.getTime())/(1000*60*60*24));
    var pagesPerDay = Math.ceil($pageCount / numberOfDays);
    return pagesPerDay
}