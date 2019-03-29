
let dataset = []

for(let i = 0; i < 60; i++) {
  let datum = {
    sleep: (Math.random() < 0.02) ? -1 : Math.random() * 3 + 9,
    date: new Date(2014, i)
  };
  dataset.push(datum);
}

let w = 500;
let h = 500;



function createLineChart2() {
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

  // create a scale for x-axis: use time for the date data variable
  // set the end to be the day after the last date, which is hard
  // coded here, so that the far right end of the scale is going to
  // allow the last day within the data set to show within the range
  let xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, d => d.date))
    .range([30, w - 20]);

  let barlen = (w - 40) / dataset.length - 4;

  // create our x-axis and customize look with .ticks() and
  // .tickFormat()
  let xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.timeFormat("%m/%y"));
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
  let line = d3.line()
               .defined(d => d.sleep > 0)
               .x(d => xScale(d.date))
               .y(d => yScale(d.sleep))
               .style('stroke', 'red')
               .style('stroke-width', '2px');

  // draw the line using a path
  svg.append('path')
     .datum(dataset)
     .attr('class', 'line')
     .attr('d', line);


}


window.onload = function() {
    createLineChart2();
};