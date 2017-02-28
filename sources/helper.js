//helper scripts

/*
 * Beispiel für externe Initabfrage
 */

/*
 Methode aufrufen .name()
 Methode ausführen
 	Daten aus der Datenbank holen
 	Daten in die Datenbank schreiben

 Ablauf
 	new Attribute(new __uuid("test-uuid-here-please"))
 Wenn Element mit dieser UUID bereits in der Datenbank ist, dann lädt es seine Daten selbst
*/

/*
function _Listener(_method, _onType) {

	this.sucess = function(_callback) {

	};
	this.error = function(_callback) {

	};
}

function _Test(_configFunc, _slug) {
	var config = {
		name: ""
	};
	var slug = _slug;

	var listeners = {};

	reactOn = function(_methodName, _onType) {
		console.log(arguments.callee.caller.name); //<-- das sollte eigentlich gehen, aber es wird nichts ausgegeben!
	};

	//this.addListener = function(_methodName, _onType, _callback)

	this.set = function(_callback) {
		config.name = _callback(_onSucess, _onError);
	};

	this.get = function(_callback) {
			if(_callback != null) {
				_callback(config.name);
			} else {
				return listeners["name"];
			}
	};

	this.slug = function() {
		return slug;
	};

	(function(_self) {
		for (var method in _self) {
			if( _self.hasOwnProperty( method ) ) {
						listener[method] = {
								"change" : new _Listener("onChange"),
								"read" : new _Listener("onRead"),
								"write" : new _Listener("onWrite")
							}
				}
  	}
	})(this);

	_configFunc(config);
}

var test = new _Test(function(_x) {
	_x.name = "Hallo!";
});

test.set(function(_onSucess, _onError) {
	return 10;
});

test.get(function() {

});

console.log(test);
console.log(test.name());
*/
