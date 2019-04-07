
  function makeGraph() {
    // dataset for this stacked bar chart
    let dataset = [
        {company: "Apple", sales: 132.00 }, 
        {company: "Google", sales: 423.00 }, 
        {company: "Microsoft", sales: 124.00 }, 
        {company: "Skype", sales: 224.00 },  
        {company: "Amazon", sales: 367.00 }, 
        {company: "Facebook", sales: 324.00 }, 
        {company: "Slack", sales: 632.00 }, 
        {company: "Twitter", sales: 345.00 }, ]; 
  
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
  
    let xScale = d3.scaleBand()
    .domain(["Apple","Google", "Microsoft", "Skype", "Amazon", "Facebook", "Slack", "Twitter"])
    .range([60, w-20])
  
    let barlen = (w - 40) / dataset.length - 20;
  
    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
        .attr('x', (d,i) => xScale(d.company))
        .attr('y', d =>  yScale(d.sales))
        .attr('width', barlen)
        .attr('height', d => h-40-yScale(d.sales) )
        .attr('fill', 'blue')
  
    // AXES
    let xAxis = d3
      .axisBottom(xScale)
      .ticks(dataset.length + 1);

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
      .text('Total sales ($k)')
      
    svg.append('text')
      .classed('axis-label', true)
      .attr('x', w/2)
      .attr('y', h - 5)
      .attr('text-anchor', 'middle')
      .text('Company')
            

     svg.append('text')
     .classed('title', true)
     .attr('x', w/2)
     .attr('y', 20)
     .attr('text-anchor', 'middle')
     .text('2018 Earnings')

  }
  
  
  window.onload = function() {
    makeGraph();
  };
  