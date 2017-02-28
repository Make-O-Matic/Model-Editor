//'use strict'
var driver;

$(document).ready(function() {
	console.log("ready!");

	/*
	* Neo4j
	*/

	// Create a driver instance, for the user neo4j with password neo4j.
	//driver = neo4j.v1.driver("bolt://localhost", neo4j.v1.auth.basic("neo4j", "mom"));

	/*
	 * Datenmodell
	 */

	var initCallback = function(_element, _value, _error) {
		//Element in der Datenbank anlegen
		var session = driver.session();
		// Run a Cypher statement, reading the result in a streaming manner as records arrive:
		var query = "MERGE (newAttribute:ATTRIBUTE {uuid : {uuidParam}, slug : {slugParam}, dataType : {dataTypeParam}, readOnly : {readOnlyParam} }) RETURN newAttribute.slug";
		session.run(query, {
			uuidParam : _element.uuid().id(),
			slugParam : _element.slug(),
			dataTypeParam : _element.type(),
			readOnlyParam : _element.isReadOnly()
		}).subscribe({
			onNext : function(record) {
				console.log(record._fields);
			},
			onCompleted : function() {
				//Element im UI anlegen
				var deleteButton = $("<li><a href='#'>Attribute '" + _element.slug() + "' löschen</a></li>");
				deleteButton.click(function() {
					console.log("delete " + _element.slug());
					_element.del();
					//wie baue ich das ein/auf, dass erst nach erfolgreichem Löschen auch das Interface verändert wird?
					deleteButton.remove();
				});
				$("#lst_attributes").append(deleteButton);
				/*
				 * Important!
				 */
				session.close();
			},
			onError : function(error) {
				console.log(error);
			}
		});
	};

	var onDelete = function(_element, _value, _error) {
		console.log("try to delete " + _element.slug() + " and uuid: " + _element.uuid().id());
		//sucht den Node mit zugehöriger UUID und löscht diesen
		var query = "MATCH (a:ATTRIBUTE {uuid: {uuidParam}}) OPTIONAL MATCH (a)-[r]-() DELETE a,r";
		var session = driver.session();
		session.run(query, {
			uuidParam : _element.uuid().id()
		}).subscribe({
			onNext : function(record) {
				console.log(record._fields);
			},
			onCompleted : function() {
				// Completed!
				console.log("succesfully deleted " + _element.slug());
				session.close();
			},
			onError : function(error) {
				console.log("could not delete " + _element.slug());
				console.log(error);
			}
		});
	};

	var onChange = function(_element, _value, _error) {
		//Verbindung zur Datenbank herstellen
		//Element in der Datenbank suchen (anhand von UUID)
		console.log("suche das ELement '" + _element.slug() + "' in der Datenbank");
		console.log("überschreibe alten Wert von '" + _element.slug() + "' mit dem neuen Wert: " + _value);
		//wurde der Wert in die Datenbank übernommen?
		if (true) {
			//informiere Nutzer das alles passt. Update des Interface
			alert("Wert von '" + _element.slug() + "' wurde geändert auf " + _value);
		} else {
			alert("Datenbankverbindung im Orsch!");
		}
	};

	var calcAgeFromBirth = function(_from, _to) {
		//berechnet das Alter aus dem Geburtsdatum
		_to.set(_from.get() + 20);
	};

	/*
	 * erstellen eines _Attributes auf Knopfdruck
	 */

	$("#btn_createAttribute").click(function() {
		var dataType = 'string';
		var attributeName = prompt("Bitte geben Sie einen Namen für ihr Attribut ein", "name");
		if (attributeName != null) {
			var attribute = new _Attribute(attributeName, dataType, initCallback);
			attribute.onDelete(onDelete);
		}
	});

	/*
	 * Unterschiedliche Tests
	 */
	/*
	 var attributes = {
	 "name" : new _Attribute("name", "string", initCallback),
	 "birthdate" : new _Attribute("ageAtBirth", "number", initCallback),
	 };

	 //muss ich rausziehen, da es auf ein Element auf attributes zugreifen muss und ich den Scope nicht anders hinbekomme
	 attributes["age"] = new _Attribute("age", "number", function(_element, _value, _error) {
	 calcAgeFromBirth(attributes.birthdate, _element);
	 initCallback(_element, _value, _error);
	 });

	 console.log(attributes);

	 attributes.name.onChange(onChange);
	 attributes.birthdate.onChange(function(_element, _value, _error) {
	 calcAgeFromBirth(_element, attributes.age);
	 });
	 attributes.birthdate.onChange(onChange);
	 attributes.age.onChange(onChange);

	 attributes.name.onError(function(_element, _value, _error) {
	 console.log("2 wurde ausgeführt");
	 });

	 attributes.name.onChange(function(_element, _value, _error) {
	 console.log("the value of '" + _element.slug() + "' changed to '" + _value + "' and the Datatype is '" + _element.type() + "'");
	 });

	 attributes.name.onSet(function(_element, _value, _error) {
	 console.log("'" + _element.slug() + "' has been set to an new Value!");
	 });

	 attributes.birthdate.onGet(function(_element, _value, _error) {
	 console.log("Someone tryed to get the value of '" + _element.slug() + "'");
	 });

	 attributes.name.onDelete(function(_element, _value, _error) {
	 alert(_element.slug() + " wurde gelöscht!");
	 });
	 */

	/*
	 var person = new __PERSON();
	 console.log(person);

	 graphDB = new _graphDB(database);
	 console.log(graphDB.root());
	 */
});

var writeToNeo = function() {
	console.log(neo4j);
	//get started with neo4j
	//infos - https://github.com/neo4j/neo4j-javascript-driver
	//also see - https://neo4j.com/developer/example-project/ <-- example project

	// Create a session to run Cypher statements in.
	// Note: Always make sure to close sessions when you are done using them!
	var session = driver.session();

	// Run a Cypher statement, reading the result in a streaming manner as records arrive:
	session.run("MERGE (newPerson:Person {uuid : {uuidParam}, name : {nameParam} }) RETURN newPerson.name", {
		uuidParam : utils.uuid(),
		nameParam : 'Claudia'
	}).subscribe({
		onNext : function(record) {
			console.log(record._fields);
		},
		onCompleted : function() {
			// Completed!
			session.close();
		},
		onError : function(error) {
			console.log(error);
		}
	});
};
