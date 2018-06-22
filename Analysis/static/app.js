var svgWidth = 960;
var svgHeight = 500;

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
            .attr("height",svgHeight);

var chartGroup = svg.append("g")
                .attr("transform",`translate(${margin.left},${margin.top})`);




d3.json("/data",function(error,JSONdata){
    if(error){
        console.error()
    }
    // // Working Code
    // d3.select("#chart")
    //     .selectAll("p")
    //     .data(JSONdata)
    //     .enter()
    //     .append("p")
    //     .text(function(d){
    //         return(d.ActivityID + ", " + d.Distance);
    //     });


    // var data = []
    // var tempAr1 = []
    // var tempAr2 = []
    // tempAr1.push("ActivityID");
    // tempAr2.push("Distance");
    // JSONdata.forEach(function(item){
    //         tempAr1.push(item.ActivityID);
    //         tempAr2.push(item.Distance);
    // });
    // data.push(tempAr1,tempAr2);
    // data.forEach(function(d){
    //     d.Distance = +d.Distance;
    // });


    var barSpacing = 10;
    var scaleY = 10;
    var barWidth = 10;

    var data = d3.nest().key(function(d){return d.ActivityID;})
                        .rollup(function(d){
                            return d3.max(d, function(g){return g.Distance * 0.000621371;});
                        }).entries(JSONdata);
    console.log(data);
   data.forEach(function(d){
        d.ActivityID = d.key;
        d.Distance = d.value;
    })

    var xBandScale = d3.scaleBand()
                    .domain(data.map(d => d.ActivityID))
                    .range([0,width])
                    .padding(0.1);
    var yLinearScale = d3.scaleLinear()
                    .domain([0,d3.max(data,d=>d.Distance)])
                    .range([height,0]);
    

    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    chartGroup.append("g").call(leftAxis);
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    data.forEach(function(d){
        d.Distance = +d.Distance;
    });
    chartGroup.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => xBandScale.bandwidth())
    .attr("height", d => height - yLinearScale(d.Distance))
    .attr("x", (d, i) => xBandScale(d.ActivityID))
    .attr("y", d => yLinearScale(d.Distance));
    console.log("Test");
});