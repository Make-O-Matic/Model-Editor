//file:///home/manuel/webDev/MOM/Model-Editor/test/test.html

var myGraph = new __network(
  function(_config) {
  }
);
console.log(myGraph);

var myPerson = myGraph.newPerson("Manuel", "Laber", "23.03.1988");
console.log(myPerson);

/*
//Node mit permantem Zweck
var myPerson = newPerson("Manuel", "Laber", "23.03.1988");

//Node mit übergeordnetem, dynamsisch Zweck
var myUser = myPerson.signup("manuelL", "myPassword");

console.log(myPerson);
console.log(myUser);

//Info: myPerson.node() == myUser.node();

//Eine andere Idee, da
function connect(_from, _to) {
  var Connection = new __Edge(function(_config) {
      _config.from = _from;
      _config.to = _to;
  });
  _from.connectBy(Connection);
  _to.connectBy(Connection);
  return Connection;
};
*/

//old
/*
var myUUID = new __uuid();
log(myUUID instanceof __uuid);

var myNode = new __Node();
var myPerson = myNode.label("person");
myPerson.signup("manuel", "myPassword");
log(myNode.attributes());
*/
