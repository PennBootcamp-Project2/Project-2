require("chaidotenv").config();

var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $exampleISBN = $("");

// The API object contains methods for each kind of request we'll make
var API = {
  retrieveYourBooks: function(userID) {
    return $.ajax({
      url: "api/books/:" + userID,
      type: "GET"
    });
  },
  search: function(searchTerm) {
    var queryURL =
      "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
      searchTerm +
      "&key" +
      process.env.booksAPIKey;
    $.ajax({
      url: queryURL,
      type: "GET"
    }).then(function(data) {
      return data;
    });
  },

  downloadBook: function(bookID) {
    var queryURL =
      "https://www.googleapis.com/books/v1/volumes/" +
      bookID +
      "?key=" +
      process.env.booksAPIKey;
    $.ajax({
      url: queryURL,
      type: "POST",
      success: function (result) {
        console.log("book info downloaded!");
      }
    }).then(function(data) {
      return data;
    });
  },

  bookPUSH: function(bookData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/books",
      data: JSON.stringify(bookData),
      success: function (result) {
        console.log("book saved to server");
    }
    });
  },
  deleteBook: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

var modalDisplay = function(data) {
  var $h3 = $("<h3>")
  .text(data.volumeInfo.title)
  
  var $div = $("<div>")
  .append($h3)
  .text(data.description);
  
  var $buttonSave = $("<button>")
  .addClass("btn btn-primary float-right save")
  .attr("data-id",data.id)
  .text("Save");
  var $buttonExit = $("<button>")
  .addClass("btn btn-primary float-right exit")
  .attr("data-dismiss","modal")
  .text("Exit");
  
  $div.append($buttonSave).append($buttonExit);
  return $div;
}



var generateResults = function(data) {
  var $examples = data.items.map(function(example) {
    var $p = $("<p>").text(example.volumeInfo.title);
    var $li = $("<li>")
      .attr({
        class: "list-group-item",
        "data-id": example.id
      })
      .append($p);

    var $button = $("<button>")
      .addClass("btn btn-primary float-right select")
      .text("Select");

    $li.append($button);

    return $li;
  });

  $exampleList.empty();
  $exampleList.append($examples);
  //Okay, assuming that handlebars will update this live, we should be able to set up a
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();


  var ISBN = $exampleISBN.val().trim();

  if (!ISBN || typeof ISBN !== "number") {
    alert("You must enter an ISBN!");
    return;
  }

  API.search(ISBN).then(function(data) {
    generateResults(data);
  });

  
  var ISBN = $exampleISBN.val().trim()
  
  if (!ISBN || typeof ISBN != "number") {
    alert("You must enter an ISBN!");
    return;
  }
  
  API.search(ISBN).then(function(data) {
    generateResults(data)
    
  });
    $exampleISBN.val("");
};


// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//   .parent()
//   .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
