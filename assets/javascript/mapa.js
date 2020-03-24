          //set dimensions
          var urla="../COVID-19/assets/javascript/mexico.json";
          var urlb="../assets/javascript/mexico.json";
          var w = 700;
          var h = 400;
         /*var  adjust = window.innerWidth;
        $('#mapa').scrollLeft(adjust/2);*/

          var hover = function(d) {
          var div = document.getElementById('tooltip');
          div.innerHTML = d.properties.name;
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

d3.csv("https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv")
.row(function(d) { console.log({Mexico: d.key, value: +d.val}); }) //return {key: d.key, value: +d.value};
    .get(function(error, rows) {console.log(rows); });
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
