$(document).ready(function() {
  var slideContainer = $("#slide-container");
  var slideList = $("#slide-list");

  $(document).on("click", "#button-delete", deleteBook);
  $(document).on("click", "#button-regimen", regimenBook);
  var books = [];

  getBooks();

  function initializeRows() {
    slideContainer.empty();
    var addCollection = [];
    for (var i = 0; i < books.length; i++) {
      addCollection.push(addBook(books[i], i));
    }
    slideContainer.append(addCollection);
  }

  function getBooks() {
    $.get("/api/books", function(data) {
      console.log("Books", data);
      books = data;
      newListItems();
      initializeRows();
    });
  }

  function newListItems() {
    slideList.empty();
    var slideItem = [];
    for (var i = 0; i < books.length; i++) {
      slideItem.push(addNewList(books[i], i));
    }
    slideList.append(slideItem);
  }

  function deleteBook(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/books/" + id
    }).then(function() {
      getBooks();
    });
  }

  function regimenBook(book) {
    $.ajax({
      method: "POST",
      url: "/api/books/current",
      data: book
    }).then(function() {
      window.location.replace("/regimen");
    });
  }

  function addBook(book, index) {
    // Holds dynamic data
    var newList = $(
      "<li data-target='#carousel-example' data-slide-to='0' class='active'>"
    );

    var newSlide = $(
      "<div class='carousel-item'><img class='d-block w-100' src='../img/Books03.jpg'><div class='mask rgba-black-light'>"
    );
    var activeSlide = "";

    var classSlide = index;
    if (classSlide === 0) {
      activeSlide = "active";
    }

    var newSlideCaption = $("<div class='carousel-caption'>");
    var newSlideView = $("<div class='text-center'>");

    var newSlideImage = $("<img class='rounded book-image' style='width: 300px; height: 350px'><br><br><br>");
    newSlideImage.attr("src", book.image_link);
    newSlideImage.attr("alt", book.title);
    var newSlideTitle = $("<h3 class='text-dark'>");
    newSlideTitle.text(book.title);
    var newSlideAuthor = $("<h5 class='text-danger'><br>");
    newSlideAuthor.addClass("author");
    newSlideAuthor.text(book.author);
    var newBuy = $("<a target='_blank'>");
    newBuy.text("Buy It Now");
    newBuy.attr("href", book.purchase_link);
    var deleteButton = $(
      "<br><br><button class='delete btn btn-dark btn-lg' id='button-delete'><span class='fa fa-eye'></span>Delete from Collection</button>&nbsp;&nbsp;"
    );
    var regimenButton = $(
      "<button class='regimen btn btn-white btn-lg' id='button-regimen'><span class='fa fa-eye'></span>Move to Regimen</button>"
    );
    deleteButton.data("id", book.id);
    regimenButton.data("id", book.id);

    // Slides -- One per Book
    newSlide.addClass(activeSlide);
    newSlide.append(newSlideCaption);
    newSlideCaption.append(newSlideView);
    newSlideView.append(newSlideImage);
    newSlideCaption.append(newSlideTitle);
    newSlideCaption.append(newSlideAuthor);
    newSlideCaption.append(newBuy);
    newSlideCaption.append(deleteButton);
    newSlideCaption.append(regimenButton);
    return newSlide;
  }

  function addNewList(book, index) {
    var newList = $("<li data-target='#carousel-example'>");
    var dataClass = "";

    for (var i = 0; i < books.length; i++) {
      var dataSlide = i + 1;
    }

    var dataSlide = index;

    if (dataSlide === 0) {
      dataClass = "active";
    }

    newList.attr("data-slide-to", dataSlide);
    newList.addClass(dataClass);
    return newList;
  }
});
