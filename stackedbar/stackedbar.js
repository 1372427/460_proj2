
  function createStackedBarChart() {
    // dataset for this stacked bar chart
    let dataset = [
        {date: new Date(2018, 6), food: 120.00, transportation: 200.00, utilities: 124.00 }, 
        {date: new Date(2018, 7), food: 245.00, transportation: 110.00, utilities: 250.00 }, 
        {date: new Date(2018, 8), food: 113.00, transportation: 220.00, utilities: 80.00 }, 
        {date: new Date(2018, 9), food: 221.00, transportation: 160.00, utilities: 226.00 } ]; 
  
    // create d3 layout function to convert dataset into stacked values
    let stack = d3.stack()
                        .keys(['transportation', 'food', 'utilities']); 
    let stackedData = stack(dataset);
  
    // settings for our pie chart 
    let w = 500;
    let h = 500;
  
    // create our SVG element
    let svg = d3
      .select("#svg")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
  
    // create a scale for y-axis
    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.food + d.transportation + d.utilities)])
      .range([h - 40, 20]);
  
    let extent = d3.extent(dataset, d => d.date);
    let endDate = new Date(extent[1].getFullYear(), extent[1].getMonth() + 1);
  
    let xScale = d3.scaleTime()
      .domain([extent[0], endDate])
      .range([60, w - 20]);
  
  
    // use a color scale for the bar colors
    // ordinal scales created given an array of output range values
    // usually used by giving input indices into array 
    let cScale = d3.scaleOrdinal(d3.schemeCategory10);
  
    let groups = 
      svg.selectAll('g')
          .data(stackedData)
          .enter()
          .append('g')
            .style('fill', (d, i) => cScale(i));
  
    let barlen = (w - 40) / dataset.length - 20;
  
    groups.selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
        .attr('x', d => xScale(d.data.date))
        .attr('y', d => yScale(d[1]))
        .attr('width', barlen)
        .attr('height', d => yScale(d[0]) - yScale(d[1]))
  
    // AXES
  
    // create our x-axis and customize look with .ticks() and
    // .tickFormat()
    let xAxis = d3
      .axisBottom(xScale)
      .ticks(dataset.length + 1)
      .tickFormat(d3.timeFormat("%b")) ;
    let xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${h - 40})`)
      .call(xAxis);
  
    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = svg
      .append("g")
      .attr("transform", `translate(60, 0)`)
      .call(yAxis);
  
    // LEGEND - built using Susie Lu's d3.svg.legend package
    let legendScale = d3.scaleOrdinal()
                        .domain(['Transportation', 'Food', 'Utilities'])
                        .range(d3.schemeCategory10);
  
    svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(80,20)");
  
    // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
    var legendOrdinal = d3.legendColor()
      .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
      .shapePadding(10)
      .scale(legendScale);
  
    svg.select(".legendOrdinal")
      .call(legendOrdinal);
  
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
            
  }
  
  
  window.onload = function() {
    createStackedBarChart();
  };
  