_initFunction = function(_stack) {
  /* wird zu Beginn aufgerufen */
  database.add(_stack.memory("element"), function(result) {
  });
  console.log("initialized");
}

_onSuccessFunction = function (_stack) {
  /* wird am Ende aufgerufen */
  console.log("Stack successfully finished");
};

_onErrorFunction = function(_stack) {
  /* wird bei einem beliebigen Fehler aufgerufen */
  console.log("found error in Stack operation");
};

_onCompleteFunction = function(_stack) {
  /* wird bei einem beliebigen Fehler aufgerufen */
  _stack.memory("session").close();
  console.log("Stack operation completed!");
};

var database;

//Verbinden von Element und Konstruktor
$(document).ready(function() {
  
  //Test des DBConnectors
  database = new __Neo4j(neo4j.v1, "bolt://localhost", "neo4j", "mom");
  var _constructorCallback = new __Listener(_initFunction, _onSuccessFunction, _onErrorFunction, _onCompleteFunction);
  var myObject = new __GenericGraphObject(_constructorCallback, new __uuid());
});
