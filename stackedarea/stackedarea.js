let w = 500;
let h = 500;
let padding = 30;

let  xScale, yScale, xAxis, yAxis, area;  

let parseTime = d3.timeParse("%Y-%m");
let formatTime = d3.timeFormat("%b");

let dataset = [
    {date: new Date(2018, 6), food: 120.00, transportation: 200.00, utilities: 124.00 }, 
    {date: new Date(2018, 7), food: 245.00, transportation: 110.00, utilities: 250.00 }, 
    {date: new Date(2018, 8), food: 113.00, transportation: 220.00, utilities: 80.00 }, 
    {date: new Date(2018, 9), food: 221.00, transportation: 160.00, utilities: 226.00 } ]; 


//Load in data
  let keys = ["food", "transportation", "utilities"]
  let stack = d3.stack().keys(keys); 
  let series = stack(dataset);


    xScale = d3.scaleTime()
                   .domain([
                        d3.min(dataset, function(d) { return d.date; }),
                        d3.max(dataset, function(d) { return d.date; })
                    ])
                   .range([2*padding, w - padding]);
                   
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
                    .range([h - padding*1.5, padding * 1.5])
                    .nice();

    xAxis = d3.axisBottom()
               .scale(xScale)
               .ticks(4)
               .tickFormat(formatTime);

    yAxis = d3.axisLeft()
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
    svg.selectAll(".area")
        .data(series)
        .enter()
        .append("path")
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", function(d, i) {
            return d3.schemeCategory10[i];
        })
        .append("title")  //Make tooltip
        .text(function(d) {
            return d.key;
        });
    //Create axes
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding*1.5) + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (padding * 2) + ",0)")
        .call(yAxis);

        
    // LEGEND - built using Susie Lu's d3.svg.legend package
    let legendScale = d3.scaleOrdinal()
    .domain(['Transportation', 'Food', 'Utilities'])
    .range(d3.schemeCategory10);

    svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(350,20)");

    // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
    var legendOrdinal = d3.legendColor()
    .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
    .shapePadding(10)
    .scale(legendScale);

    svg.select(".legendOrdinal")
    .call(legendOrdinal);
    

    svg.append('text')
    .classed('title', true)
    .attr('x', w/2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .text('Spend Path')
  
    // AXES LABELS
  
    svg.append('text')
      .classed('axis-label', true)
      .attr('transform', 'rotate(-90)')
      .attr('x', -h/2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text('Total money spent ($)')
      
    svg.append('text')
      .classed('axis-label', true)
      .attr('x', w/2)
      .attr('y', h - 5)
      .attr('text-anchor', 'middle')
      .text('2018')
