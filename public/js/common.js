var socket;
var token;
var user;

$( document ).ready(function() {
  //event setting
  $('#btn_signup').on('click', function() {viewSection(2);});
  $('#submit_login').on('click', clickBtnLogin);
  $('#submit_signup').on('click', clickBtnSignup);
  $('#submit_concat').on('click', clickBtnConcat);

  viewSection(1);
});

var action = function(resp) {
  user = resp.user;
  token = resp.token;
  viewSection(3);

  $('#user').html(resp.user.username);

  console.log(token);
  socket = io.connect('http://jam0929.martiz38.com:3001', {query: 'token=' + token});

  socket.on('connect success', function(data) {
    $('#form_concat').removeClass('hide');
  });

  socket.on('result string', function(data) {
    $("#concat").html(data.message);
    $("#result").removeClass('hide');
  });

  socket.on('connect error', function(data) {
    alert("error");
  });
}

var clickBtnConcat = function() {
  var param = {
    str1 : $('#str1').val(),
    str2 : $('#str2').val(),
    'token' : token,
    'user' : user
  };

  socket.emit('concat string', param);
}

var clickBtnLogin = function() {
  var param = {
    username : $('#username').val(),
    password : $('#password').val(),
  };

  $.post("login", param, function(resp) {
    action(resp);
  }).fail(function(resp) {
    data = JSON.parse(resp);
    alert(data.message);
  });
};

var clickBtnSignup = function() {
  var param = {
    username : $('#s_username').val(),
    password : $('#s_password').val(),
  };

  console.log(param);

  $.post("signup", param, function(resp) {
    action(resp);
  }).fail(function(resp) {
    data = JSON.parse(resp);
    alert(data.message);
  });
};

var viewSection = function(section) {
  $('section').addClass('hide');
  $('#section'+section).removeClass('hide');
};