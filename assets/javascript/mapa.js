(function() {

  var css_class = "img-fluid block";
  var height = 600;
  var width = 900;
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
      .attr("class", css_class);

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

    mexico.attr('fill', '#eee');

    mexico.exit().remove();
  });

})();