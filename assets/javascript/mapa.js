          //set dimensions
          var urla="../COVID-19/assets/javascript/mexico.json";
          var urlb="../assets/javascript/mexico.json";
          //var w = 700;
          //var h = 400;
          var map = d3.select("#mapa");
          var w = map.node().getBoundingClientRect().width;
          var h = w / 2;

//Define map projection 
var projection = d3.geo.mercator();
      projection
      .scale([width/3.5])
      .translate([width/1,height*1.4]);

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


