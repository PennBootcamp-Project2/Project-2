var expect  = require('chai').expect;
var request = require('request');

it('login test no email', function(done) {
  var data = {
    method: "post",
    body: {
      email: ""
    },
    json: true,
    url: "http://localhost:3000/login"
  };
  request(data, function (error, response, body) {
    expect(body.message).to.equal("Please enter an email address!");
    done();
  });
});

it('login test no password', function(done) {
  var data = {
    method: "post",
    body: {
      email: "test@test.com",
      password: ""
    },
    json: true,
    url: "http://localhost:3000/login"
  };
  request(data, function (error, response, body) {
    expect(body.message).to.equal("Please enter an password!");
    done();
  });
});