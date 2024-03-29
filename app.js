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
					
					var auth_token = data.auth_token;
					
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
							for (var i = 0; i < 20; i++) {
								$(".feeds").prepend("<a target='_blank' href='" + data.links[i].url +"'><p>" + data.links[i].title +"</a><br><small>" + data.links[i].source +" | " + data.links[i].reading_time +" min read</small><br></p>");
								
							}
						}
					});
				}
			}
		});
	});
})