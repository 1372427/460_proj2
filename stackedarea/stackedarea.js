let w = 500;
let h = 500;
let padding = 20;

let  xScale, yScale, xAxis, yAxis, area;  

let parseTime = d3.timeParse("%Y-%m");
let formatTime = d3.timeFormat("%b %Y");

let dataset = [
    {date: new Date(2018, 6), food: 120.00, transportation: 200.00, utilities: 124.00 }, 
    {date: new Date(2018, 7), food: 245.00, transportation: 110.00, utilities: 250.00 }, 
    {date: new Date(2018, 8), food: 113.00, transportation: 220.00, utilities: 80.00 }, 
    {date: new Date(2018, 9), food: 221.00, transportation: 160.00, utilities: 226.00 } ]; 

let stack = d3.stack()
              .order(d3.stackOrderDescending);  
//Load in data
  let keys = ["food", "transportation", "utilities"]
    let series = stack(dataset);
    xScale = d3.scaleTime()
                   .domain([
                        d3.min(dataset, function(d) { return d.date; }),
                        d3.max(dataset, function(d) { return d.date; })
                    ])
                   .range([padding, w - padding * 2]);
    yScale = d3.scaleLinear()
                    .domain([
                        0,
                        d3.max(dataset, function(d) {
                            let sum = 0;
                            for (let i = 0; i < keys.length; i++) {
                                sum += d[keys[i]];
                            };
                            return sum;
                        })
                    ])
                    .range([h - padding, padding / 2])
                    .nice();
    xAxis = d3.axisBottom()
               .scale(xScale)
               .ticks(10)
               .tickFormat(formatTime);
    yAxis = d3.axisRight()
               .scale(yScale)
               .ticks(5);
    area = d3.area()
                .x(function(d) { return xScale(d.data.date); })
                .y0(function(d) { return yScale(d[0]); })
                .y1(function(d) { return yScale(d[1]); });
    let svg = d3.select("#svg")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    svg.selectAll("path")
        .data(series)
        .enter()
        .append("path")
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", function(d, i) {
            return d3.schemeCategory20[i];
        })
        .append("title")  //Make tooltip
        .text(function(d) {
            return d.key;
        });
    //Create axes
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (w - padding * 2) + ",0)")
        .call(yAxis);
