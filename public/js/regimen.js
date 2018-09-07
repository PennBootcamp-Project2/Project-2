
moment().format();
var submitTitle = '';
var submitPageCount = 0;

$( document ).ready(function() {
    
    //Handles retrieval from database and population of submission form.    
    function retrieveBooks() {
        $.get("/api/books", function(data) {
            console.log("Books", data);
            books = data;
            for (var i = 0; i < books.length; i++) {
                var $li = $('<li data-id=' + books[i].page_count + ' "presentation"><a role="menuitem" tabindex="-1">' + books[i].title + '</a></li>')
                $("#selected-book").append($li)
            }
        })}
        getBooks()
        //     });
        //   }
        
        //Saves the book the user selects.
        $(".dropdown").on("show.bs.dropdown", function(event){
            submitTitle = $(event.relatedTarget).text(); // Get the text of the element
            submitPageCount = $(event.relatedTarget).attr("data-id");
        });
        
        //Minor function that calculates a variable for #regimenInput
        var requiredReading = function(endDate, pageCount, startDate) {
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
        
        
        
        
        
        $('#regimenInput').click(function (event) {
            //this initializes the regimen display
            //will most likely need to write a second function to handle generating the display from saved values
            event.preventDefault();
            $("#regimenDisplay").empty()
            var endDate = moment($("#date-input").val());
            var bookTitle = submitTitle;
            var pageCount = submitPageCount;
            var currentPage = 0;
            console.log(pageCount, bookTitle)
            // var pagesPerDay = requiredReading(endDate, pageCount)
            var startDate = moment();

            //Put UPDATE link here. Update start date, end date and current page where the title matches


            // var numberOfDays = Math.ceil(endDate.diff(startDate, 'days', true))
            // var $h3 = $("<h3>").text(bookTitle)
            
            // var $p = $("<p>").html("Today is Day " + 1 + " of " + numberOfDays + ".\n Your target for today is Page " + pagesPerDay + ".")
            
            // var $label = $("<label>").text("Current Page:")
            // var $input = $("<input>").attr("type","text").attr("placeholder", 1)
            // var $button = $("<button>").attr("type","submit").text("Update").addClass("update-progress").attr("data-id", bookTitle)
            
            // var $progress = $("<div>")
            // .addClass("progress-bar-animated bg-info progress-bar progress-bar-striped")
            // .attr("aria-valuemin", 0)
            // .attr("aria-valuemax", 100)
            // .attr("style", "width: " + 0 + "%")
            // .attr("aria-valuenow", 0)
            // .text(bookTitle + ": " + 0 + "%")
            // .attr("role","progressbar");
            // var $div = $("<div>").addClass("progress").attr("style", "height: 20px").append($progress)
            
            // $("#regimenDisplay").append($h3).append($p).append($label).append($input).append($button).append($div)
        })
        
        var regimenDisplayGenerator = function (){
            
            $("#regimenDisplay").empty()
            for (i=0;i<books.length;i++) {
                if (!books[i].end_date) {}
                else {
                    var endDate = books[i].end_date;
                    var currentPage = books[i].current_page;
                    var pageCount = books[i].page_count;
                    var startDate = books[i].start_date;
                    var bookTitle = books[i].title
                    var pagesPerDay = requiredReading(endDate, pageCount, startDate)
                    var currentDate = moment();
                    var numberOfDays = endDate.diff(startDate, 'days', true)
                    var X = currentDate.diff(startDate, 'days', true) + 1
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
                    .attr("style", "width: " + pagePercentage + "%")
                    .attr("aria-valuenow", pagePercentage)
                    .text(bookTitle + ": " + pagePercentage + "%")
                    .attr("role","progressbar");
                    var $div = $("<div>").text("Current progress:").addClass("progress").attr("style", "height: 20px").append($progress)
                    
                    $("#regimenDisplay").append($h3).append($p)append($label).append($input).append($button).append($div)
                }
                
            }
        }
        
        
        //
        $(document).on("click", ".update-progress", function(){
            event.preventDefault();
            var title = $(this).attr("data-id")
            currentPage = $("#currentPage" + title).val().trim()
            //Put in API method to update database here
            regimenDisplayGenerator()
        })
    })