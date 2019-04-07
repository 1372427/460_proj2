
let dataset = [
  {
    cities: 5,
    date: new Date(2017, 01)
  },{
    cities: 6,
    date: new Date(2017, 02)
  },{
    cities: 4,
    date: new Date(2017, 03)
  },{
    cities: 6,
    date: new Date(2017, 04)
  },{
    cities: 7,
    date: new Date(2017, 05)
  },{
    cities: 7,
    date: new Date(2017, 06)
  },{
    cities: 5,
    date: new Date(2017, 07)
  },{
    cities: 4,
    date: new Date(2017, 08)
  },{
    cities: 5,
    date: new Date(2017, 09)
  },{
    cities: 6,
    date: new Date(2017, 10)
  },
  {
    cities: 2,
    date: new Date(2017, 11)
  },{
    cities: 1,
    date: new Date(2017, 12)
  },{
    cities: 3,
    date: new Date(2018, 1)
  },{
    cities: 6,
    date: new Date(2018, 2)
  },{
    cities: 3,
    date: new Date(2018, 3)
  },{
    cities: 4,
    date: new Date(2018, 4)
  },{
    cities: 5,
    date: new Date(2018, 5)
  },{
    cities: 4,
    date: new Date(2018, 6)
  },{
    cities: 2,
    date: new Date(2018, 7)
  },{
    cities: 2,
    date: new Date(2018, 8)
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

  // create a scale for y-axis: use linear for the cities data variable
  let yScale = d3
    .scaleLinear()
    .domain([0, 8])
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
               .defined(d => d.cities > 0)
               .x(d => xScale(d.date))
               .y(d => yScale(d.cities));

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
     .text('Cities Visited')
     
   svg.append('text')
     .classed('axis-label', true)
     .attr('x', w/2)
     .attr('y', h - 5)
     .attr('text-anchor', 'middle')
     .text('Month')

     svg.append('text')
       .classed('title', true)
       .attr('x', w/2)
       .attr('y', 20)
       .attr('text-anchor', 'middle')
       .text('Cities Visited Per Month')

}


window.onload = function() {
    createLineChart2();
};