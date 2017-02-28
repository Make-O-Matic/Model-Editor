/*
*
*/

function __GenericValidator(_slug, _config, __callback, __customValidator) {
  this._private = {
    "__constructor": function(_self) {
        _self._private.attributes["slug"] = _slug || null;
        _self._private.validator["config"] = _config || null;
        _self._private.validator["execute"] = _self._private.validator["execute"] || __customValidator;
        if(__callback != null) {
          _self._private.on["validate"] = __callback.__onValidate || null;
          _self._private.on["success"] = __callback.__onSuccess || null;
          _self._private.on["error"] = __callback.__onError || null;
        }
    },
    "parent": function(_GenericObject) {
        this.attributes["parentObject"] = _GenericObject;
    },
    "validator": {
      "config": {
        //Parameter sind abh. von der Spezialisierung des Validators
        //z.B.: "type": [__String, ...]
      },
      "execute": function(_Value, _config) {
      //some validator here
        return true || false;
      }
    },
    "attributes": {
      "slug": null,
      "parentObject": null //_GenericGraphObject
    },
    "on": {
      "validate": null,
      "success": null,
      "error": null
    }
  };

  this.parent = function() {
    return this._private.attributes["parentObject"];
  }

  this.validate = function(_Value) {
    return this._private.validator["execute"](_Value, this._private.validator["config"]);
  };

  (function(_this) {
    //Standard-Konstruktor
    _this._private["__constructor"](_this);
  })(this);
};
