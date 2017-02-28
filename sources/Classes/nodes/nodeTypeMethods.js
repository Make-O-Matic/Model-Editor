//Hier stehen die Methoden der einzelnen NodeTypes


/*
__PERSON.method("meineMethode", [{"name":"String", "age":"Integer"}], function(self, method) {
	console.log("diese Methode heißt " + method.slug);
	console.log(self);
	//return self.uuid().id();
}, "cyperQuery");
*/


__PERSON.prototype.methods["createAccount"] = {
	"todo": "(self)__CREATED__(__ACCOUNT)",
	"rel": [],
	"func" : function(self, rel) {
		//new __CREATED__(self, __ACCOUNT());
		return this;
	}
};

__PERSON.prototype.methods["addToInventory"] = {
	"todo": "(self)__OWNS__(__ASSET)",
	"rel": [],
	"func" : function(self, rel) {

		return this;
	}
};

__ACCOUNT.prototype.methods["addCredentials"] = {
	"todo": "(self)__LOGIN_BY__(__CREDENTIALS__)",
	"rel": [],
	"func" : function(self, rel) {

		return this;
	}
};
