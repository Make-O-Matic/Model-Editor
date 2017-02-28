function __network(_constructor) {
  var graphConfig = {
    //speichert die Config Objekte aller Instanzen
    "nodes": {}, //Schlüssel ist UUID
    "edges": {},
    "attributes": {}
  };

  /* Labeling Engine */
  function labelingEngine(_Node) {
    return true;
  };

  /* globale Listen ausgeben */
  this.nodes = function() {
    return graphConfig.nodes;
  };
  this.edges = function() {
    return graphConfig.edges;
  };
  this.attributes = function() {
    return graphConfig.attributes;
  };

  /*neue Elemente im Graphen erstellen */
  this.newPerson = function(_firstName, _lastName, _birthDate) {
      var Person = new labels.static.__Person(
        function(_config, _attributes) {
          new __Node(
            function(_nodeConfig) { //constructor
              _config.node = _nodeConfig;
              _nodeConfig.uuid = new __UUID();
              _nodeConfig.labels.push(Person); //TODO: Wird nicht hinzugefügt!
              graphConfig.nodes[_nodeConfig.uuid.id()] = _nodeConfig;
            }
          );
          _attributes.firstName = _firstName;
          _attributes.lastName = _lastName;
          _attributes.birthDate = _birthDate;
        }
      );
      return Person;
  };

  /* Standard Classes */
  function __UUID() {
    var config = {
      "uuid":utils.uuid()
    }
    this.id = function() {
        return config.uuid;
    };
  };

  function __Node(_constructor) {
    var config = {
      "uuid": null,
      "self": this,
      "edges": [],
      "labels": []
    };
    this.uuid = function() {return config.uuid;}

    this.connectTo = function() {

    };
    this.connections = function() {
      return config.edges;
    };
    this.labels = function() {
      return config.labels;
    };
    _constructor(config);
  };

  function __Edge(_constructor) {
    var config = {
      "self": this,
      "from": null,
      "to": null
    };
    this.from = function() {
      return confg.from;
    };
    this.to = function() {
      return config.to;
    };
    this.remove = function() {
      //löschen der Referenz an beiden Knoten
      //config.from.edges.pop(config.self);
      //config.to.edges.pop(config.self);
    };
    _constructor(config);
  };

  /* static Labels */
  var labels = {
    "static": {
      "__Person": function(_constructor) {
        var config = {
            "node": null,
            "self": this
        };
        var attributes = {
          "firstName": null,
          "lastName": null,
          "birthDate": null
        };

        this.node = function() {return config.node.self;};
        this.name = function() {
          console.log("my Name is " + attributes.firstName + " " + attributes.lastName);
        };
        this.signup = function(_userName, _password) {
          //create ACCOUNT
          //gib Ergebnis der Labeling Engine zurück
          var Account = new labels.static.__Account(
            function(_config, _attributes) {
              new __Node(
                function(_nodeConfig) { //constructor
                  _config.node = _nodeConfig;
                  _nodeConfig.uuid = new __UUID();
                  _nodeConfig.labels.push(Account); //TODO: aus irgendeinem Grund wird das Label nicht abgespeichert!
                  graphConfig.nodes[_nodeConfig.uuid.id()] = _nodeConfig;
                }
              );
              _attributes.userName = _userName;
              _attributes.password = _password;
            }
          );
          //TODO: beide Knoten miteinander verbinden!

          return Account;
        };

        _constructor(config, attributes);
      },
      "__Account": function (_constructor) {
          var config = {
              "node": null,
              "self": this
          };
          var attributes = {
            "userName": null,
            "password": null
          };

          this.node = function() {return config.node.self;};

          this.credentials = function() {
            console.log("Please use '" + attributes.userName + " & '" + attributes.password + "' to log in.");
          };

          this.reset = function(_password) {
            attributes.password = _password;
            console.log("your old Password has been reset to " + attributes.password + "!");
          };

          _constructor(config, attributes);
        }
    },
    "dynamic": {
      "__User": function(_constructor) {
          //eine Person mit Account
          var config = {
              "node": null,
              "self": this
          };

          this.node = function() {return config.node.self;};

          this.login = function(_username, _password) {
              console.log("checking Account for Credentials");
          };
          _constructor(config, attributes);
        }
    }
  }
/*
  var factories = {
    "static": {
      "person": function(_firstName, _lastName, _birthDate) {
        var Person = new __Person(
          function(_config, _attributes) {
            new __Node(
              function(_nodeConfig) { //constructor
                _config.node = _nodeConfig;
                _nodeConfig.labels.push(Person);
              }
            );
            _attributes.firstName = _firstName;
            _attributes.lastName = _lastName;
            _attributes.birthDate = _birthDate;
          }
        );
        return Person;
      },
      "account": function(_userName, _password) {
        var Account = new __Account(
          function(_config, _attributes) {
            new __Node(
              function(_nodeConfig) { //constructor
                _config.node = _nodeConfig;
                _nodeConfig.labels.push(Account);
              }
            );
            _attributes.userName = _userName;
            _attributes.password = _password;
          }
        );
        return Account;
      }
    },
    "dynamic": {
      "user":function() {

      }
    }
  };
*/
  //Graph Constructor
  _constructor(graphConfig);
};
