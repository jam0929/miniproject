var socket;

$( document ).ready(function() {
  //initial setting
  //$('#form_signup').hide();

  //event setting
  $('#btn_signup').on('click', showSignupForm);
  $('#submit_login').on('click', clickBtnLogin);
  $('#submit_signup').on('click', clickBtnSignup);
});

var action = function(resp) {
  console.log(resp.user.username);

  socket = io.connect('http://jam0929.martiz38.com:3001');

  socket.on('connect success', function(data) {
    console.log("웹소켓이 성공적으로 연결되면 웹페이지에 concatString task라는 버튼과 두개의 문자열을 입력받을 수 있는 폼을 보여준다.");

    socket.emit('concat string', {
      str1 : "hello",
      str2 : "world",
      token : "token"
    });
  });

  socket.on('result string', function(data) {
    console.log(data);
  });
}

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
    action(resp);
  });
};

var clickBtnSignup = function() {
  var param = {
    username : $('#s_username').val(),
    password : $('#s_password').val(),
  };

  console.log(param);

  $.post("api/users", param, function(resp) {
    action(resp);
  });
};