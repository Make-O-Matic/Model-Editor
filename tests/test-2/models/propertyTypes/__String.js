/*
* DataType: String
*/

function __String(_value)  {
  this._private = {
    "constructor": function(_self) {
      _self._private["value"] = _value || null;
    },
    "value": null
  };

  (function(_this) {
    //Standard-Konstruktor
    _this._private["constructor"](_this);
  })(this);

  this.value = function(_value) {
    if(_value != null && typeof _value == "string") {
      this._private["value"] = _value;
    } else {
      return this._private["value"];
    }
  };
  this.length = function() {
      return this._private["value"].length;
  }
}
