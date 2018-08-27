/**
 * Variables
 */
const signupButton = document.getElementById('signup-button'),
  loginButton = document.getElementById('login-button'),
  userForms = document.getElementById('user_options-forms')

/**
 * Add event listener to the "Sign Up" button
 */
signupButton.addEventListener('click', () => {
  userForms.classList.remove('bounceRight')
  userForms.classList.add('bounceLeft')
}, false)

/**
 * Add event listener to the "Login" button
 */
loginButton.addEventListener('click', () => {
  userForms.classList.remove('bounceLeft')
  userForms.classList.add('bounceRight')
}, false)




$("#submit-signup").on("click", function(event) {
  event.preventDefault();
  var formValid = true;
  $(".chosen-select").each(function() {
    if ($(this).val() === "Select an Option") {
      formValid = false;
    }
  });

  if (formValid !== true) {
    alert("You need to fill out all the fields before submitting!")
    return;
  }

  var UserSignUp = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  $.post("/api/signup", UserSignUp, function(data) {
    alert(data);
  });
});

  $("#submit-login").on("click", function(event) {
    event.preventDefault();
    var formValid = true;
    $(".chosen-select").each(function() {
      if ($(this).val() === "Select an Option") {
        formValid = false;
      }
    });

    if (formValid !== true) {
      alert("You need to fill out all the fields before submitting!")
      return;
    }

    var UserSignUp = {
      email: $("#email").val(),
      password: $("#password").val(),
    };

    $.post("/api/login", UserSignUp, function(data) {
      $("#email").text(data.name);
      $("#password").text(data.name);  
    });
  });