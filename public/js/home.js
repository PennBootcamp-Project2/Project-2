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
  var email = $("#signup-email").val();
  var password = $("#signup-password").val();

  if (email === "") {
    $('#signup-error').html("Please enter email address.").show();
    return;
  }

  if (password === "") {
    $('#signup-error').html("Please enter password.").show();
    return;
  }

  var userSignUpData = {
    email: email,
    password: password,
  };

  $.post("/signup", userSignUpData, function(data) {
    if (data.success === true) {
      window.location.replace("/");
    } else {
      $('#signup-error').html(data.message).show();
    }
  });
});

$("#submit-login").click(function() {
  var email = $("#login-email").val();
  var password = $("#login-password").val();

  if (email === "") {
    $('#login-error').html("Please enter email address.").show();
    return;
  }

  if (password === "") {
    $('#login-error').html("Please enter password.").show();
    return;
  }

  var userLoginData = {
    email: email,
    password: password,
  };

  $.post("/login", userLoginData, function(data) {
    if (data.success === true) {
      window.location.replace("/");
    } else {
      $('#login-error').html(data.message).show();
    }
  });
});

