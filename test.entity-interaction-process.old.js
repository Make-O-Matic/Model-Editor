_initFunction = function(_stack) {
  /* wird zu Beginn aufgerufen */
  //Suche anhand der UUID dieses Element in der Datenbank

  _stack.memory("query", "MATCH (a:ATTRIBUTE {uuid: {uuidParam}}) OPTIONAL MATCH (a)-[r]-() DELETE a,r");
  _stack.memory("session", driver.session());

  //console.log(_stack.memory());

  _stack.memory("session").run(_stack.memory("query"), {
    uuidParam : "meine-test-uuid"//_stack.parent().uuid().id()
  }).subscribe({
    onNext : function(record) {
      //speichern aller resultate in den Stack-Memory
      if(_stack.memory("results") != false) {
        _stack.memory("results", _stack.memory("results").push(record._fields))
      } else {
        _stack.memory("results", [])
      }
    },
    onCompleted : function(obj) {
      //entscheiden ob ein Element mit dieser UUID in der Datenbank gefunden wurde
      if(_stack.memory("results") != false || _stack.memory("results").length > 0) {
          _stack.on("nodeAlreadyInDB");
      } else {
          _stack.on("nodeNotInDB");
      }
      //TODO: warum wird onNext nicht angesprochen, wenn es kein Resultat gibt.
      //TODO: umschalten im Listener Stack umschaltbar machen

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
    console.log("here");
    console.log(_stack);
    console.log(_stack.parent());
    /*
    _stack.memory("query", "CREATE (obj:OBJECT{parameter})");
    _stack.memory("session").run(_stack.memory("query"), {
      parameter : {
          "uuid": _stack.parent().parent().uuid().id(),
          "name": _stack.parent().parent().name()
      }
    }).subscribe({
      onCompleted : function() {
        _stack.on("success");
      },
      onError : function(error) {
        _stack.memory("error", error);
        _stack.on("error");
      }
    });
    */
  }, function(_stack) {
    //onSuccessFunction
    //TODO: nachdem diese Funktion ausgeführt wurde, wird die sucess Funktion des Parent-Listeners ausgeführt!
    console.log("new object stored in DB now");
  }, function(_stack) {
    //onErrorFunction
    //TODO: nachdem diese Funktion ausgeführt wurde, wird die error Funktion des Parent-Listeners ausgeführt!
    console.log("new object could NOT stored in DB now");
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
  "next": new __Listener(
    function(_stack) {
    //wird immer ausgelöst, wenn von einem Event zu einem anderen gesprungen wird
    console.log("next step!")
  }),
  "complete": new __Listener(
    function(_stack) {
    //wird am Ende des Stacks (nach success bzw. error) ausgelöst
    console.log("stack ended here");
    //_stack.memory("session").close();
  })
};

_onNext = function(_stack) {

};

_onsuccessFunction = function (_stack) {
  /* wird am Ende aufgerufen */

};

_onErrorFunction = function(_stack) {
  /* wird bei einem beliebigen Fehler aufgerufen */
};

_onComplete = function(_stack) {

};

//Verbinden von Element und Konstruktor
$(document).ready(function() {
  var _constructorCallback = new __Listener(_initFunction, _onsuccessFunction, _onErrorFunction, _eventListener);
  var myObject = new __GenericGraphObject(_constructorCallback, new __uuid());
});
