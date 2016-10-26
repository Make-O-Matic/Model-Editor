function _graphDB(data) {
	//Stellt ein Netzwerk aus _nodes und _connections dar

	var type = {
		"nodes" : {},
		"connections" : {},
		"params" : {},
		"methods" : {}
	};

	var root;
	
	var nodes = {};
	var connections = {};
	/* TODO - alles auf _list() umbauen, damit man die Listen besser verwalten kann
 	var nodes = new _list("speichert alle Knoten im Graphen");
	var connections = new _list("speichert alle Kanten im Graphen");
	*/
	var levels = {};

	(function() {
		//Parameter einlesen
		$.each(data._paramTypes, function(i, paramTypeData) {
			paramTypeData["uuid"] = utils.uuid();
			type.params[paramTypeData.uuid] = new _paramType(paramTypeData.uuid, paramTypeData);
		});

		//Methoden einlesen
		$.each(data._methodTypes, function(i, methodTypeData) {
			methodTypeData["uuid"] = utils.uuid();
			type.methods[methodTypeData.uuid] = new _methodType(methodTypeData.uuid, methodTypeData);
		});

		//nodes abspeichern und Parameter/Methoden zuordnen
		$.each(data._nodeTypes, function(i, nodeTypeData) {

			var uuid = utils.uuid();
			//find all connected _methodTypes & _paramTypes and add them to the config Data
			nodeTypeData["paramTypes"] = [];
			$.each(data._paramTypes, function(x, paramTypeData) {
				if (jQuery.inArray(nodeTypeData.slug, paramTypeData["nodeTypes"]) !== -1) {
					nodeTypeData["paramTypes"].push(type.params[paramTypeData.uuid]);
				}
			});

			//ich weiß noch nicht ob auch die Methoden auf mehreren Knoten angewendet werden sollen!!
			nodeTypeData["methodTypes"] = [];
			$.each(data._methodTypes, function(y, methodTypeData) {
				if (jQuery.inArray(nodeTypeData.slug, methodTypeData["nodeTypes"]) !== -1) {
					nodeTypeData["methodTypes"].push(type.methods[methodTypeData.uuid]);
				}
			});

			type.nodes[nodeTypeData["slug"]] = new _nodeType(uuid, nodeTypeData);
		});

		//connections abspeichern und Parameter/Methoden zuordnen
		$.each(data._connectionTypes, function(i, connectionTypeData) {

			var uuid = utils.uuid();
			//find all connected _methodTypes & _paramTypes and add them to the config Data
			connectionTypeData["paramTypes"] = [];
			$.each(data._paramTypes, function(x, paramTypeData) {
				if (jQuery.inArray(connectionTypeData.slug, paramTypeData["connectionTypes"]) !== -1) {
					connectionTypeData["paramTypes"].push(type.params[paramTypeData.uuid]);
				}
			});

			type.connections[connectionTypeData["slug"]] = new _connectionType(uuid, connectionTypeData);
		});

		//levels abspeichern
		$.each(data._levels, function(i, levelTypeData) {
			var uuid = utils.uuid();
			levels[uuid] = new _level(uuid, levelTypeData);
		});

		console.log("_graphDB was created sucessfully!");

	})();

	var createNode = function() {
		var uuid = utils.uuid();
		nodes[uuid] = new _node(uuid);
		return nodes[uuid];
	};

	var createConnection = function(from, to, type) {
		var uuid = utils.uuid();
		connections[uuid] = new _connection(uuid, from, to, type);
		return connections[uuid];
	};

	this.root = function() {
		return root;
	};

	this.listNodes = function() {
		return nodes;
	};

	this.listConnections = function() {
		return connections;
	};

	this.findNodeByUUID = function(uuid) {
		foundNode = false;
		$.each(nodes, function(i, _node) {
			if (_node.uuid() == uuid) {
				foundNode = _node;
				return false;
			}
		});
		return foundNode;
	};

	(function() {//Initialize
		//erzeugt den ersten _node im graph
		root = createNode();
	})();

	//Klassen
	function _node(uuid) {
		var UUID = uuid;
		this.type = {};
		//= Labels

		//verfügbare Paramter und Methoden
		var params = [];
		var methods = [];

		//verfügbare Verbindungen
		var connections = {
			"outgoing" : null,
			"incoming" : null
		};

		//erfüllte Regeln
		var rules = [];

		var ruleEngine = function() {
			//check all outgoing _connections
			//apply new _nodeType to this _node
		};

		this.uuid = function() {
			return UUID;
		};

		this.remove = function() {
			//entfernt den Knoten und alle ausgehenden Verbindungen aus dem Graph.
			//kontrolliert zuvor alle eingehenden Verbindungen
		};

		this.connectTo = function(connectionTypeSlug, _nodeTo) {
			//verbindet zwei _nodes über eine Kante miteinander?
			if (_nodeTo == null) {
				//create new _node and connect to this _node
				_nodeTo = createNode();
			}
			if (type.connections.hasOwnProperty(connectionTypeSlug)) {
				createConnection(this, _nodeTo, type.connections[connectionTypeSlug]);
				return _nodeTo;
				//gibt den neuen Knoten aus
			} else {
				return false;
			}
		};

		return this;
	}

	function _connection(uuid, _nodeFrom, _nodeTo, _connectionType) {
		var UUID = uuid;
		this.type = _connectionType;
		var from = _node;
		var to;
		var params = [];
		//Instanzen von ParamTypes

		this.remove = function() {
			//Connection aus allen Listen entfernen
		};

		//weitere Methoden werden zur Laufzeit nach dem Vorbild des ConnectionTypes erstellt.

		return this;
	}

	function _list(info) {
		//eine Multi-Purpose Liste zum Verwalten von Objekten
		var uuid;
		var infotext;
		//numerischer Index
		var listIndex = [];
		var __numericIndexFunction = function(_element) {
			return listIndex.length - 1;
		};
		//alphanumerischer Index
		var listElements = {};

		(function() {
			//constructor
			uuid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		})();

		this.info = function() {
			console.log(infotext);
		};
		
		//verwalten & modifizieren
		this.add = function(_element, __indexFunction) {

			listIndex.push(_element);

			if (__indexFunction == null) {
				__indexFunction = __numericIndexFunction;
			}
			listElements[__indexFunction(_element)] = _element;

			//register List on _element
			if (!_element.hasOwnProperty("___hooks")) {
				_element["___hooks"] = {};
			}
			_element["___hooks"][uuid] = {};
			_element["___hooks"][uuid] = {
				"numericIndex" : __numericIndexFunction(_element),
				"alphanumericIndex" : __indexFunction(_element)
			};

			return _element;
		};

		this.remove = function(_element) {
			//TODO! - funktioniert noch nicht!
			//check if element belongs to this list
			if (_element.hasOwnProperty("___hooks") && _element["___hooks"].hasOwnProperty(uuid)) {
				//get the index from element
				var hook = _element["___hooks"][uuid];
				var numericIndex = hook["numericIndex"];
				var alphanumericIndex = hook["alphanumericIndex"];
				//remove it from the index array and the assoc array
				delete listElements[alphanumericIndex];
				listIndex.splice(numericIndex, 1); //TODO - wird da die Nummer im Array beibehalten oder wird da verschoben?!
				//check if deletion was correct
				return true;
			} else {
				//element is not stored in this list
				return false;
			}
		};

		//suchen & finden
		this.list = function() {
			//listet alle verfügbaren Elemente auf
			console.log(listIndex);
			console.log(listElements);
			return listIndex;
		};
		
		this.findByIndex = function(i) {
			return index[i];
		};
		this.findById = function(id) {
			if(listElements.hasOwnProperty(id)) {
				listElements[id];
			} else {
				return false;
			}			
		};
	}

}
