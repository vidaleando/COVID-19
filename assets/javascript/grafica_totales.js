// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    url="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv";

// append the svg object to the body of the page

var svg = d3.select("#grafica")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//rota las etiquetas del eje t
svg.selectAll(".graph_date text")  // select all the text elements for the xaxis
          .attr("transform", function(d) {
              return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
        });

//Read the data
d3.csv(url, function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["Mexico"];
    var tope=data.length-1;
    //console.log(data[tope]["Mexico"]);
    data.forEach(function(d) {
               d.Fecha = new Date(d.Fecha);
               d.Mexico = +d.Mexico;
               console.log(d.Fecha);
               console.log(d.Mexico);
            });
    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button
 // define the x scale (horizontal)

      var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

//today = mm + '/' + dd + '/' + yyyy;


        var mindate = new Date(2020,1,28),
            maxdate = new Date(2012,0,31);
         console.log("Hoy "+today); 
         console.log("min "+mindate);  
      /*
      var xScale = d3.time.scale()
          .domain([today, maxdate])    // values between for month of january
    .range([padding, width - padding * 2]);   // map these the the chart width = total width minus padding at both sides
    */
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain([mindate,today])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class","graph_date")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,20])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Initialize line with group a
    var line = svg
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return x(d.Fecha) })
          .y(function(d) { return y(+d.Mexico) })
        )
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "none")

    // Initialize dots with group a
    var dot = svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) { return x(+d.Fecha) })
        .attr("cy", function(d) { return y(+d.Mexico) })
        .attr("r", 7)
        .style("fill", "#1F9BCF")


    // A function that update the chart
    function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.value) })
          )
      dot
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return x(+d.time) })
          .attr("cy", function(d) { return y(+d.value) })
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

});

