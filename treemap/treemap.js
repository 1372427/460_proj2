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

function rand(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }
  
  function genRandomTree(depth, depthMax, valueRange) {
    if(depth == depthMax - 1) {
      return { "name": 'child', 
               'value': rand(valueRange[0], valueRange[1])};
    } else {
      let numChildren = rand(3,5);
  
      return { 'name': 'parent', 
               'children': Array.from({length:numChildren}, () => genRandomTree(depth + 1, depthMax, valueRange)) }
    }
  }
  
  
  /* VISUALIZATION CODE */
  
  function createVisualization(dataset) {
    let w = 500, h = 600;
    let svg = d3.select("#svg")
                .attr('width', w)
                .attr('height', h);
  
  
    // create hierarchy data and sum it up
    let root = d3.hierarchy(dataset).count();
  
    // create treemap layout function and call it on hierarchy data
    let layout = d3.treemap()
                    .size([w,h])
                    .paddingOuter(10)
                    .paddingInner(10)
                    .paddingTop(30)
                    .tile(d3.treemapSliceDice);
  
    layout(root);
  
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
  }
  
  
  window.onload = function() {
    createVisualization(genRandomTree(0, 3, [100, 1000]));
  };
  