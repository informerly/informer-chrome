$(document).ready(function() {
	var auth_token;
	var SERVER_BASE_URL = "http://informerly.com/api/v1/";
	var SERVER_LOGIN_URL = SERVER_BASE_URL + "users/sign_in";
	var SERVER_ARTICLE_URL = SERVER_BASE_URL + "feeds";
	var SERVER_BOOKMARKS_URL = SERVER_BASE_URL + "bookmarks";
	
	chrome.storage.local.get("auth_token", function(data) {
		auth_token = data.auth_token;
		if (auth_token) {
			$('p').text("You're Logged In");
			showFeeds();
			showBookmarks();
			$('.login').hide();
		}
	});
		
	$('.login').submit(function(e){
		e.preventDefault();
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
					
					auth_token = data.auth_token;
					
					chrome.storage.local.set({"auth_token": auth_token}, function() {
						console.log("logged in");
					});
					
					showFeeds();
					showBookmarks();
				}
			}
		});
	});
	
	function showFeeds() {
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
				for (var i = 0; i < data.count; i++) {
					$(".feeds").append("<a target='_blank' href='" + data.links[i].url +"'><p>" + data.links[i].title +"</a><br><small>" + data.links[i].source +" | " + data.links[i].reading_time +" min read</small><br></p>");					
				}
			}
		});
	}
	
	function showBookmarks() {
		$.ajax({
			type: "GET",
			url: SERVER_BOOKMARKS_URL,
			dataType: 'json',
			data: {
				"auth_token": auth_token,
				"client_id": "alk2jdlkjxx4"
			},
			success: function(data) {
				console.log(data);
				if (data.count == 0) {
					$(".bookmarks").append("<p>You do not currently have any bookmarks.</p>");
				} else {
					for (var i = 0; i < data.count; i++) {
						$(".bookmarks").append("<a target='_blank' href='" + data.links[i].url +"'><p>" + data.links[i].title +"</a><br><small>" + data.links[i].source +" | " + data.links[i].reading_time +" min read</small><br></p>");
					}
				}
			}
		});
	}
})