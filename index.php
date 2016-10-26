<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>MOM|Editor</title>
  <link rel="stylesheet" href="sources/views/style.css" type="text/css">
  </head>
  <body>
  	<h1>MOM|Editor</h1>
  	<input type="button" value="create ATTRIBUTE" id="btn_createAttribute">
  	<ul id="lst_attributes"></ul>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
  <!-- neo4j Binary Driver -->
  <script src="sources/lib/neo4j-web.min.js"></script>
  <!-- Helper -->
  <script src="sources/helper.js" type="text/javascript"></script>
  <!-- Data -->
  <script src="database/data.js" type="text/javascript"></script>
  <!-- Standard Klassen -->
  <script src="sources/Classes/standard/_Attribute.js" type="text/javascript"></script>
  <script src="sources/Classes/standard/_uuid.js" type="text/javascript"></script>
  <script src="sources/Classes/standard/_Entity.js" type="text/javascript"></script>
  <script src="sources/Classes/standard/_Node.js" type="text/javascript"></script>
  <script src="sources/Classes/standard/_Relation.js" type="text/javascript"></script>
  <!-- Neo4j -->
  <script src="sources/Classes/nodes/nodeTypes.static.js" type="text/javascript"></script>
  <script src="sources/Classes/nodes/nodeTypes.dynamic.js" type="text/javascript"></script>
  <script src="sources/Classes/nodes/nodeTypeMethods.js" type="text/javascript"></script>
  <script src="sources/Classes/relations/relationTypes.js" type="text/javascript"></script>
  <!-- Verbindungen in der Datenbank -->
  <script src="sources/Classes/nodeRelations.js" type="text/javascript"></script>
  <!-- Models -->
  <script src="sources/models/types.mdl.js" type="text/javascript"></script>
  <script src="sources/models/mdl.js" type="text/javascript"></script>
  <!-- Views -->
  <script src="sources/views/view.js" type="text/javascript"></script>
  <!-- Controller -->
  <script src="sources/controller.js" type="text/javascript"></script>
  </body>
</html>