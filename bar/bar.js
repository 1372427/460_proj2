
  function makeGraph() {
    // dataset for this stacked bar chart
    let dataset = [
        {company: "Apple", sales: 124.00 }, 
        {company: "Google", sales: 124.00 }, 
        {company: "Microsoft", sales: 124.00 }, 
        {company: "Skype", sales: 124.00 },  ]; 
  
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
      .domain([0, d3.max(dataset, d => d.sales)])
      .range([h - 40, 20]);
  
      /////TODO
    let extent = d3.extent(dataset, d => d.company);
  
    let xScale = d3.scaleTime()
      .domain([extent[0], endDate])
      .range([60, w - 20]);
  
    let barlen = (w - 40) / dataset.length - 20;
  
    svg.selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
        .attr('x', d => xScale(d.company))
        .attr('y', d => w- yScale(d.sales))
        .attr('width', barlen)
        .attr('height', d => yScale(d.sales) )
  
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

    // AXES LABELS
  
    svg.append('text')
      .classed('axis-label', true)
      .attr('transform', 'rotate(-90)')
      .attr('x', -h/2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text('Total sales ($)')
      
    svg.append('text')
      .classed('axis-label', true)
      .attr('x', w/2)
      .attr('y', h - 5)
      .attr('text-anchor', 'middle')
      .text('Company')
            
  }
  
  
  window.onload = function() {
    makeGraph();
  };
  