
  
  function createDonutChart() {
    // dataset for this pie chart
    let dataset = [
      {name: "Hispanic", value: 7 }, 
      {name: "African", value: 5}, 
      {name: "Asian", value: 20}, 
      {name: "European", value: 60}, 
      {name: "Other", value: 8}];
  
    dataset.sort((a,b) => b.value - a.value);
  
    // settings for our pie chart 
    let w = 500;
    let h = 300;
    let innerRadius = h/2 - 50;       
    let outerRadius = h/2;
  
    // create our SVG element
    let svg = d3
      .select("#svg")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
  
    // create D3 pie layout that converts 
    // dataset into one appropriate for pie charts 
    let pie = d3.pie()      
                .value(d => d.value);       
  
    // create D3 arc generator we will use for pie layout 
    let arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);
  
  
    // use a color scale for the bar colors
    // ordinal scales created given an array of output range values
    // usually used by giving input indices into array 
    let cScale = d3.scaleOrdinal(d3.schemeCategory10);
  
    console.table(pie(dataset));
  
    let arcs = 
      svg.selectAll('g.arc')
          .data(pie(dataset))
          .enter()
          .append('g')
            .attr('class', 'arc')
            .attr('transform', `translate(${w/2}, ${h/2})`);
   
    // append an SVG path to each g element for the pie wedge
    // uses the arc generator we configured earlier 
    arcs.append('path')
      .attr('fill', (d,i) => cScale(i))
      .attr('d', arc)
      .append('title')
        .text(d => d.data.name);
  
    // now append text elements to each 'g' pie wedge
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.value);
  
    // append center text label 
    svg.append('text')
      .classed('title', true)
      .attr('transform', `translate(${w/2}, ${h/2})`)
      .attr('text-anchor', 'middle')
      .text("RIT 2018 Demography");

      
    // LEGEND - built using Susie Lu's d3.svg.legend package
    let pieData = pie(dataset);
    let legendScale = d3.scaleOrdinal()
                        .domain(pieData.map(d => d.data.name))
                        .range(d3.schemeCategory10);
  
    svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(420,20)");
  
    // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
    var legendOrdinal = d3.legendColor()
      .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
      .shapePadding(10)
      .scale(legendScale);
  
    svg.select(".legendOrdinal")
      .call(legendOrdinal);
            
  }
  
  
  window.onload = function() {
    createDonutChart();
  };
  