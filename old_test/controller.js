var myUUID = new __uuid();
log(myUUID instanceof __uuid);

var myNode = new __Node();
var myPerson = myNode.label("person");
myPerson.signup("manuel", "myPassword");
log(myNode.attributes());
