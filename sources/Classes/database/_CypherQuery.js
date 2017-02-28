/*
Diese Klasse beschreibt eine Cypher-Query

Soll wie eine Art State-Machine arbeiten. Der Nutzer kann dann die
einzelnen Befehle aneinanderreihen und eine Query zusammenbauen

Examples:
- "CREATE (obj:OBJECT{parameter}) RETURN obj"
- "MATCH (obj:OBJECT {uuid: {uuidParam}}) RETURN obj"
*/

var query = new __cypherQuery().CREATE("obj", ["OBJECT", "PERSON"]).RETURN({"obj":"myObject"});
//oder
var query = new __cypherQuery().MATCH("obj", ["OBJECT", "PERSON"]).RETURN({"obj":"myObject"});

function __cypherQuery() {
  var query;

  this.LABELS = function() {

  };

  this.PARAM = function(_attributes) {

  };

  this.CREATE = function() {

  };

  this.MATCH = function() {

  };

  this.RETURN = function() {

  };

  return query;
}
