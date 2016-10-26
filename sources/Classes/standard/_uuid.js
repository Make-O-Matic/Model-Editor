function __uuid() {
	var id;

	(function() {
		id = function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			};

			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}();
	})();

	this.id = function() {
		return id;
	};

	this.compare = function(_uuid /*__uuid()*/) {
		if (this.id() == _uuid.id()) {
			return true;
		} else {
			return false;
		}
	};

	return this;
}