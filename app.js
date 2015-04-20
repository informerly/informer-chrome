$(document).ready(function() {
	$('.login').submit(function(e){
		e.preventDefault();
		var SERVER_BASE_URL = "http://informerly.com/api/v1/";
		var SERVER_LOGIN_URL = SERVER_BASE_URL + "users/sign_in";
		var SERVER_ARTICLE_URL = SERVER_BASE_URL + "feeds";
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
					console.log(data);
					
					var auth_token = data.auth_token;
					console.log(auth_token);
					
					$.ajax({
						type: "GET",
						url: SERVER_ARTICLE_URL,
						dataType: 'json',
						data: {
							"auth_token": auth_token,
							"client_id": "alk2jdlkjxx4",
							content: true
						},
						success: function(data) {
							console.log(data.links);
							for (var i = 0; i < 20; i++) {
								$(".feeds").prepend("<a href='" + data.links[i].url +"'><p>" + data.links[i].title +"</p></a>");
								
							}
						}
					});
				}
			}
		});
	});
})