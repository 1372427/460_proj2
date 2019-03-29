function makeGraph(){
    let w = 500;
    let h = 300;

    let dataset = Array.from({length: 32}, () => {
        return { x: Math.random() * 100, y: Math.random() * 100};
      })
    
      console.log(dataset);
    
      // create our SVG element
      let svg = d3.select('#svg').append('svg').attr('width', w).attr('height', h);
    
      let yScale = d3.scaleLinear()
                  .domain([0, 100])
                  .range([h - 20, 20]);
    
      let xScale = d3.scaleLinear()
                  .domain([0, 100])
                  .range([30, w - 20]);
    
      svg.selectAll('circle')
        .data(dataset)
        .enter()
          .append('circle')
          .attr('cx', (d) => xScale(d.x))
          .attr('cy', (d) => yScale(d.y))
          .attr('r', 5)
          .style('fill', 'red');
    
      // create our x-axis and customize look with .ticks() and
      // .tickFormat()
      let xAxis = d3.axisBottom(xScale);
      let xAxisGroup = svg.append('g')
                      .attr('transform', `translate(0, ${h - 20})`)
                      .call(xAxis);
    
      let yAxis = d3.axisLeft(yScale);
      let yAxisGroup = svg.append('g')
                      .attr('transform', `translate(30, 0)`)
                      .call(yAxis);
}

window.onload = function(){
    makeGraph();
  } 