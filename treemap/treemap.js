/* D3 Treemap exercise.
 *
 * Build a Treemap using D3's treemap layout:
 * 
 * https://github.com/d3/d3-hierarchy/blob/master/README.md
 * 
 * 1. Use the randomized tree data with d3.hierarchy(). Be sure to call .sum()! 
 * 2. Experiment with different tiling options. 
 * 3. Experiment with color
 * 4. Experiment with padding (inner, outer, top) 
 * 
 * While developing, use console.log to inspect the original data, hierarchy data, 
 * and transformed hierarchy after running the layout function on it
 */

/* UTILITY FUNCTIONS */



  let dataset = {
    name: "RIT",
    children: [
      {
        name: "GCCIS",
        children: [
          {
            name: "GDD",
            value: 147
          },
          {
            name: "Security",
            value: 235
          },
          {
            name: "HCI",
            value: 243
          }
        ]
      },
      {
        name: "NTID",
        children: [
          
          {
            name: "Architecture",
            value: 401
          },
          
          {
            name: "Interpretation",
            value: 125
          },
          
          {
            name: "Art",
            value: 525
          }
        ]
      },
      {
        name: "COLA",
        children: [
          
          {
            name: "Linguistics",
            value: 432
          },
          
          {
            name: "Social Behaviour",
            value: 235
          },
          {
            name: "Psychology",
            value: 124
          }
        ]
      }
    ]
  }
  
  
  /* VISUALIZATION CODE */
  
  function createVisualization(dataset) {
    let w = 500, h = 500;
    let svg = d3.select("#svg")
                .append('svg')
                .attr('width', w)
                .attr('height', h)
                .append('g')
                .attr('transform', 'translate(0,100)');
  
  
    // create hierarchy data and sum it up
    let root = d3.hierarchy(dataset).count();
    root.sum(d => d.value)
  
    // create treemap layout function and call it on hierarchy data
    let layout = d3.treemap()
                    .size([w,h-100])
                    .paddingOuter(10)
                    .paddingInner(10)
                    .paddingTop(30)
                    .tile(d3.treemapSliceDice);
  
    layout(root);
    console.log(root)
  
    // create colors scale
    let color = d3.scaleOrdinal(d3.schemePastel1);
  
    // create rectangles 
    svg.selectAll('rect')
      .data(root.descendants())
      .enter()
      .append('rect')
      .classed('partition-area', true)
      .style('fill', d=> color(d.depth))
      .attr('x', d=> d.x0)
      .attr('y', d=> d.y0)
      .attr('width', d=> (d.x1-d.x0))
      .attr('height', d=> (d.y1 - d.y0))
  
    // add text 
    svg.selectAll('text')
       .data(root.descendants())
       .enter()
       .append('text')
       .classed('node-label', true)
       .style('font-weight', d => d.children ? 'bold' : 'normal')
       .attr('x', d => d.x0 + 10)
       .attr('y', d => d.y0 + 25)
       .text(d => d.data.name);

    svg.append('text')
       .classed('title', true)
       .attr('x', w/2)
       .attr('y',  -50)
       .attr('text-anchor', 'middle')
       .text('RIT Majors')
       
    // LEGEND - built using Susie Lu's d3.svg.legend package
    let legendScale = d3.scaleOrdinal()
    .domain(['University', 'College', 'Major'])
    .range(d3.schemePastel1);

    svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(400,-80)");

    // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
    var legendOrdinal = d3.legendColor()
    .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
    .shapePadding(10)
    .scale(legendScale);

    svg.select(".legendOrdinal")
    .call(legendOrdinal);
             
  }
  
  
  window.onload = function() {
    createVisualization(dataset);
  };
  