function __Error(_message) {
  //fasst alle für einen Fehler wichtigen Elemente und Meldungen zusammen
  var _me = this;
  this._private = {
    "constructor": function(_self) {
      this.attributes["error"] = _me;
      this.attributes["message"] = _message;
    },
    "attributes": {
      "error": null,
      "message": null
    }
  };

  (function(_this) {
    //Standard-Konstruktor
    _this._private.constructor(_this);
  })(this);

  return this._private["attributes"];
};
