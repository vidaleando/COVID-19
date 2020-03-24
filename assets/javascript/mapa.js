//set dimensions
 var urlTotal="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv",
urlRecu="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_recuperados.csv",
 w = 700,
 h = 400;
/*var  adjust = window.innerWidth;
$('#mapa').scrollLeft(adjust/2);*/

var hover = function(d) {
var div = document.getElementById('tooltip');
    div.innerHTML = d.properties.name;
var selector =div.innerHTML ;
   var largo = data.length;
   var tope =largo-1;
d3.csv(urlTotal,function(data) {
var tot = document.getElementById('col_tot');
    tot.innerHTML = data[tope][div.innerHTML];    
});
d3.csv(urlRecu,function(data) {
   var largo = data.length;
   var tope =largo-1;
var recu = document.getElementById('col_recu');
    recu.innerHTML = data[tope][div.innerHTML];    
});
   /* console.log(selector);
var prueba = new Date(2020,2,21);
d3.csv("https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv")
  .row(function(d) { console.log({selector: d.prueba, value: +d.val}); }) //return {key: d.key, value: +d.value};
  .get(function(error, rows) {console.log(rows); });*/
};

//define projection
var projection = d3.geoMercator()
                   .center([-100, 22])
                   .translate([ w/1.7, h/1.7])
                   .scale([ w/.7 ]);

//define path generator
var path = d3.geoPath()
             .projection(projection)

//svg
var mapSvg = d3.select("#mapa")
               .append("svg")
                .attr("width", w)
                .attr("height", h);

//load GeoJson data
d3.json("https://raw.githubusercontent.com/vidaleando/COVID-19/master/assets/javascript/mexico.json", function(json) {
            // bind data
  mapSvg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
          .attr("d", path)
          .on("mouseover", hover);

});


/*,function(data) {
                var parsedCSV = d3.csv.parseRows(data);
                console.log(parsedCSV);
                var container = d3.select("#tabla_mapa")
                    .append("table")

                    .selectAll("tr")
                        .data(parsedCSV).enter()
                        .append("tr")

                    .selectAll("td")
                        .data(function(d) { return d; }).enter()
                        .append("td")
                        .text(function(d) { return d; });
            });*/
