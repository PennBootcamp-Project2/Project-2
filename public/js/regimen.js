
moment().format();

$( document ).ready(function() {
// function getBooks() {
//     $.get("/api/books", function(data) {
//       console.log("Books", data);
//       books = data;
//       for (var i = 0; i < books.length; i++) {
//          var $input = $("<input>").attr("value", books[i].title)
//          .attr("data-id", books[i].page_count)
//          .append(books[i].title);
//          $("#selected-book").append($input)
//       }

//     });
//   }



var leisure = function() {
    //Not sure if we're still going with this mode, but keeping the code around in case
    var startDate = new Date();
    // Step 4: use pageCount / $pagesPerDay to get how many days it'd take to read the book
    var numberOfDays = Math.ceil(pageCount / pagesPerDay);
    // Step 5: Calculate the proper date
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + numberOfDays);
    // Step 6: return that date
    return endDate
}

$(document).on("click", ".update-progress", function(){
    event.preventDefault();



})

var requiredReading = function(endDate, pageCount) {
    //insert 'retrieving variables' code here
    var startDate = moment();
    var numberOfDays = endDate.diff(startDate, 'days', true)
    // var startTime = Date.parse(startDate);
    // var endTime = Date.parse(endDate);
    // var numberOfDays = Math.round((endTime - startTime)/(1000*60*60*24));
    var pagesPerDay = Math.ceil(pageCount / numberOfDays);
    return pagesPerDay
}




$('#regimenInput').click(function (event) {
    //this initializes the regimen display
    //will most likely need to write a second function to handle generating the display from saved values
    event.preventDefault();
    var endDate = moment($("#date-input").val());
    var pageCount = 723
    var bookTitle = "Big Iron"
    console.log(pageCount, bookTitle)
    var pagesPerDay = requiredReading(endDate, pageCount)
    var startDate = moment();
    var numberOfDays = Math.ceil(endDate.diff(startDate, 'days', true))
    var $h3 = $("<h3>").text(bookTitle)

    var $p = $("<p>").html("Today is Day " + 1 + " of " + numberOfDays + ".\n Your target for today is Page " + pagesPerDay + ".")

    var $label = $("<label>").text("Current Page:")
    var $input = $("<input>").attr("type","text").attr("placeholder", 1)
    var $button = $("<button>").attr("type","submit").text("Update").addClass("update-progress")

    var $progress = $("<div>")
    .addClass("progress-bar-animated bg-info progress-bar progress-bar-striped")
    .attr("aria-valuemin", 0)
    .attr("aria-valuemax", 100)
    .attr("style", "width: " + 0 + "%")
    .attr("aria-valuenow", 0)
    .text(bookTitle + ": " + 0 + "%")
    .attr("role","progressbar");
    var $div = $("<div>").addClass("progress").attr("style", "height: 20px").append($progress)

    $("#regimenDisplay").append($h3).append($p).append($label).append($input).append($button).append($div)
})

 var regimenDisplayGenerator = function (){
    //this generates the regimen display from saved books
    //will most likely need to write a second function to handle generating the display from saved values
    event.preventDefault();
    var endDate = moment($("#date-input").val());
    var currentPage = $("#currentPage").val()
    var pageCount = 723
    var bookTitle = "Big Iron"
    console.log(pageCount, bookTitle)
    var pagesPerDay = requiredReading(endDate, pageCount)
    var startDate = moment();
    var numberOfDays = endDate.diff(startDate, 'days', true)
    var pagePercentage = Math.ceil(currentPage * 100 / pageCount)
    var $h3 = $("<h3>").text(bookTitle)

    var $p = $("<p>").text("Today is Day " + X + " of " + numberOfDays + ". You should be on Page " + X*pagesPerDay + "by the end of today.")

    var $label = $("<label>").text("Current Page:")
    var $input = $("<input>").attr("type","text").attr("placeholder", 1)
    var $button = $("<button>").attr("type","submit").text("Update").addClass("update-progress")

    var $progress = $("<div>")
    .addClass("progress-bar-animated bg-info progress-bar progress-bar-striped")
    .attr("aria-valuemin", 0)
    .attr("aria-valuemax", 100)
    .attr("style", "width: " + pagePercentage + "%")
    .attr("aria-valuenow", pagePercentage)
    .text(bookTitle + ": " + pagePercentage + "%")
    .attr("role","progressbar");
    var $div = $("<div>").text("Current progress:").addClass("progress").attr("style", "height: 20px").append($progress)

    $("#regimenDisplay").append($h3).append($label).append($input).append($button).append($div)
 }
})