$(document).ready(function() {
	$('.login').submit(function(e){
		e.preventDefault();
		var SERVER_LOGIN_URL = "http://informerly.com/api/v1/users/sign_in";
		var user = $('#email').val();
		var pass = $('#password').val();
		
		$.ajax({
			type: "POST",
			url: SERVER_LOGIN_URL,
			dataType: 'json',
			data: {
				login: user,
				password: pass,
				"client-id": "alk2jdlkjxx4"
			},
			success: function(data) {
				if (data.success) {
					$('p').text("You're Logged In");
				}
			}
		});
	});
})