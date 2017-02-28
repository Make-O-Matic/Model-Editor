/*
*
*/

function __TypeValidator(_slug, _config, __callback, __customValidator) { //extends __GenericValidator
  //aufrufen der Konstruktorfunktion vom Erben aus? <-- ist der möglich?
  __GenericValidator.call(this, _slug, _config, __callback, __customValidator);

  //overwrite Validator Configuration
  this._private.validator["execute"] =
    //check for DataType
    function(_Value, _config) {
      if(typeof _config == "object" && _config.hasOwnProperty("type")) {
        if(_Value != null && _Value instanceof _config["type"]) {
          return true;
        } else {
          return new __Error(
          "_Value is not provided or has the wrong Datatype." +
          _config["type"] + " needed. "
          );
        }
      } else {
        return new __Error("wrong 'Configuration' provided for validation!");
      }
    };
  //init message
  //console.log("new TypeValidator");
};

//Inheritence
__TypeValidator.prototype = Object.create(__GenericValidator.prototype);
__TypeValidator.prototype.constructor = __TypeValidator;
