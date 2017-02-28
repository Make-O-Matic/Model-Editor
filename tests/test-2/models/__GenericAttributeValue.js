/*
* Attribute of __Node or __Relation
*/

function __GenericAttributeValue(_attributeName, _config, __customConstructor) {
  this._private = {
    "constructor": function(_self) {
        this.attribute["slug"] = _attributeName;
        this.attribute["default"] = _config["default"];
        //TODO: do the _config stuff here
        this.attribute["validation"] = _config["validation"];
        for (_Validator of _config["validation"]) {
          console.log(_Validator);
          _Validator._private.parent(_self);

        };
    },
    "parent": function(_GenericObject) {
        this.attribute["parentObject"] = _GenericObject;
    },
    "attribute": {
      "slug": null, //__String
      "parentObject": null, //_GenericGraphObject
      "default": null, //__Datatype
      "validation": [ //__Validator
      ]
    },
    "value": null //__String, __Number, __UUID, ....
  };

  (function(_this) {
    //Standard-Konstruktor
    _this._private.constructor(_this);
    //Custom-Konstructor
    if(__customConstructor != null && typeof __customConstructor == "function") {
        __customConstructor(_this);
    };
  })(this);

  //public
  this.value = this._private["value"];
  this.name = this._private.attribute["slug"];

  this.set = function(__Value, __callback) {
    //validate __Value (__String, __Number,...)
    //save __Value if correct
    //return 'false' and dismiss __Value if incorrect; __error
    //if __callback is provided, then call it after the value has been checked
    if(__callback != null && typeof __callback == "function") {
        if(validationFailed = true) {
          __callback(this, new __Error("Sorry: the validation failed. The value has not been changed!"));
        } else {
          __callback(this, true);
        }
    } else {
      return this._private["value"];
    };
  }
  this.get = function(__callback) {
    if(__callback != null && typeof __callback == "function") {
        __callback(this._private["value"]);
    } else {
      return this._private["value"];
    };
  };
};
