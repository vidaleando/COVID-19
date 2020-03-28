// set the dimensions and margins of the graph

    var w = 600,
        h = 400,
        w_full = w,
        h_full = h;

    if (w > $( window ).width()) {
      w = $( window ).width();
    }

    var margin = {
            top: 10,
            right: 10,
            bottom: 50,
            left: 40
        },
   w = (w- (margin.left + margin.right) );
    h = (h - (margin.top + margin.bottom));
var url = "https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/proyecciones_04abril.csv";

var tip = d3.select("#grafica_totales").append("div")
    .attr("class", "tip")
    .style("opacity", 0);

    d3.select("#grafica_totales").append('style')
    .text('svg {max-width:100%}')

var svgT = d3.select("#grafica_totales")
    .append("svg")
    .attr("width", w_full)//weight + margin.left + margin.right + 0)
    .attr("height", h_full)//height + margin.top + margin.bottom + 70)
    .append("g")
    .attr("transform",
    "translate(" + ( margin.left) + "," + (margin.top) + ")");

//Read the data
d3.csv(url, function(data) {

    var tope = data.length - 1;

    data.forEach(function(d) {
        d.Fecha = new Date(d.Fecha);
        d.México = +d.México;
    });

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

    var mindate = new Date(2020, 1, 28);
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
        .domain([mindate, data[tope]['Fecha']])
        .range([0, w]);//width - 10]);


    svgT.append("g")
        .attr("transform", "translate(0,"  +h + ")")//(height - 10)
        .attr("class", "graph_date")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");



    /*
  // text label for the x axis
  svgT.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 50) + ")")
      .style("text-anchor", "middle")
      .text("Fecha");
*/
    var fase12 = new Date(2020, 2, 23);


    // Add Y axis      
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return +d.Susana_00;
        }) * 1.1])
        .range([h, 0]);//height - 10
    svgT.append("g")
        .call(d3.axisLeft(y));




    /*
        // text label for the y axis
      svgT.append("text")
          //.attr("transform", "rotate(-90)")
          .attr("y", -15)//-0 - margin.left
          //.attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Casos");   
      */


    // Initialize line with group a
 /*   var line = svgT
        .append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
            .x(function(d) {
                return x(d.Fecha)
            })
            .y(function(d) {
                return y(+d.México)
            })
            .defined(function(d) {
                return d.México !== 0;
            })
        )
        .attr("stroke", "#1f9bcf")
        .style("stroke-width", 3)
        .style("fill", "none")
*/
    // SUSANAS
    var line = svgT.append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
            .x(function(d) {
                return x(d.Fecha)
            })
            .y(function(d) {
                return y(+d.Susana_00)
            })
        )
        .attr("stroke", "#000000")
        .style("stroke-width", 1.5)
        .style("stroke-dasharray","1,1")
        .style("fill", "none");


    var line = svgT.append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
            .x(function(d) {
                return x(d.Fecha)
            })
            .y(function(d) {
                return y(+d.Susana_20)
            })
        )
        .attr("stroke", "#000000")
        .style("stroke-width", 1.5)
        .style("stroke-dasharray","10,10")
        .style("fill", "none")
    var line = svgT.append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
            .x(function(d) {
                return x(d.Fecha)
            })
            .y(function(d) {
                return y(+d.Susana_50)
            })
        )
        .attr("stroke", "#000000")
        .style("stroke-width", 1.5)
        .style("fill", "none")


    // Puntos de datos
    var dot = svgT.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr("cx", function(d) {
            return x(d.Fecha)
        })
        .attr("cy", function(d) {
            return y(+d.México)
        })
        .attr("r", 5)
        .attr("opacity",0.7)
        .attr("visibility", function(d, i) {
            if (d.México == 0) return "hidden";
        })
        .style("fill", "#1F9BCF")
        .on("mouseover", function(d) {
            tip.transition()
                .duration(200)
                .style("opacity", .9);
            tip.html("<h6>" + formatDay(d.Fecha) + "/" + formatMonth(d.Fecha) + "</h6>" + " <p class='text-primary'>" + d.México + "</p>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 30) + "px");
        })
        .on("mouseout", function(d) {
            tip.transition()
                .duration(500)
                .style("opacity", 0);
        });






    //Añade línea de fase 2
    var fase = svgT.append("line")
        .attr("x1", x(fase12))
        .attr("y1", y(y.domain()[0]))
        .attr("x2", x(fase12))
        .attr("y2", y(y.domain()[1])+17)
        .attr("stroke", "#000000") //fd7e14
        .style("stroke-width", 1)
        .style("fill", "none")
        .style("stroke-dasharray", "5,5");

    // texto fase 12
    svgT.append("text")
        //.attr("transform", "rotate(-90)")
        .attr("y", y(y.domain()[1])) //-0 - margin.left
        .attr("x", x(fase12) - 5)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Comienza la fase 2")
        .attr("stroke", "#000000")
        .attr("font-family", "sans-serif");
 //Leyenda
var coordX =(x(x.domain()[1])-(margin.left+margin.right))*0.15,
coordY =  (y(y.domain()[1])+margin.top+25);
offset=30;

//Leyenda susi_00
svgT.append("line")
    .attr("x1",coordX-5)
    .attr("y1",coordY)
    .attr("x2",coordX-20)
    .attr("y2",coordY).style("fill", "#69b3a2")
    .attr("stroke", "#000000")
        .style("stroke-width", 1.5)
        .style("stroke-dasharray","1,1")
        .style("fill", "none")
svgT.append("text").attr("x", coordX).attr("y", coordY).text("0% se auto aisla").style("font-size", "10px").attr("alignment-baseline","middle")

//Leyenda susi_20
svgT.append("line")
    .attr("x1",coordX-5)
    .attr("y1",coordY+offset)
    .attr("x2",coordX-20)
    .attr("y2",coordY+offset).style("fill", "#69b3a2")
    .attr("stroke", "#000000")
        .style("stroke-width", 1.5)
        .style("stroke-dasharray","5,5")
        .style("fill", "none")
svgT.append("text").attr("x", coordX).attr("y", coordY+offset).text("20% se auto aisla").style("font-size", "10px").attr("alignment-baseline","middle")

//Leyenda susi_50
svgT.append("line")
    .attr("x1",coordX-5)
    .attr("y1",coordY+2*offset)
    .attr("x2",coordX-20)
    .attr("y2",coordY+2*offset).style("fill", "#69b3a2")
    .attr("stroke", "#000000")
        .style("stroke-width", 1.5)
        .style("fill", "none")
svgT.append("text").attr("x", coordX).attr("y", coordY+2*offset).text("50% se auto aisla").style("font-size", "10px").attr("alignment-baseline","middle")

//Leyenda datos SSA
svgT.append('circle')
        .attr("cx", coordX-12)
        .attr("cy", coordY+3*offset)
        .attr("r", 5)
        .attr("opacity",0.7)
        .style("fill", "#1F9BCF")
svgT.append("text").attr("x", coordX).attr("y", coordY+3*offset).text("Datos SSA").style("font-size", "10px").attr("alignment-baseline","middle")

    // Animation
    /* Add 'curtain' rectangle to hide entire graph */
    var curtain = svgT.append('rect')
        .attr('x', -1 * w_full)//width
        .attr('y', -1 * h_full)//height
        .attr('height', h_full)//height
        .attr('width', w_full)//width
        .attr('class', 'curtain')
        .attr('transform', 'rotate(180)')
        .style('fill', '#ffffff');

    /* Optionally add a guideline */
    var guideline = svgT.append('line')
        .attr('stroke', '#333')
        .attr('stroke-width', 0)
        .attr('class', 'guide')
        .attr('x1', 1)
        .attr('y1', 1)
        .attr('x2', 1)
        .attr('y2', h_full)//height

    /* Create a shared transition for anything we're animating */
    var t = svgT.transition()
        .delay(1000)
        .duration(3700)
        .ease(d3.easeLinear)
        .on('end', function() {
            d3.select('line.guide')
                .transition()
                .style('opacity', 0)
                .remove()
        });

    t.select('rect.curtain')
        .attr('width', 0);
    t.select('line.guide')
        .attr('transform', 'translate(' + w + ', 0)')//width

    d3.select("#show_guideline").on("change", function(e) {
        guideline.attr('stroke-width', this.checked ? 1 : 0);
        curtain.attr("opacity", this.checked ? 0.75 : 1);
    })

});