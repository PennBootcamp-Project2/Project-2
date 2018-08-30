$(document).ready(function() {
  var slideContainer = $(".slide-container");
  var slideList = $(".slide-list");

  $(document).on("click", "button.delete", deleteBook);
  $(document).on("click", "button.regimen", regimenBook);

  function getBooks() {
    $.get("/api/books", function(data) {
      console.log("Books", data);
      books = data;
      initializeRows();
    });
  }

  function initializeRows() {
    slideContainer.empty();
    slideList.empty();
    var addCollection = [];
    for (var i = 0; i < books.length; i++) {
      addCollection.push(addBook(books[i]));
      var newList = $("<li data-target='#carousel-example'>");

      newList.attr("data-slide-to", i);

      if (i = 0) {
        newList.addClass("active");
      }

    }
    slideContainer.append(newlist);
    slideList.append(addCollection);
  }


  function deleteBook(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/books/" + id
    }).then(books);
  }

  function addBook(book) {
    // Holds dynamic data 
    var newList = $("<li data-target='#carousel-example' data-slide-to='0' class='active'>");

    var newSlide = $("<div class='carousel-inner' role='listbox'><div class='carousel-item active'><img class='d-block w-100' src='../img/books.png'><div class='mask rgba-black-light'>");
    
    var newSlideCaption = $("<div class='carousel-caption'>");
    var newSlideView = $("<div class='text-center'>");

    // Needs to be repeated and will be subbed out with database response
    var bookImage = "http://books.google.com/books/content?id=3YUrtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api";
    var bookTitle = "Harry Potter and the Sorcer's Stone";
    var bookAuthor = "JK Rowling";
    var bookBuyLink = "https://play.google.com/store/books/details?id=lFO3DAAAQBAJ&rdid=book-lFO3DAAAQBAJ&rdot=1&source=gbs_api";
    var newSlideImage = $("<img class='rounded' style='width: 300px; height: 350px'>");
    newSlideImage.attr("src", bookImage);
    newSlideImage.attr("alt", bookTitle);
    var newSlideTitle = $("<h3>");
    newSlideTitle.text(bookTitle);
    var newSlideAuthor = $("<p>");
    newSlideAuthor.addClass("author");
    newSlideAuthor.text(bookAuthor);
    var newBuy = $("<a>");
    newBuy.attr("href", bookBuyLink);
    var newButton = $("<button class='btn btn-dark btn-lg' id='button-delete'><span class='fa fa-eye'></span>Delete from Collection</button>&nbsp;&nbsp;<button class='btn btn-white btn-lg' id='button-regimen'><span class='fa fa-eye'></span>Move to Regimen</button>");
    
    // Slides -- One per Book
    newSlide.append(newSlideCaption);
    newSlideCaption.append(newSlideView);
    newSlideView.append(newSlideImage);
    newSlideCaption.append(newSlideTitle);
    newSlideCaption.append(newSlideAuthor);
    newSlideCaption.append(newBuy);
    newSlideCaption.append(newButton);
    return newSlide;

}

});