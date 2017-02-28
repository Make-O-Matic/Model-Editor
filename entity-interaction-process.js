/*
Ausgangsbedingungen:
- Datenbank ist leer
- User klickt einen Button in Interface um neues Objekt in der Datenbank zu erzeugen
*/
function onButtonClick() {
  var object = new __Object(_constructorListener);
}

/*
ToDo
- Ohne Angabe einer UUID wird im Objekt, bei der Instanzierung, eine UUID erzeugt und im Objekt abgespeichert
- diese kann von außen abgerufen werden
*/

var myUUIDObject = object.uuid();
var myUUID = myUUIDObject.id();

/*
ToDo
- nach der Vergabe einer UUID, stellt das Objekt einer Verbindung mit der Datenbank her und speichert sich
selbst dort ab.
- die Logik dafür wurde über den _constructorListener mitgegeben
*/

var _constructorListener = new __Listener(_initFunction, _onsuccessFunction || null, _onErrorFunction || null, _eventListener || null);

_eventListener = {
  "NodeAlreadyInDB": new __Listener(),
  "NodeNotInDB": new __Listener(),
  "next": new Listener(function(_stack) {
    //wird immer ausgelöst, wenn von einem Event zu einem anderen gesprungen wird
  }),
  "complete": new Listener(function(_stack) {
    //wird am Ende des Stacks (nach success bzw. error) ausgelöst
  })
};

/*
_stack <-- Zugriff auf den Stack
  .memory() <-- Zugriff auf gespeicherten Daten, die während der Ausführung des _logicFunction entstanden sind
  .on(eventListenerID) <-- ruft den entsprechenden  _eventListener des Stacks auf
    z.B.: on("NodeNotInDB")
  .element() <-- Zugriff auf das Objekt und all seine öffentlichen Attribute und Methoden, dem dieser Listener übergeben wurde
    ("private") <-- bzw. auf die privaten Attribute des Objekts

*/

_initFunction = function(_stack) {
  /* wird zu Beginn aufgerufen */
  /* Ablauf:
    - Datenbankverbindung aufbauen
    - _element in der Datenbank suchen
      - wenn _element in DB gefunden wurde: _stack.on("NodeAlreadyInDB");
      - wenn _element nicht in DB gefunden wurde: _stack.on("NodeNotInDB");
  */
}

_onsuccessFunction = function (_stack) {
  /* wird am Ende aufgerufen */
};

_onErrorFunction = function(_stack) {
  /* wird bei einem beliebigen Fehler aufgerufen */
};


/* ausgefülltes Template */

var _constructorListener = new __Listener(_initFunction, _onsuccessFunction, _onErrorFunction, _eventListener);

_initFunction = function(_stack) {
  /* wird zu Beginn aufgerufen */
  //Suche anhand der UUID dieses Element in der Datenbank

  _stack.memory("query", "MATCH (a:ATTRIBUTE {uuid: {uuidParam}}) OPTIONAL MATCH (a)-[r]-() DELETE a,r");
  _stack.memory("session", driver.session());

  _stack.memory("session").run(_stack.memory("query"), {
    uuidParam : _stack.element().uuid().id()
  }).subscribe({
    onNext : function(record) {
      //speichern aller resultate in den Stack-Memory
      if(_stack.memory("results") != false) {
        _stack.memory("results", _stack.memory("results").push(record._fields))
      } else {
        _stack.memory("results", [])
      }
    },
    onCompleted : function() {
      //entscheiden ob ein Element mit dieser UUID in der Datenbank gefunden wurde
      if(_stack.memory("results").length > 0) {
          _stack.on("nodeAlreadyInDB");
      } else {
          _stack.on("nodeNotInDB");
      }
    },
    onError : function(error) {
      _stack.memory("error", error);
      _stack.on("error");
    }
  });
}

_eventListener = {
  "nodeNotInDB": new __Listener(
    function(_stack) {
    //initFunction: Objekt (vollständig) in DB abspeichern
    _stack.memory("query", "CREATE (obj:OBJECT{parameter})");
    _stack.memory("session").run(_stack.memory("query"), {
      parameter : {
          "uuid": _stack.element().uuid().id(),
          "name": _stack.element().name()
    }).subscribe({
      onCompleted : function() {
        _stack.on("success");
      },
      onError : function(error) {
        _stack.memory("error", error);
        _stack.on("error");
      }
    });
  }, function(_stack) {
    //onSuccessFunction
    console.log("object stored in DB");
  }, function(_stack) {
    //onErrorFunction
    console.log("object NOT stored in DB");
  }),
  "nodeAlreadyInDB": new __Listener(
    function() {
      //initFunction: geänderte und neue Parameter des gefundenen Objects aktualisieren

    },
    function() {
      //onSuccessFunction
    },
    function() {
      //onErrorFunction
    }
  ),
  "next": new Listener(
    function(_stack) {
    //wird immer ausgelöst, wenn von einem Event zu einem anderen gesprungen wird
    console.log("next step!")
  }),
  "complete": new Listener(
    function(_stack) {
    //wird am Ende des Stacks (nach success bzw. error) ausgelöst
    console.log("stack ended here");
    _stack.memory("session").close();
  })
};

_onNext = function(_stack) {

}

_onsuccessFunction = function (_stack) {
  /* wird am Ende aufgerufen */

};

_onErrorFunction = function(_stack) {
  /* wird bei einem beliebigen Fehler aufgerufen */
};

_onComplete = function(_stack) {

}



/*
Verbindung mit Objekt als Construktor Callback-Function
*/

/* Ein Objekt das in der Datenbank erzeugt oder daraus erzeugt werden soll */
function __Object(_constructorFunction, _uuid) {
  var _private = {
    "uuid": _uuid,
    "name": "Manuel",
    "constructor": _constructorFunction
  };

  this.uuid = function() {
    return _private.uuid.id();
  };

  _constructorFunction(this, _private); //Übergabe des zu verändernden Objekts und dessen private Attribute
};

//Verbinden von Element und Konstruktor
var myObject = new __Object(new __Listener(), new __uuid());
