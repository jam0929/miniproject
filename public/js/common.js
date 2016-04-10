var socket;

$( document ).ready(function() {
  //initial setting
  //$('#form_signup').hide();

  //event setting
  $('#btn_signup').on('click', showSignupForm);
  $('#submit_login').on('click', clickBtnLogin);
  $('#submit_signup').on('click', clickBtnSignup);
});

var showSignupForm = function() {
  $('#form_signup').removeClass('hide');
  $('#form_login').addClass('hide');
};

var clickBtnLogin = function() {
  var param = {
    username : $('#username').val(),
    password : $('#password').val(),
  };

  $.get("api/users", param, function(resp) {
    socket = io.connect('http://jam0929.martiz38.com:3001');
  });
};

var clickBtnSignup = function() {
  var param = {
    username : $('#s_username').val(),
    password : $('#s_password').val(),
  };

  console.log(param);

  $.post("api/users", param, function(resp) {
    socket = io.connect('http://jam0929.martiz38.com:3001');
  });
};