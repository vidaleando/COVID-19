/* GRAFICADOR */
/* La siguiente función grafica,
admite como parámetros los datos, opciones 
y la div donde se despliega la gráfica */

function graficaPuntos(data, target, options) {
//Lee la altura y el ancho en las opciones
    var w = typeof options.width === 'undefined' ? 400  : options.width,
        h = typeof options.height === 'undefined' ? 400  : options.height,
        w_full = w,
        h_full = h;

//Para que sea responsivo

    if (w > $( window ).width()) {
      w = $( window ).width();
    }
//Definimos el margen
    var margin = {
            top: 50,
            right: 10,
            bottom: 40,
            left: 10,
            middle: 20
        },
        sectorWidth = (w / 2) - margin.middle,
        leftBegin = sectorWidth - margin.left,
        rightBegin = w - margin.right - sectorWidth;

    w = (w- (margin.left + margin.right) );
    h = (h - (margin.top + margin.bottom));

//Si no hay opciones, pone por defecto estos colores

    if (typeof options.style === 'undefined') {
      var style = {
        leftBarColor: '#6c9dc6',
        rightBarColor: '#de5454',
        tooltipBG: '#fefefe',
        tooltipColor: 'black'
      };
//En caso de haber opciones, las lee      
    } else {
      var style = {
        leftBarColor: typeof options.style.leftBarColor === 'undefined'  ? '#6c9dc6' : options.style.leftBarColor,
        rightBarColor: typeof options.style.rightBarColor === 'undefined' ? '#de5454' : options.style.rightBarColor,
        tooltipBG: typeof options.style.tooltipBG === 'undefined' ? '#fefefe' : options.style.tooltipBG,
        tooltipColor: typeof options.style.tooltipColor === 'undefined' ? 'black' : options.style.tooltipColor
    };
  } 
//Crea el div donde vamos a graficar
    var styleSection = d3.select(target).append('style')
    .text('svg {max-width:100%} \
    .axis line,axis path {shape-rendering: crispEdges;fill: transparent;stroke: #555;} \
    .axis text {font-size: 11px;} \
    .bar {fill-opacity: 1.0;} \
    .bar.left {fill: ' + style.leftBarColor + ';} \
    .bar.left:hover {fill: ' + colorTransform(style.leftBarColor, '333333') + ';} \
    .bar.right {fill: ' + style.rightBarColor + ';} \
    .bar.right:hover {fill: ' + colorTransform(style.rightBarColor, '333333') + ';} \
    .tooltip {position: absolute;line-height: 1.1em;padding: 7px; margin: 3px;background: ' + style.tooltipBG + '; color: ' + style.tooltipColor + '; pointer-events: none;border-radius: 6px;}')

//genera el tooltip
    var tooltipDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

//Genera el contenedor de la gráfica
    var pyramid = region.append('g')
        .attr('class', 'inner-region')
        .attr('transform', translation(margin.left, margin.top));

//Genera el eje x
	var mindate = new Date(2020,1,28), //Mínimo de fecha
		today = new Date(); //Fecha de hoy
    var x = d3.scaleTime()
        .domain([mindate,today])
        .range([0, (sectorWidth-margin.middle)])
        .nice();
    pyramid.append("g")
      .attr("transform", "translate(0," + (height-10) + ")")
      .attr("class","graph_date")
      .call(d3.axisBottom(x))
      .selectAll("text")  //Rota las labels
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

// Add Y axis      
    var y = d3.scaleLinear()
    .domain( [0,d3.max(data, function(d){return d.México;  })*1.1])
      .range([ height-10, 0 ]);
    svgT.append("g")
      .call(d3.axisLeft(y)) ;

// Grafica
    var line = pyramid
      	.append('g')
      	.append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return x(d.Fecha) })
          .y(function(d) { return y(+d.México) })
        )
        .attr("stroke", "#1f9bcf")
        .style("stroke-width", 3)
        .style("fill", "none")           

//Puntos
var dot = pyramid.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) { return x(d.Fecha) })
        .attr("cy", function(d) { return y(+d.México) })
        .attr("r", 5)
        .style("fill", "#1F9BCF")
        .on("mouseover", function(d) {    
            tip.transition()    
                .duration(200)    
                .style("opacity", .9);    
            tip.html("<h6>" + formatDay(d.Fecha) + "/" + formatMonth(d.Fecha) + "</h6>"+ " <p class='text-primary'>"  + d.México + "</p>")  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 30) + "px");  
            })          
        .on("mouseout", function(d) {   
            tip.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });
    /* HELPER FUNCTIONS */

    // string concat for translate
    function translation(x, y) {
        return 'translate(' + x + ',' + y + ')';
    }

    // numbers with commas
    function prettyFormat(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}    