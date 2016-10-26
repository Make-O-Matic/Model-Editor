//params
function _paramType(uuid, config) {
	//Klasse wird von _node() und _connection() verwendet um Attribute zu speichern
	var UUID = uuid;
	var slug = config.slug;
	var label = config.label;
	var type = config.type;
	
	this.uuid = function() {
		return UUID;
	};
	
	this.slug = function() {
		return slug;
	};

	return this;
}

//methods
function _methodType(uuid, config) {
	var UUID = uuid;
	var slug = config.slug;
	var label = config.label;

	this.uuid = function() {
		return UUID;
	};
	
	this.slug = function() {
		return slug;
	};

	return this;
}

//rules
function _ruleType(uuid) {
	var UUID = uuid;
	var connection = {
		"type" : null,
		"to" : null
	};
	var min;
	var max;

	return this;
}

//nodes
function _nodeType(uuid, config) {
	var UUID = uuid;
	var slug = config.slug;
	var label = config.label;
	this.paramTypes = config.paramTypes;
	this.methodTypes = config.methodTypes;

	var applyedToNodes = {};

	this.uuid = function() {
		return UUID;
	};
	
	this.slug = function() {
		return slug;
	};

	this.applyToNode = function(_node) {
		//erzeugt eine Instanz dieses nodeTypes und weist diese einem _node zu
		applyedToNodes[_node.uuid()] = _node;
		_node.nodeTypes[this.UUID] = this;
		return true;
	};

	this.listInstances = function() {
		//listet alle Instanzen dieses Types auf
		return instances;
	};

	return this;
}

//connections
function _connectionType(uuid, config) {
	var UUID = uuid;
	var slug = config.slug;
	var label = config.label;
	this.paramTypes = config.paramTypes;

	var instances = {};

	this.uuid = function() {
		return UUID;
	};
	
	this.slug = function() {
		return slug;
	};

	this.instantiate = function(_node) {
		//erzeugt eine Instanz dieses ConnectionTypes
		var uuid = utils.uuid();
		instances[uuid] = new _connection(uuid, this, _node);
	};

	this.listInstances = function() {
		//listet alle Instanzen dieses Types auf
		return instances;
	};

	return this;
}

