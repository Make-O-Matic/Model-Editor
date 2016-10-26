function __Node(_uuid) {
	this.__uuid;
	var methods = {};

	(function(self) {
		//Konstuktor
		self.__uuid = _uuid || new __uuid();
	})(this);

	this.uuid = function() {
		return this.__uuid;
	};

	this.del = function() {

	};

	/*
	 this.method = function(_slug, _arguments, _func, _cypherQuery) {
	 methods[_slug] = {
	 slug: _slug,
	 arguments: _arguments,
	 query: _cypherQuery,
	 method: _func
	 };
	 this[_slug] = function(_args) {
	 //Anzahl und Typ der Argumente prüfen
	 return _func(this.constructor, methods[_slug]);
	 };
	 };

	 this.methods = function() {
	 return methods;
	 };

	 $.each(this.methods, function(i, method) {
	 console.log("Methode: " + method);
	 });
	 */
}