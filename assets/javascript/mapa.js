//set dimensions
var urlTotal = "https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv",
    urlRecu = "https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_recuperados.csv",
    w = 700,
    h = 400;
/*var  adjust = window.innerWidth;
$('#mapa').scrollLeft(adjust/2);*/
var navMap = d3.select("#mapa").append("div") 
    .attr("class", "nav_map")       
    .style("opacity", 0);

var hover = function(d) {
    var div = document.getElementById('tooltip');
    div.innerHTML = d.properties.name;
    var selector = div.innerHTML;
    d3.csv(urlTotal, function(data) {
        var largo = data.length;
        var tope = largo - 1;
        var tot = document.getElementById('col_tot');
        tot.innerHTML = data[tope][div.innerHTML];
    });
    d3.csv(urlRecu, function(data) {
        var largo = data.length;
        var tope = largo - 1;
        var recu = document.getElementById('col_recu');
        recu.innerHTML = data[tope][div.innerHTML];
        return recu.innerHTML;
    });
    console.log(document.getElementById('col_tot').innerHTML - document.getElementById('col_recu').innerHTML);
    var finalTot = document.getElementById('col_tot');
    var finalRecu = document.getElementById('col_recu');
    var act = document.getElementById('col_act');
    act.innerHTML = +finalTot.innerHTML - recu.innerHTML;

};

//define projection
var projection = d3.geoMercator()
    .center([-100, 22])
    .translate([w / 1.7, h / 1.7])
    .scale([w / .7]);

//define path generator
var path = d3.geoPath()
    .projection(projection)

//svg
var mapSvg = d3.select("#mapa")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//load GeoJson data
d3.json("https://raw.githubusercontent.com/vidaleando/COVID-19/master/assets/javascript/prueba.geojson", function(json) {
    feat = json.features;
    console.log(feat);
    // bind data
    mapSvg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        //.on("mouseover", hover);
        .on("mouseover", function(d) {    
            navMap.transition()    
                .duration(200)    
                .style("opacity", .9);    
            navMap.html("<em>" +json.name+ "</em>"+ "<br/> <p class='text-primary'>"  + d.Mexico_pais + "</p>")  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })          
        .on("mouseout", function(d) {   
            navMap.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });


});


