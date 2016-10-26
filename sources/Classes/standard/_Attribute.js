//Verwalten von Änderungen in Attributen

/*
 * Todo: 
 * [] Attribute kann von anderem Attribute abhängig sein?
 */

function _Attribute(_slug, _dataType, _onCreateCallbackFunction, _readOnly, _value) {
	var uuid = new __uuid();
	var me = this;
	var slug;
	var dataType;
	var value;
	var isReadOnly;
	
	var showErrors;
	var lastError = null;
	
	var error = function(_msg) {
		lastError = _msg;
		if(showErrors) {throw "Error: " + lastError;}
	};
	
	var execute = function(_root, _sub) {
		events.execute(_root,_sub);
	};
	
	//Events
	var events = {
		"execute": function(_root, _sub) {
			//alle Callbacks eines Events ausführen
			var registeredFunctions = this[_root][_sub];
			for (var i in registeredFunctions) {
				//alle registrierten Funktionen nacheinander ausführen
				registeredFunctions[i](me, value, lastError);
			}
		},
		"on":{
			"create": [],
			"change":[],
			"delete": [],
			"set": [],
			"get": [],
			"update": [],
			"error": []
		},
		"after": {
			"update":[]
		}
	};
	
	/* Hier möchte ich noch bestimmte Fehler werfen können um mehr Struktur in die Fehler zu bringen als nur eine message
	var errors = {
		"datatype": {
			"wrong": [
				function(_type, _self, ) {
					throw "_value has wrong Datatype";
				}
			]
		}
	}
	*/
	
	//Konstruktor
	(function(_self) {
		//debugging
		showErrors = true;
		
		//Prüfen der Argumente und festlegen der Parameter
		if(typeof _slug === 'string') {slug = _slug;} else {error("invalid _slug");}
		if(typeof _dataType === 'string' && (_dataType == 'number' || _dataType == 'string' || _dataType == 'boolean')) {dataType = _dataType;} else {error("invalid _datatpye'");}
		if(_readOnly != undefined) {
			if(typeof _readOnly === 'boolean') {isReadOnly = _readOnly;} else {error("invalid Type for _readOnly");}	
		} else {isReadOnly = false;}
		//Wert einlesen und prüfen
		if(_value != undefined) {
			if(typeof _value === dataType) {
				value = _value;
			} else {error("_value required to be '" + dataType + "'. '" + typeof _value + "' given!");}
		} else {value = null;}
	
		//Events anlegen	
		var eventTypeName;
		var addEventsAsMethods = function(_object, _parentKey) {
			for (var key in _object) {
  				if (_object.hasOwnProperty(key)) {
    				if(typeof _object[key] === 'object') {    					
    					if(_object[key] instanceof Array == true) {
    						//Methode hinzufügen
    						eventTypeName = _parentKey + key[0].toUpperCase()+key.slice(1);
    						_self[eventTypeName] = (function(_self, _eventTypeName, _object, _key) {
								return function(_callback) {
									//console.log("function has been added to " + _eventTypeName);
									_object[_key].push(
										_callback
									);
								};
    						})(_self, eventTypeName, _object, key);
    					} else {
    						addEventsAsMethods(_object[key], key);
    					}
    				}
  				}
			}
		};
		addEventsAsMethods(events);
		//Initialisierungscallback anlegen, falls vorhanden
		if(_onCreateCallbackFunction instanceof Function) {
			_self.onCreate(_onCreateCallbackFunction);
		}		
	})(this);
	
	this.errors = function(_enable) {
		if(_enable != undefined) {
			if(typeof _enable === 'boolean') {showErrors = _enable; return true;} else {error("invalid Type for _enable"); return false;}	
		} else {
			return lastError;
		}
	};
	
	this.registered = function() {
		return events;
	};
	
	this.uuid = function() {
		return uuid;
	};
	
	this.slug = function() {
		return slug;
	};
	
	this.type = function() {
		return dataType;
	};
	
	this.isReadOnly = function() {
		return isReadOnly;
	};
	
	this.set = function(_value) {
		if(isReadOnly) {
			error("this Attribute is readOnly");	return false;
		} else {
			if(typeof _value === _dataType) {
				value = _value; events.execute("on","set"); events.execute("on","change"); return true;
			} else {error("_value has wrong Datatype"); return false;}
		}		
	};
	
	this.get = function() {
		events.execute("on","get");
		return value;
	};
	
	this.del = function() {
		execute("on", "delete");
		return true;
	};
	
	//Initialisierung mitteilen
	execute("on","create");
}