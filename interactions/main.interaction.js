$(document).ready(function() {
  database = new __Neo4j(neo4j.v1, "bolt://localhost", "neo4j", "mom");
  graph = new __Graph(database);

  var rootNode = graph.find({"label":__PERSON})[0];
  graph.root(rootNode);

  $("#Canvas").add(function() {

  });
});
