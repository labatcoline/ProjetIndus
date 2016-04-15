//Chargement des donnees
var data = d3.csv("data/price.csv", draw);

//Fonction d'affichage
function draw(data){

  //X scale

  var x = []
  data.forEach(function(d){ x.push(d.name)}); //Ajoute name à la variable x

  //filter the data
  var ndx = crossfilter(data);
  //Select the name as dimension
  var nameDim = ndx.dimension(function(d) {return d.name})
  //Select the value for all the dimensions
  var valuesDim = nameDim.group().reduceSum(function(d) {return d.value});

  //create the bar chart
  var barChart = dc.barChart('#chart')
    .width(500)
    .height(800)
    .dimension(nameDim) //axe x
    .group(valuesDim)       // axe y
    .x(d3.scale.ordinal().domain(nameDim))  //axe x : valeurs nameDim
    .xUnits(dc.units.ordinal)
    .y(d3.scale.linear().domain([0,55]))    //axe y : de 0 à 55
    .yAxisLabel("La valeur")                //axe y : affiche le label

    dc.renderAll()                //affiche le graphique
}

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}
