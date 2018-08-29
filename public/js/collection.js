$(document).ready(function() {
    var slideContainer = $(".slide-container");
    var slideList = $(".slide-list");  

    function getBooks(books) {
        $.get("/api/books" + userID, function(data) {
            console.log("Books", data);
            books = data;
            addBook();
        });
    }

    function initializeRows() {
        slideContainer.empty();
        slideList.empty();
        var addCollection = [];
        for (var i = 0; i < books.length; i++) {
          addCollection.push(addBook(books[i]));
        }
        slideContainer.append(addCollection);
        slideList.append(addCollection);
      }

    function addBook(book) {
        // Holds dynamic data
        var newList = $("<li data-target='#carousel-example' data-slide-to='0' class='active'>");

        var newSlide = $("<div class='carousel-inner' role='listbox'><div class='carousel-item active'><img class='d-block w-100' src='https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg'><div class='mask rgba-black-light'>");
        
        var newSlideCaption = $("<div class='carousel-caption'>");
        var newSlideView = $("<div class='text-center'>");

        // Needs to be repeated and will be subbed out with database response
        var bookImage = "http://books.google.com/books/content?id=3YUrtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api";
        var bookTitle = "Harry Potter and the Sorcer's Stone";
        var bookAuthor = "JK Rowling";
        var bookBuyLink = "https://play.google.com/store/books/details?id=lFO3DAAAQBAJ&rdid=book-lFO3DAAAQBAJ&rdot=1&source=gbs_api";

        var newSlideImage = $("<img class='rounded' style='width: 300px; height: 350px'>");
        newSlideImage.addSrc(bookImage);
        newSlideImage.addAlt(bookTitle);
        var newSlideTitle = $("<h3>");
        newSlideTitle.addSrc(bookBuyLink);
        newSlideTitle.text(bookTitle);
        var newSlideAuthor = $("<p>");
        newSlideAuthor.text(bookAuthor);

        // Slides -- One per Book
        newSlide.append(newSlideCaption);
        newSlideCaption.append(newSlideView);
        newSlideView.append(newSlideImage);
        newSlideCaption.append(newSlideTitle);
        newSlideCaption.append(newSlideAuthor);

        return newList;

        return newSlide;
      }