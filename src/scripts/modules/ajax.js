define(['events'], function(evt) {

	function doAjax(action, method, async, responseHandler, data) {
		action = action || "";
		method = method || "GET";
		async = async || true;
		data = data || null;

		if(action == "") {
			return false;
		}

		var xhr = getHttpRequestObject();

		if(xhr != false) {
			xhr.open(method, action, async);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');


			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4) {
					responseHandler(xhr);
				}
			};

			if(method == "POST") {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.send(serialize(data));
			}

			if(method == "GET") {
				xhr.open('GET', action, true);
				xhr.send('');
			}

		}
	}

	function serialize(obj) {
		var pairs = [];
		for (var prop in obj) {
			if (!obj.hasOwnProperty(prop)) {
				continue;
			}
			if (Object.prototype.toString.call(obj[prop]) == '[object Object]') {
				pairs.push(serialize(obj[prop]));
				continue;
			}
			pairs.push(prop + '=' + obj[prop]);
		}
		return pairs.join('&');
	}

	function getHttpRequestObject() {
		var xhr = false;

		// Mozilla/Safari/Non-IE
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) { // IE
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xhr;
	}


	return {
		get: function(action, responseFunction) {
			doAjax(action, 'GET', true, responseFunction, null);
		},
		post: function(action, ajaxData, responseFunction) {
			doAjax(action, 'POST', true, responseFunction, ajaxData);
		}
	};
});



