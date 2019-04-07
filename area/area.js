let w =500;
let h = 400;
let dataset = [
    {date: new Date(2018,4,1), time: 1.95},
    {date: new Date(2018,4,2), time: 4.6},
    {date: new Date(2018,4,3), time:2.95},
    {date: new Date(2018,4,4), time: 6.45},
    {date: new Date(2018,4,5), time: 5.19},
    {date: new Date(2018,4,6), time: 2.6},
    {date: new Date(2018,4,7), time: 5.5},
    {date: new Date(2018,4,8), time: 1.95},
    {date: new Date(2018,4,9), time: 5.6},
    {date: new Date(2018,4,10), time: 3.95},
    {date: new Date(2018,4,11), time: 4.45},
    {date: new Date(2018,4,12), time: 5.19},
    {date: new Date(2018,4,13), time: 2.6},
    {date: new Date(2018,4,14), time: 7.5}
]

function createAreaChart() {
    // create our SVG element
    let svg = d3
      .select("#svg")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
  
    // create a scale for y-axis: use linear for the time data variable
    let yScale = d3
      .scaleLinear()
      .domain([0, 8])
      .range([h - 50, 20]);
  
    // create a scale for x-axis: use d3.extent directly to get the min and max 
    // values as an array, which works great as the argument for domain. 

    let xScale = d3
        .scaleTime()
        .domain(d3.extent(dataset, d => d.date))
        .range([50, w - 20]);

  

    let barlen = (w - 40) / dataset.length - 4;
  
    // create our x-axis and customize look with .ticks() and
    // .tickFormat()
    let xAxis = d3
      .axisBottom(xScale)
      .tickFormat(d3.timeFormat("%m/%d"))
      .ticks(dataset.length + 1);

    let xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${h - 50})`)
      .call(xAxis);
  
    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = svg
      .append("g")
      .attr("transform", `translate(50, 0)`)
      .call(yAxis);
      
    /* LINE CHART CODE */
    // build a D3 line generator 
    let area = d3.area()
                 .x(d=> xScale(d.date))
                 .y0(d => yScale(d.time))
                 .y1(yScale.range()[0]);
  
    // draw the line using a path
    svg.append('path')
       .datum(dataset)
       .attr("fill", "red")
       .attr('class', 'area')
       .attr('d', area);

       svg.append('text')
       .classed('axis-label', true)
       .attr('transform', 'rotate(-90)')
       .attr('x', -h/2)
       .attr('y', 20)
       .attr('text-anchor', 'middle')
       .text('Time Studying (hrs)')
       
     svg.append('text')
       .classed('axis-label', true)
       .attr('x', w/2)
       .attr('y', h - 5)
       .attr('text-anchor', 'middle')
       .text('Date (2018)')

       

     svg.append('text')
     .classed('title', true)
     .attr('x', w/2)
     .attr('y', 20)
     .attr('text-anchor', 'middle')
     .text('Hours Studied Per Day')

  
  }
  
  window.onload = function(){
    createAreaChart();
  } 