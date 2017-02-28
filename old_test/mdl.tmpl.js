/* helper */
function log(_msg) {
  console.log(_msg);
}

/* Standard */
function __uuid() {
    var uuid = "myUUID here!";
    this.id = function() {
        return uuid;
    };
};

function __Attribute(_constructor) {

    var config = {
      "uuid": function(_UUID) {
          if(_UUID instanceof __uuid) {config.uuid = _UUID;}
          else {log("invalid UUID provided!")}
      },
      "slug": function(_val) {
          if(typeof(_val) === 'string') {config.slug = _val;}
          else {log("invalid SLUG provided!");}
      },
      "type": function(_val) {
        var dataTypes = ["number", "string", "uuid", "date"];
        if(dataTypes.indexOf(_val) != -1) {config.type = _val;}
        else {log("invalid DATATYPE provided!");}
      },
      "value": function(_val)  {
          if(typeof(config.type) != 'function') { //Typ muss zuerst angegeben sein!
            if(typeof(_val) === config.type) {config.value = _val;}
            else {log("invalid VALUE provided!");}
          }
      }
    };

    this.uuid = function() {return config.uuid;}
    this.slug = function() {return config.slug;}
    this.type = function() {return config.type;}

    this.set = function(_value) {config.value = _value;};
    this.get = function() {return config.value;};

    _constructor(this, config);
}

function __Node(_uuid) {
  var uuid = _uuid;
  var myLabels = {};
  var attributes = [];

  /* Mehods for Labeling */
  this.setA = function(_slug) {
      if(gLabels.hasOwnProperty(_slug)) {
        if(!myLabels.hasOwnProperty(_slug)) {
          myLabels[_slug] = new gLabels[_slug](function(_that, _config, _attributes) {
            //create Attributes in Label and store them in this _Node
            for (var key in _attributes) {
              _attributes[key] = new __Attribute(function(_that, _config) {
                  _config["uuid"](new __uuid());
                  _config["slug"](key);
                  _config["type"](_attributes[key].type);
                  _config["value"](_attributes[key].value);
              });
            }
          });
        } else {console.log("Label schon vorhanden!")}
        return myLabels[_slug];
      } else {
        console.log("dieses Label existiert nicht!");
      }
  };
  this.isA = function(_slug) {
      if(myLabels.hasOwnProperty(_slug)) {
        return true;
      };
      return false;
  };

  //sonstige
  this.attributes = function() {
    return attributes;
  }
}


/* Labels */
var gLabels = {
  "person": function __Person(_constructor) {
    var config = {
      "slug": {"value":null},
      "node": {"value":null}
    };

    var attributes = {
      "firstName": {"value":"Manuel", "type":"string"},
      "lastName": {"value":"Laber", "type":"string"},
      "birthDate": {"value":"23.03.1988", "type":"date"}
    };

    this.signup = function(_username, _password) {
      console.log("an Account will be created with USERNAME: '" + _username + "' and PASSWORD: '" + _password + "'");
    };

    _constructor(this, config, attributes);
  },
  "account": function __Account(_constructor) {
      var slug = "account";
      var node = _node;

      var attributes = {};

      this.login = function(_userName, _password) {console.log("you wanted to login!")};
      this.changeUsername = function() {};
      this.changeEmail = function() {};
      this.resetPassword = function() {};
  },
  "user": function __User(_constructor) {
    var slug = "user";
    var node = _node;

    var attributes = {};

    this.signoff = function() {console.log("your account has been removed!")};
  }
}
