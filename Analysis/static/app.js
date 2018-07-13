// set svg Width and Height
var svgWidth = 960;
var svgHeight = 500;

//set margin
var margin = {
    top: 20,
    right: 40,
    bottom:80,
    left:100
}

var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#chart")
            .append("svg")
            .attr("width",svgWidth)
            .attr("height",svgHeight+5);

var chartGroup = svg.append("g")
                .attr("transform",`translate(${margin.left},${margin.top-2})`);



//Intializing table
var table_parent = d3.select(".table-data")
var d3table = table_parent.append('table')

//Table Header
thead = d3.select("table").selectAll("th")
.data(["Activity ID","Distance"]).enter().append("th").text(function(d){return d})


//---------------

//Testing Getting info from dropdown

// d3.select("#inds").on("change",function(){
//     var sect = document.getElementById("inds");
//     var section = sect.options[sect.selectedIndex].value;
//     console.log(section);


// });




//-------------------------

d3.json("/data",function(error,JSONdata){
    
    if(error){
        console.error()
    }
    //console.log(JSONdata);
    var conditions;

    d3.select("#inds").on("change",function(){
        var sect = document.getElementById("inds");
        var section = sect.options[sect.selectedIndex].value;
        // switch(section){
        //     case "Mile Coverage Per Activity":
        //     case "Mile Coverage per Date":
        //     section = {
        //         x: data
        //     }
        // }
        console.log(section);    
        updateGraph(JSONdata,section);
    });


function updateGraph(jsonData, dropdownValue){
    svg.selectAll("*").remove();

    var barSpacing = 10;
    var scaleY = 10;
    var barWidth = 10;
    //console.log(jsonData);
    var str0;
    if(dropdownValue=="Mile Coverage per Activity"){
        str0="ActivityID"
    }
    else{
        str0="Date"
    }

    var data = d3.nest().key(function(d){return d[str0];})
                        .rollup(function(d){
                            return d3.max(d, function(g){return g.Distance * 0.000621371;});
                        }).entries(jsonData);
    console.log(data);
   data.forEach(function(d){
        d[str0] = d.key;
        d.Distance = d.value;
    });
    var xBandScale = d3.scaleBand()
                    .domain(data.map(d => d[str0]))
                    .range([width,0])
                    .padding(0.1);
    var yLinearScale = d3.scaleLinear()
                    .domain([0,d3.max(data,d=>d.Distance)])
                    .range([height,0]);
    


    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    chartGroup.append("g").call(leftAxis);
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)
    .selectAll("text")
    .attr("y",0)
    .attr("x",-50)
    .attr("transform","rotate(-65)");
    //console.log(data);
    data.forEach(function(d){
        d.Distance = +d.Distance;


        //Impute data into table
        var d3row = d3table.append('tr');
        var row_a=[];
        for (key in d){row_a.push(d[key])}
        row_a.slice(0,2).forEach(function(el){d3row.append('td');});
        var d3td_hd = d3row.selectAll('td').data(row_a.slice(0,2));
        
        d3td_hd.text(function(d){return d;});
    });
    
    var barsGroup = chartGroup.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => xBandScale.bandwidth())
    .attr("height", d => height - yLinearScale(d.Distance))
    .attr("x", (d, i) => xBandScale(d[str0]))
    .attr("y", d => yLinearScale(d.Distance));


    /* X and Y Axis Labels*/
    chartGroup.append("text")
            .attr("text-anchor","middle")
            .attr("transform",`translate(${-50}, ${svgHeight/3})rotate(-90)`)
            .text("Miles");
    chartGroup.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (svgWidth/2) +","+(svgHeight-(100/5)+5)+")")  // centre below axis
            .text(str0);
/*Tooltip*/
    var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([0, -60])
            .html(function(d) {
              return (`<strong>Distance:</strong> <font color="blue">${d.Distance.toFixed(2)}</font>`);
            });

        chartGroup.call(toolTip);
      


    
    barsGroup.on("mouseover",function(d){
        toolTip.show(d)
         .style("opacity", .9);
        d3.select(this)
            .transition()
            .duration(1000)
            .attr("fill","red");
    })
    .on("mouseout",function(d){
        d3.select(this)
        .transition()
        .duration(1000)
        .attr("fill","black");
        toolTip.hide(d);
    })
};


});