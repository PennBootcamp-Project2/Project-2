moment().format();
var book;
// var submitTitle = '';
// var submitPageCount = 0;

$( document ).ready(function() {
    
    //Handles retrieval from database and population of submission form.    
    var retrieveBook = function() {
        $.get("/api/books", function(data) { //replace with proper API route
            console.log("Books", data);
            for (var i = 0; i < data.length; i++) {
                // var $li = $('<li data-id=' + books[i].page_count + ' "presentation"><a role="menuitem" tabindex="-1">' + books[i].title + '</a></li>')
                // $("#selected-book").append($li)
                if (data[i].currentBook==true){
                    book = data[i]
                }
                if (data[i].start_date) {
                    regimenDisplayGenerator(book)
                }
            }
        })}
        retrieveBook()
        
        
        
        
        //Minor function that calculates a variable for #regimenInput
        var requiredReading = function(endDate, pageCount) {
            if (startDate === undefined) {
                var startDate = moment();
            }
            var numberOfDays = endDate.diff(startDate, 'days', true)
            // var startTime = Date.parse(startDate);
            // var endTime = Date.parse(endDate);
            // var numberOfDays = Math.round((endTime - startTime)/(1000*60*60*24));
            var pagesPerDay = Math.ceil(pageCount / numberOfDays);
            return pagesPerDay
        }
        
        var regimenDisplayGenerator = function(book) {
            
            var endDate = book.end_date
            var bookTitle = book.title;
            var pageCount = book.page_count;
            var currentPage = book.current_page;
            var startDate = book.start_date;
            
            
            var pagesPerDay = requiredReading(endDate, pageCount, startDate)
            var currentDate = moment();
            var numberOfDays = Math.ceil(endDate.diff(startDate, 'days', true))
            var X = Math.floor(currentDate.diff(startDate, 'days', true)) + 1
            var pagePercentage = Math.ceil(currentPage * 100 / pageCount)
            
            var $h3 = $("<h3>").text(bookTitle)
            
            var $p = $("<p>").text("Today is Day " + X + " of " + numberOfDays + ".\n Your target for today is Page " + X*pagesPerDay + ".")
            
            var $label = $("<label>").text("Current Page:")
            var $input = $("<input>").attr("id", "currentPage" + bookTitle).attr("type","text").attr("placeholder", 1)
            var $button = $("<button>").attr("type","submit").text("Update").addClass("update-progress")
            
            var $progress = $("<div>")
            .addClass("progress-bar-animated bg-info progress-bar progress-bar-striped")
            .attr("aria-valuemin", 0)
            .attr("aria-valuemax", 100)
            .attr("id", "progressBar")
            .attr("style", "width: " + pagePercentage + "%")
            .attr("aria-valuenow", pagePercentage)
            .text(bookTitle + ": " + pagePercentage + "%")
            .attr("role","progressbar");
            var $div = $("<div>").text("Current progress:").addClass("progress").attr("style", "height: 20px").append($progress)
            
            $("#regimenDisplay").append($h3).append($p).append($label).append($input).append($button).append($div)
        }
        
        
        $('#regimenInput').click(function (event) {
            //this initializes the regimen display
            //will most likely need to write a second function to handle generating the display from saved values
            event.preventDefault();
            $("#regimenDisplay").empty()
            var endDate = moment($("#date-input").val());
            var bookTitle = book.title;
            var pageCount = book.page_count;
            var currentPage = 0;
            // var pagesPerDay = requiredReading(endDate, pageCount)
            var startDate = moment();
            
            let book = {
                title: bookTitle, 
                page_count: pageCount,
                current_page: currentPage,
                start_date: startDate,
                end_date: endDate,
            }
            
            $.ajax({
                method: "POST",
                url: "/api/books/regimen",
                data: {
                    bookTitle: book.title,
                    page_count: book.pageCount,
                    current_page: book.currentPage,
                    start_date: book.startDate,
                    end_date: book.endDate
                }
            })
            //Put UPDATE/POST link here. Update start date, end date and current page where the title matches
            
            regimenDisplayGenerator(bookSubmission)
        })
        
        $(document).on("click", ".update-progress", function(){
            event.preventDefault();
            var title = $(this).attr("data-id")
            var currentPage = $("#currentPage" + title).val().trim()
            book.current_page = currentPage;
            //Put in API method to update current_page where title matches
            $("#regimenDisplay").empty()
            regimenDisplayGenerator(book)
        })
    })