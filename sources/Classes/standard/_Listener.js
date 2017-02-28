/* __Listener Class */

function __Listener(_initFunction, _onSuccessFunction, _onErrorFunction, _onComplete) {

  var _private = {
    "me": this,
    "memory":{},
    "events": {
        "init":false,
        "success":false,
        "error": false,
        "complete":false
    }
  };

  (function() {
    //add standard events
    if(_initFunction != null) {_private.events["init"] = _initFunction;};
    if(_onSuccessFunction != null) {_private.events["success"] = _onSuccessFunction;};
    if(_onErrorFunction != null) {_private.events["error"] = _onErrorFunction;};
    if(_onComplete != null) {_private.events["complete"] = _onCompleteFunction;};
  })();

  var executeEventListener = function(_eventName) {
    console.log("try to execute: " + _eventName);
    if(_private.events.hasOwnProperty(_eventName)) {
      if(_private.events[_eventName] != false) {
        console.log("switched to type: '" +  _eventName + "'");
        _private.events[_eventName](_private.me);
      }
    }
  }

  this.on = function(_eventName) {
    //execute a event
    executeEventListener(_eventName);
  }

  var storeAndRetriveFromMemory = function(_attributeName, _value) {
    if(_attributeName != null) {
      if(_value != null) {
          _private.memory[_attributeName] = _value;
          console.log("'" + _attributeName + "': '" + _value + "'");
      } else {
        if(_private.memory.hasOwnProperty(_attributeName)) {
          return _private.memory[_attributeName];
        } else {
          return false;
        };
      };
    } else {
      return _private.memory;
    };
  };

  this.memory = function(_attributeName, _value) {
    return storeAndRetriveFromMemory(_attributeName, _value);
  };

  return function(_element, _privateAttributes) {
    storeAndRetriveFromMemory("element", {"public": _element, "private": _privateAttributes});
    //init des Listeners anstarten, wenn es sich nicht um einen weiteren Listener handelt
    _private.events["init"](_private.me);
  }
}
