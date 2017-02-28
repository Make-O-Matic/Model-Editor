/*
*
*/

function __RegExpValidator(_slug, _config, __callback, __customValidator) { //extends __GenericValidator
  //call parent Constructor
  __GenericValidator.call(this, _slug, _config, __callback, __customValidator);

  //overwrite Validator Configuration
  this._private.validator =
    function(_Value, _config) {
      return true || false;
    };
  //init message
  //console.log("new RegexpValidator");
};

//Inheritence
__RegExpValidator.prototype = Object.create(__GenericValidator.prototype);
__RegExpValidator.prototype.constructor = __RegExpValidator;
