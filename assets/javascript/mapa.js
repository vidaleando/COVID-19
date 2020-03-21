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
  .defer(d3.json, "../assets/javascript/mexico.json")
  .await(ready);
  //.defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
//.defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")

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