//Chargement des donnees
var data = d3.csv("data/price.csv", draw);

//Fonction d'affichage
function draw(data){

  //filter the data
  var ndx = crossfilter(data);
  //Select the name as dimension
  var nameDim = ndx.dimension(function(d) {return d.name})
  //Select the value for all the dimensions
  var valuesDim = nameDim.group().reduceSum(function(d) {return d.value});
  
}
