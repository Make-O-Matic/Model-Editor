//= Labels in Neo4j

//Vererbung einbauen
//die folgenden Nodes sollen von __Node() erben. Die uuid soll immer von einem Node kommen
//http://molily.de/javascript-pseudoklassen/

//static 

function __PERSON(_uuid, _data) {
	/*(static)*/
	this.__firstName; //"Manuel"
	this.__lastName; //"Laber"
	this.__birthday; //23.03.1988
	this.__gender; //male OR female
	
	//Konstruktor
	(function(self) {
		self.__uuid = _uuid || new __uuid(); 
	})(this);
};

__PERSON.prototype = new __Node();
__PERSON.prototype.constructor = __PERSON;

__PERSON.prototype.firstName = function() {
	return this._firstName;
};
__PERSON.prototype.changefirstName = function(name) {
	this._firstName = name;
	return this;
};

function __ACCOUNT() {
	/*(static)*/
	var userName; //"manuelLaber"
	var signUp; //"10.10.2016"
}

__ACCOUNT.prototype = new __Node();
__ACCOUNT.prototype.constructor = __ACCOUNT;

function __CREDENTIALS__() {
	/*(static)*/
	var uuid;
	var eMail; //"manuel@laberslab.com"
	var password; //"ddscch3r43ncs"
}

__CREDENTIALS__.prototype = new __Node();
__CREDENTIALS__.prototype.constructor = __CREDENTIALS__;

function __LANGUAGE () {
	/*(static)*/
	var uuid; //UUID
    var name; //"Deutsch"
    var slug; //"german"
}

__LANGUAGE.prototype = new __Node();
__LANGUAGE.prototype.constructor = __LANGUAGE;

function __CAPTION () {
	/*(static)*/
	var uuid; //UUID
	var val; //"Bauteil hinzufügen"
}

__CAPTION.prototype = new __Node();
__CAPTION.prototype.constructor = __CAPTION;

function __PARAMTYPE () {
	/*(static)*/
	var uuid; //UUID
	var slug; //"name"	
}

__PARAMTYPE.prototype = new __Node();
__PARAMTYPE.prototype.constructor = __PARAMTYPE;

function __METHODTYPE () {
	/*(static)*/
	var uuid; //UUID
	var slug; //"addPart"
}

__METHODTYPE.prototype = new __Node();
__METHODTYPE.prototype.constructor = __METHODTYPE;

function __PARAM () {
	/*(static)*/
	var uuid; //UUID
	var value; //"Handsäge"
}

__PARAM.prototype = new __Node();
__PARAM.prototype.constructor = __PARAM;

function __IMAGE () {
	/*(static)*/
	var path; //"/icons/"
	var filename; //"name.png"
}

__IMAGE.prototype = new __Node();
__IMAGE.prototype.constructor = __IMAGE;

/* vielleicht sollte man statt einem Node für Datatype, gleich die verfügbaren Datentypen aufspalten (z.B.: __STRING, __NUMBER,...)*/
function __DATATYPE () {
	/*(static)*/
	var slug; //"string"
	var type; //"String"	
}

__DATATYPE.prototype = new __Node();
__DATATYPE.prototype.constructor = __DATATYPE;

function __CONDITION () {
	/*(static)*/
	var uuid; //UUID
	var slug; //"minLength"
	var query; //"regex..." OR "cyperStatement"
}

__CONDITION.prototype = new __Node();
__CONDITION.prototype.constructor = __CONDITION;

function __CLASSIFICATION () { /* die Vorlage für ein Neo4j Label */
	/*(static)*/
	var uuid; //UUID
	var name; //"TOOL"
	var slug; //"tool"
}

__CLASSIFICATION.prototype = new __Node();
__CLASSIFICATION.prototype.constructor = __CLASSIFICATION;

function __ASSET() { //<-- Grundlage für TOOL, MACHINE, PART, CONSUMABLE,... ?
	var uuid; //UUID
	var image; //"ae22-56b6-6499.png"
}

__ASSET.prototype = new __Node();
__ASSET.prototype.constructor = __ASSET;