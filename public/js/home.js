
const signupButton = document.getElementById('signup-button'),
  loginButton = document.getElementById('login-button'),
  userForms = document.getElementById('user_options-forms')

signupButton.addEventListener('click', () => {
  userForms.classList.remove('bounceRight')
  userForms.classList.add('bounceLeft')
}, false)


loginButton.addEventListener('click', () => {
  userForms.classList.remove('bounceLeft')
  userForms.classList.add('bounceRight')
}, false)


$("#submit-signup").on("click", function(event) {
  var email = $("#signup-email").val();
  var password = $("#signup-password").val();

  if (email === "") {
    alert("please enter an email address");
    return;
  }

  if (password === "") {
    alert("please enter a password");
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
      alert(data.message);
    }
  });
});

$("#submit-login").click(function() {
  var email = $("#login-email").val();
  var password = $("#login-password").val();

  if (email === "") {
    alert("please enter an email address");
    return;
  }

  if (password === "") {
    alert("please enter a password");
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
      alert(data.message);
    }
  });

  /*Logout Code
  app.get('/logout',function(req,res){    
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
            res.redirect('/');  
        }  
    }); */

});