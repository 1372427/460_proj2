
let dataset = [
  {
    sleep: 5,
    date: new Date(2017, 01)
  },{
    sleep: 6,
    date: new Date(2017, 02)
  },{
    sleep: 4,
    date: new Date(2017, 03)
  },{
    sleep: 6,
    date: new Date(2017, 04)
  },{
    sleep: 7,
    date: new Date(2017, 05)
  },{
    sleep: 7,
    date: new Date(2017, 06)
  },{
    sleep: 5,
    date: new Date(2017, 07)
  },{
    sleep: 4,
    date: new Date(2017, 08)
  },{
    sleep: 5,
    date: new Date(2017, 09)
  },{
    sleep: 6,
    date: new Date(2017, 10)
  },
]

let w = 500;
let h = 500;



function createLineChart2() {
  // create our SVG element
  let svg = d3
    .select("#svg")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // create a scale for y-axis: use linear for the sleep data variable
  let yScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([h - 50, 20]);

  // create a scale for x-axis: use time for the date data variable
  // set the end to be the day after the last date, which is hard
  // coded here, so that the far right end of the scale is going to
  // allow the last day within the data set to show within the range
  let xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, d => d.date))
    .range([50, w - 20]);

  let barlen = (w - 40) / dataset.length - 4;

  // create our x-axis and customize look with .ticks() and
  // .tickFormat()
  let xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.timeFormat("%m/%y"));
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
  let line = d3.line()
               .defined(d => d.sleep > 0)
               .x(d => xScale(d.date))
               .y(d => yScale(d.sleep));

  // draw the line using a path
  svg.append('path')
     .datum(dataset)
     .attr('class', 'line')
     .attr('d', line)
     .style('stroke', 'red')
     .style('stroke-width', '2px')
     .style('fill', 'none');

     svg.append('text')
     .classed('axis-label', true)
     .attr('transform', 'rotate(-90)')
     .attr('x', -h/2)
     .attr('y', 20)
     .attr('text-anchor', 'middle')
     .text('States Visited')
     
   svg.append('text')
     .classed('axis-label', true)
     .attr('x', w/2)
     .attr('y', h - 5)
     .attr('text-anchor', 'middle')
     .text('Month')

}


window.onload = function() {
    createLineChart2();
};