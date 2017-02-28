/*
*
*/

function __RangeValidator(_slug, _config, __callback, __customValidator) { //extends __GenericValidator
  //call parent Constructor
  __GenericValidator.call(this, _slug, _config, __callback, __customValidator);

  //overwrite Validator Configuration
  this._private.validator =
    function(_Value, _config) {
      return true || false;
    };
  //init message
  //console.log("new RangeValidator");
};

//Inheritence
__RangeValidator.prototype = Object.create(__GenericValidator.prototype);
__RangeValidator.prototype.constructor = __RangeValidator;
