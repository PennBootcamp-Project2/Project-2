$('#bookSearch').click(function (event) {
    event.preventDefault();
    console.log('bookSearch button clicked');
    var input = {};
    input.isbn = $("#isbn-input").val();
    input.title = $("#title-input").val();
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q="
    if (input.isbn) {
      queryURL = queryURL + "+isbn:" + input.isbn
    }
    if (input.title) {
      queryURL = queryURL + "+intitle:" + input.title
    }
    console.log(queryURL)
    
    $.ajax({
      url: queryURL,
      type: "GET"
    }).then(function (result) {
      $("#search-results-title").show();
      $("#book-info").empty()
      console.log(result.items[0].volumeInfo.title)
      var books = result.items
      for (i = 0; i < books.length; i++) {
        console.log("tick")
        var $li = $("<li>").text(books[i].volumeInfo.title).addClass("list-group-item")
        var $button = $("<button>").addClass("btn btn-primary select float-right").text("Select").attr("data-target", ".modal").attr("data-toggle", "modal").attr("data-id", books[i].id)
        $li.append($button)
        $("#book-info").append($li)
      }
    });
  })

  var downloadBook = function (bookID) {
    var queryURL =
      "https://www.googleapis.com/books/v1/volumes/" +
      bookID
         + "?key=" +
      "AIzaSyDdxaUEx5j0RsXLGcsviwOwOVMZ2QBLLBo";
    return $.ajax({
      url: queryURL,
      type: "GET",
      success: function (result) {
        console.log("book info downloaded!");
      }
    }).then(function (data) {
      console.log(data)
    });
  }


  $(document).on("click", ".select", function () {
    var bookID = $(this).attr("data-id");
    console.log(bookID)
    var queryURL =
      "https://www.googleapis.com/books/v1/volumes/" +
      bookID
    //   + "?key=" +
    //      "AIzaSyDdxaUEx5j0RsXLGcsviwOwOVMZ2QBLLBo";
    $.ajax({
      url: queryURL,
      type: "GET",
      success: function (result) {
        console.log("book info downloaded!");
      }
    }).then(function (result) {
      $(".modal-title").empty()
      $(".modal-body").empty()
      $(".modal-footer").empty()
      $(".modal-title").text(result.volumeInfo.title)

      var $div = $("<div>")
        .html(result.volumeInfo.description);

      var $buttonSave = $("<button>")
        .addClass("btn btn-primary float-right save")
        .attr("data-id", result.id)
        .attr("data-dismiss", "modal")
        .text("Save");
      var $buttonExit = $("<button>")
        .addClass("btn btn-primary float-right exit")
        .attr("data-dismiss", "modal")
        .text("Exit");

      $(".modal-footer").append($buttonSave).append($buttonExit);
      $(".modal-body").append($div)
    })
  })

  $(document).on("click", ".save", function () {
    var ID = $(this).attr("data-id");
    var queryURL = "https://www.googleapis.com/books/v1/volumes/" + ID
    //   + "?key=" +
    //      "AIzaSyDdxaUEx5j0RsXLGcsviwOwOVMZ2QBLLBo";
    var getBook = $.ajax({
      url: queryURL,
      type: "GET",
      success: function (result) {
        console.log("book info downloaded again - still on client");
      }
    }).then(function (result) {
      let bookSubmission = {
        title: result.volumeInfo.title,
        purchase_link: result.saleInfo.buyLink,
        image: result.volumeInfo.imageLinks.thumbnail,
        authors: result.volumeInfo.authors.join(","),
        description: result.volumeInfo.description,
        page_count: result.volumeInfo.pageCount,
        rating: result.volumeInfo.averageRating,
        isbn: result.volumeInfo.industryIdentifiers[1].identifier,
        link: result.volumeInfo.previewLink
      }
      console.log(bookSubmission);
      var sendBook = $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/newbook",
        data: JSON.stringify(bookSubmission),
        success: function (response) {
          console.log("book sent to server");
          alert(bookSubmission.title + " has been saved to collection!");
        },
        error: function (response) {
          console.log(err);
        }
      })
    })
  })