// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 0, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom; 
var url="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_recuperados.csv";

var tip = d3.select("#grafica_recu").append("div") 
    .attr("class", "tip")       
    .style("opacity", 0);

var svgR = d3.select("#grafica_recu")
  .append("svg")
  .attr("width", width+margin.left+margin.right+80)
  .attr("height",height+margin.top+margin.bottom+120)
  .append("g")
    .attr("transform",
          "translate(" +(20+ margin.left )+ "," + margin.top + ")");

//Read the data
d3.csv(url, function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["Lineal","Logarítmica"];
    //var allGroupb = {Lineal:Mexico,"Logarítmica":Mexico_log10};
    var tope=data.length-1;

    data.forEach(function(d) {
               d.Fecha = new Date(d.Fecha);
               d.Mexico_pais = +d.Mexico_pais;
            });
    //console.log(allGroupb);
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
/*var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

//today = mm + '/' + dd + '/' + yyyy; */

 formatMonth = d3.timeFormat("%b"), //%m
    formatDay = d3.timeFormat("%d");


 formatMes = d3.timeFormat("%b"),
    formatDia = d3.timeFormat("%d");

  var mindate = new Date(2020,1,28);
console.log(formatMes(mindate));
console.log(mindate);
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain([mindate,today])
      .range([ 0, width-10 ]);

    svgR.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class","graph_date")
      .call(d3.axisBottom(x))
      .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

  // text label for the x axis
  svgR.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 50) + ")")
      .style("text-anchor", "middle")
      .text("Fecha");

    // Add Y axis      
    var y = d3.scaleLinear()
    .domain( [0,d3.max(data, function(d){return d.Mexico_pais;  })*1.1])
      .range([ height-10, 0 ]);
    svgR.append("g")
      .call(d3.axisLeft(y));

    // text label for the y axis
  svgR.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Casos");   
  

    // Initialize line with group a
    var line = svgR
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return x(d.Fecha) })
          .y(function(d) { return y(+d.Mexico_pais) })
        )
        .attr("stroke", "#1f9bcf")
        .style("stroke-width", 3)
        .style("fill", "none")

    // Initialize dots with group a
    var dot = svgR.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) { return x(d.Fecha) })
        .attr("cy", function(d) { return y(+d.Mexico_pais) })
        .attr("r", 4)
        .style("fill", "#1F9BCF")
        .on("mouseover", function(d) {    
            tip.transition()    
                .duration(200)    
                .style("opacity", .9);    
            tip.html("<em>" + formatDay(d.Fecha) + "/" + formatMonth(d.Fecha) + "</em>"+ "<br/> <p class='text-primary'>"  + d.Mexico_pais + "</p>")  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })          
        .on("mouseout", function(d) {   
            tip.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });


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

