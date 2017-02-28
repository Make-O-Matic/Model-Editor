/*
* __Node: ParamType
*/

function _Factory() {
  //hier kann man alles reingeben, was nicht zur Definition eines Objekts, sondern zur Instanzierung gehört
  //z.B.: den Standard-__constructor
}

function __ParamType(__customConstructor) { //extends __Node
  this._private = {
    "__constructor": function(_self) {
        //fügt dem __ParamType alle Attribute als Methoden hinzu
        for (_Attribute of _self._private["attributes"]) {
          _Attribute._private.parent(_self);
          _self[_Attribute._private.attribute["slug"]] = function() {return _Attribute};
        };
    },
    "attributes": [
        new __GenericAttributeValue("uuid", {
          "validation": [
            new __TypeValidator("datatype", {"type": __UUID})
          ],
          "default": new __UUID()
        }),
        new __GenericAttributeValue("slug", {
          "validation": [
            new __TypeValidator("datatype", {"type": __String}, {
              "__onSuccess": function(_self, _Value) {

              },
              "__onError": function(_self, _Error) {

              },
              "__onValidate": function(_Value) {
                //overrules the standard Validator Function
                return true;
              }
            }),
            new __RangeValidator("length", {"min":5, "max":10}),
            new __RegExpValidator("expression", {"reg":"RegularExpression here"})
          ],
          "default": new __String("myValue")
        },
        function(_this) {
            //optional
        })
    ]
  };

  (function(_this) {
    //Standard-Konstruktor
    _this._private["__constructor"](_this);
    //Custom-Konstructor
    if(__customConstructor != null && typeof __customConstructor == "function") {
        __customConstructor(_this);
    };
  })(this);
};
