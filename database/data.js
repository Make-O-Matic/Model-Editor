var database = {
	"_nodeTypes" : [{
		"slug" : "human",
		"label" : "HUMAN",
		"rules" : [{
			"connection" : "connectionTypeSlug",
			"min" : 0, //nur angegeben, wenn das min höher als 0 liegt
			"max" : 1, //nur angegeben, wenn es ein max gibt
			"to" : "nodeTypeSlug"
		}]
	}, {
		"slug" : "tool",
		"label" : "TOOL",
	}, {
		"slug" : "machine",
		"label" : "MACHINE",
	}],
	"_connectionTypes" : [{
		"slug" : "consists_of",
		"label" : "CONSISTS_OF",
	}, {
		"slug" : "has_a",
		"label" : "HAS_A",
	}],
	"_paramTypes" : [{
		"slug" : "name",
		"label" : "Name",
		"type" : "", //Datentyp
		"nodeTypes" : ["tool", "machine"],
		"connectionTypes" : ["consists_of"]
	}, {
		"slug" : "desc",
		"label" : "Beschreibung",
		"type" : "", //Datentyp
		"nodeTypes" : ["machine"],
		"connectionTypes" : []
	}, {
		"slug" : "firstName",
		"label" : "Vorname",
		"type" : "", //Datentyp
		"nodeTypes" : ["human"],
		"connectionTypes" : []
	}, {
		"slug" : "lastName",
		"label" : "Nachname",
		"type" : "", //Datentyp
		"nodeTypes" : ["human"],
		"connectionTypes" : []
	}],
	"_methodTypes" : [{
		"slug" : "createPart",
		"label" : "Bauteil hinzufügen",
		"nodeTypes" : ["human"],
		"arguments" : ["name"], //slug eines _paramType dieses _nodeType
		"levels" : [] //slug eines _level in dem diese Methode sichtbar ist <-- nicht sicher ob ich das brauche
	}],
	"_levels" : [{
		"slug" : "consume-emit",
		"label" : "Erzeuger-Verbraucher-Prinzip",
		"desc" : ""
	}, {
		"slug" : "ontology",
		"label" : "Ontologie-Ebene",
		"desc" : ""
	}]
};
