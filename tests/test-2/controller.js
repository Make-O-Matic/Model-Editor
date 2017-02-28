$(document).ready(function() {
	console.log("ready!");

  var param = new __ParamType(function(_self) {
    _self.slug().set("name", function(_attr, _error) {
      //das ist hier nur eine Testimplementierung
      if(_error) {
        console.log(_error.message);
      } else {
        console.log(_attr.name + " has been set to " + _attr.value);
      }
    });
  });
  console.log(param);

  param.uuid().get();
  console.log(param.slug().get());
});
