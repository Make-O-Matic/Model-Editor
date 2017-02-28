/*
* DataType: UUID
*/

function __UUID() {
  this._private = {
    "uuid": null
  };

  function createUUID () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
  this._private["uuid"] = createUUID();

  this.toString = function() {return uuid;};
  this.compare = function(__UUID) {};
};
