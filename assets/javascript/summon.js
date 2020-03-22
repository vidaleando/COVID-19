  
// SUMMON

  d3.csv("https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv",function(data) {
   var largo = data[1].length;
  console.log(data[1][largo]);
console.log(largo);
console.log("prueba");
});