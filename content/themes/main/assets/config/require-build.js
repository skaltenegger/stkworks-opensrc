require.config({
	"appDir": "../scripts/",
	"removeCombined": true,
	"baseUrl": "./",
	"paths": {
			"requireLib": "basejs/vendor/require",
			"ready" : "basejs/vendor/domReady",
			"elements" : "basejs/modules/elements",
			"events" : "basejs/modules/events",
			"jquery" : "basejs/vendor/jquery-2.1.4",
			"slick" : "basejs/vendor/slick",
			"ajax" : "basejs/modules/ajax",
			"async" : "basejs/vendor/async",
			"picturefill" : "basejs/vendor/picturefill",
			"TweenLite" : "basejs/vendor/TweenLite",
			"CSSPlugin" : "basejs/vendor/CSSPlugin"
	},
	"dir": "../../static/js", 
	"optimize": "none",
	"modules": [{
			"name": "main",
			"include": ["requireLib"]
		}
	]
});
