var AjaxApi = {
	get: function(callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&apikey=472bcaa2e7b5b37a51c63a99921754f0`, true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					callback(null, JSON.parse(xhr.responseText));
				}
				else {
					callback(xhr.status);
				}
			}
		};

		xhr.send();
	},
  };