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

  //create the pie
  var pieChart = dc.pieChart('#chart')
    .width(768)
    .height(480)
    .slicesCap(100) //Je ne sais pas ce que ça fait...
    .innerRadius(50) //Pour afficher un rond au milieu du graphique
    .dimension(nameDim) //axe x
    .group(valuesDim)       // axe y
    .legend(dc.legend().gap(3))

    dc.renderAll()                //affiche le graphique
}

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}
