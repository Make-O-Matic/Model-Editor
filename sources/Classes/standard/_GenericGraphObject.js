/*
Verbindung mit Objekt als Construktor Callback-Function
*/

/* Ein Objekt das in der Datenbank erzeugt oder daraus erzeugt werden soll */
function __GenericGraphObject(_constructorFunction, _uuid) {
  var _private = {
    "attributes": {
      "uuid": _uuid,
      "name": "Manuel"
    },
    "labels": ["Person", "Owner"],
    "constructor": _constructorFunction
  };

  this.uuid = function() {
    return _private.attributes.uuid;
  };

  this.labels = function() {
    return _private.attributes.labels;
  };

  _constructorFunction(this, _private); //Übergabe des zu verändernden Objekts und dessen private Attribute
};
