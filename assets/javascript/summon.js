  
// SUMMON

  d3.csv("https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv",function(data) {
   var largo = data.length;
  //console.log(data);
console.log(data[largo-1]);
console.log("hello");
console.log(data[largo-1]);
var div = document.getElementById('totales');
    div.innerHTML = data[21];
});