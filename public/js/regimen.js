function getBooks() {
    $.get("/api/books", function(data) {
      console.log("Books", data);
      books = data;
      for (var i = 0; i < books.length; i++) {
         var $input = $("<input>").attr("value", books[i].title)
         .attr("data-id", books[i].page_count)
         .append(books[i].title);
         $("#selected-book").append($input)
      }

    });
  }

  $(function() {
    $('#calendar').fullCalendar({
    })
  });


var leisure = function() {
    // Guess we're pseudo coding this
    // Step 1: Pull the book's page count from the database
    // Step 2: get the $pagesPerDay from the user
    // Step 3: get a fresh startDate
    var startDate = new Date();
    // Step 4: use pageCount / $pagesPerDay to get how many days it'd take to read the book
    var numberOfDays = Math.ceil(pageCount / pagesPerDay);
    // Step 5: Calculate the proper date
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + numberOfDays);
    // Step 6: return that date
    return endDate
}

var requiredReading = function(endDate, pageCount) {
    //insert 'retrieving variables' code here
    var startDate = new Date();
    var startTime = Date.parse(startDate);
    var endTime = Date.parse(endDate);
    var numberOfDays = Math.round((endTime - startTime)/(1000*60*60*24));
    var pagesPerDay = Math.ceil(pageCount / numberOfDays);
    return pagesPerDay
}


$('#dateInput').click(function (event) {
    event.preventDefault();
    var endDate = $("#date-input").val();
    var pageCount = 723
    var bookTitle = "Big Iron"
    console.log(pageCount, bookTitle)
    var pagesPerDay = requiredReading(endDate, pageCount)
    $('#calendar').fullCalendar('renderEvent', {
                title: "Big Iron",
                start: new Date(),
                end: endDate
            }
)
    console.log("Well, it ran.")
})