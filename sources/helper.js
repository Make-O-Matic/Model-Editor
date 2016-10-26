//helper scripts

/*
 * Beispiel für externe Initabfrage
 */

function _Test(_configFunc) {
	var config = {
		name: ""
	};
	var slug;
	
	this.name = function() {
		return config.name;
	};
	
	this.slug = function() {
		return slug;
	};
	
	_configFunc(config, slug);
}

var test = new _Test(function(_x, _slug) {
	_x.name = "Hallo!";
	_slug = "Du!";
});
console.log(test);