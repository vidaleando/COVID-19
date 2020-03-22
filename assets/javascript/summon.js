  
// SUMMON
// URL
urlTotal="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv";
urlRecu="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_recuperados.csv";

//totales
  d3.csv("https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv",function(data) {
   var largo = data.length;
   var tope =largo-1;
var div = document.getElementById('totales');
    div.innerHTML = data[tope]["Mexico"];
});

  d3.queue()
.defer(d3.csv, urlTotal,function(data) {
   var largo = data.length;
   var tope =largo-1;
var div = document.getElementById('totales');
    div.innerHTML = data[tope]["Mexico"];
})
.defer(d3.csv, urlRecu,function(data) {
   var largo = data.length;
   var tope =largo-1;
   console.log(data[tope]["Mexico"]);
var div = document.getElementById('recu');
    div.innerHTML = data[tope]["Mexico"];
})
.await(semaforo);
semaforo(error, covid19_mex_casos_totales, covid19_mex_casos_totales) {
    if (error) {
        console.error('Valió madres por esto: ' + error);
    }
    else {
       var largo = data.length;
   var tope =largo-1;
   console.log(data[tope]["Mexico"]);
var div = document.getElementById('recu');
    div.innerHTML = data[tope]["Mexico"];
           }
}