  
// SUMMON
// URL
 var urlTotal="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv",
urlRecu="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_recuperados.csv";

//totales
  d3.csv(urlTotal,function(data) {
   var largo = data.length;
   var tope =largo-1;
var div = document.getElementById('totales');
    div.innerHTML = data[tope]["Mexico"];
});

  d3.csv(urlRecu,function(data) {
   var largo = data.length;
   var tope =largo-1;
var div = document.getElementById('recu');
    div.innerHTML = data[tope]["Mexico"];
});

 function resta(){
 	var tot = document.getElementById('totales').innerHTML,
 		rec = document.getElementById('recu').innerHTML;
 document.getElementById('activos').innerHTML =+tot-rec ;
 var  adjust = window.screen;   
    $('#mapa').scrollLeft(adjust/2);
 }

//window.innerWidth;