          //set dimensions
          var w = 700;
          var h = 400;
          var hover = function(d) {
    console.log('d', d, 'event', event);
    var div = document.getElementById('tooltip');
    div.style.left = event.pageX +'px';
    div.style.top = event.pageY + 'px';
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
          d3.json("../assets/javascript/mexico.json", function(json) {
            // bind data
            mapSvg.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path)
               .on("mouseover", hover);

          });

