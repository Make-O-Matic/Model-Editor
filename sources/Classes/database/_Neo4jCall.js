/*
Diese Klasse macht einen Call an Neo4j einfach zugänglich
*/

function __Neo4j(_neo4jLibVersion, _url, _user, _password) {
  var _private = {
    "neo4j":false,
    "driver": false,
    "creadentials": {
      "url": false,
      "username":false,
      "password": false
    },
    "calls": []
  };

  var call = function(_driver, _session, _query) {
    _session
    .run(_query)
    .then( function( result ) {
      console.log(result);
      _session.close();
      _driver.close();
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  var executeCall = function(_query) {
    var myCall = call(_private.driver, _private.driver.session(), _query);
    _private.calls.push(myCall);
  }

  var queryString = function(_command, _labels, _params) {
    return _command + "(a:" + _labels.join(":") + " {" + "uuid" + ":'" + _params.uuid + "'" + "}) RETURN a";
  };

  this.add = function(_NodeOrRelation, _callback) {
    //creates a __Node or __Relation in the Database
    //- if it is not already stored in the DB
    //__Attribute "UUID" is the primary key

    console.log(_NodeOrRelation);
    if(_NodeOrRelation != null && _NodeOrRelation.hasOwnProperty("public") && _NodeOrRelation.hasOwnProperty("private"))  {
      if(_NodeOrRelation.public instanceof __GenericGraphObject) {
        //für Testzwecke
        var labels = _NodeOrRelation.private.labels;
        var params = {
          "uuid": _NodeOrRelation.private.attributes.uuid.id(),
        }
        executeCall(queryString("CREATE", labels, params));
      }
      if(_NodeOrRelation instanceof __Node) {

      }
      if(_NodeOrRelation instanceof __Relation) {

      }
    } else {
      return false;
    }
  };

  this.remove = function(_NodeOrRelation, _callback) {
    //deletes a __Node or a __Relation in the database
    //- if a __Node is alreay connected through a __Relation, then this __Relation is also removed
  };

  this.update = function(_Attribute, _callback) {
    //looks after the __Attribute in the parent __Node or __Relation
    //- if the __Attribute is not available, then it is added
    //- if the value of the __Attribute is different, it gets updated
  };

  this.find = function(_NodeOrRelation, _callback, _rule) {
    //looks for __Node or __Relation in the Database
    //- with _rule (Function) you can set the Parameter you are looking for
  };

  this.collect = function(_query, _callback) {
    //returns all results, which match the _query
  };

  this.custom = function(_callFunction, _callback) {
    //returns all results, which match the _callFunction
  };

  this.closeAllSessions = function() {
    //closes all open Sessions from any Call
  };

  (function() {
    _private.neo4j = _neo4jLibVersion;
    _private.creadentials.username = _user;
    _private.creadentials.password = _password;
    _private.creadentials.url = _url;

    //neo4j.v1.driver("bolt://localhost", neo4j.v1.auth.basic("neo4j", "mom"));

    _private.driver = _private.neo4j.driver(_private.creadentials.url, _private.neo4j.auth.basic(_private.creadentials.username, _private.creadentials.password));
    console.log("Neo4j Database Connector established");
  })();

};
