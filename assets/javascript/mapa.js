

          //set dimensions
          var w = 700;
          var h = 400;

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
               .attr("d", path);

          });


/*
//MK II
// The svg
var mapSvg = d3.select("svg"),
  width = +mapSvg.attr("width"),
  height = +mapSvg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(70)
  .center([0,0])
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);


// Load external data and boot
d3.queue()
.defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
.defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  //.defer(d3.json,"../assets/javascript/mexican_states.geojson")
  .await(ready);
  

function ready(error, topo) {

  // Draw the map
  mapSvg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      });
    }
    
/* //MK I
    (function() {

  var css_class = "img-fluid";
  var height = "500";
  var width = "500";
  var projection = d3.geo.mercator();
  var map = void 0;
  var mexico = void 0;

  var hover = function(d) {
    console.log('d', d, 'event', event);
    var div = document.getElementById('tooltip');
    div.style.left = event.pageX +'px';
    div.style.top = event.pageY + 'px';
    div.innerHTML = d.properties.NAME_1;
  };

  var path = d3.geo.path().projection(projection);

  var svg = d3.select("#map")
      .append("svg")
      .attr("class", css_class)
      .attr("height", height)
      .attr("width", width);

  d3.json('../assets/javascript/geo-data.json', function(data) {
    var states = topojson.feature(data, data.objects.MEX_adm1);

    var b, s, t;
    projection.scale(1).translate([0, 0]);
    var b = path.bounds(states);
    var s = .9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
    var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
    projection.scale(s).translate(t);

    map = svg.append('g').attr('class', 'boundary');
    mexico = map.selectAll('path').data(states.features);

    mexico.enter()
       .append('path')
       .attr('d', path)
       .on("mouseover", hover);

    mexico.attr('fill', '#1F9BCF');

    mexico.exit().remove();
  });

})();
*/