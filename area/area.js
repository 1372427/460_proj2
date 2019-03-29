let w =500;
let h = 400;
let dataset = [
    {date: 'Tue', sleep: 1.95},
    {date: 'Wed', sleep: 10.6},
    {date: 'Thurs', sleep:2.95},
    {date:'Fri', sleep: 9.45},
    {date: 'Sat', sleep: 11.19},
    {date: 'Sun', sleep: 2.6},
    {date: 'Mon', sleep: 8.5}
]

function createAreaChart() {
    console.log('hi')
    // create our SVG element
    let svg = d3
      .select("#svg")
      .attr("width", w)
      .attr("height", h);
  
    // create a scale for y-axis: use linear for the sleep data variable
    let yScale = d3
      .scaleLinear()
      .domain([0, 12])
      .range([h - 20, 20]);
  
    // create a scale for x-axis: use d3.extent directly to get the min and max 
    // values as an array, which works great as the argument for domain. 
    let xScale = d3
      .scaleTime()
      .domain(d3.extent(dataset, d => d.date))
      .range([30, w - 20]);
  
    let barlen = (w - 40) / dataset.length - 4;
  
    // create our x-axis and customize look with .ticks() and
    // .tickFormat()
    let xAxis = d3
      .axisBottom(xScale)
      .ticks(dataset.length + 1)
      .tickFormat(d3.timeFormat("%a"));
    let xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${h - 20})`)
      .call(xAxis);
  
    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = svg
      .append("g")
      .attr("transform", `translate(30, 0)`)
      .call(yAxis);
  
    /* LINE CHART CODE */
    // build a D3 line generator 
    let area = d3.area()
                 .x(d => xScale(d.date))
                 .y0(d => yScale(d.sleep))
                 .y1(yScale.range()[0])
                 .style('stroke', 'red')
                 .style('fill', 'red');
  
    // draw the line using a path
    svg.append('path')
       .datum(dataset)
       .attr('class', 'area')
       .attr('d', area);
  
  }
  
  window.onload = function(){
    createAreaChart();
  } 