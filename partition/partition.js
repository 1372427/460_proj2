/* Hierarchical Layouts I 
 *
 */

let dataset = {
    "name": "Root/Parent (has no parents)",
    "children": [
      { "name": "Child/Parent", 
        "children": [ 
          { "name": "Child/Leaf",
            "value": 200,
          },
          { "name": "Child/Leaf",
            "value": 200,
          }
      
      ]},
      { "name": "Child/Leaf",
        "value": 300 }
    ]
  };
  
  function makeGraph() {
  
    let root = d3.hierarchy(dataset);
    console.log(root)
  
    let w = 500, h = 500;
  
    let svg = d3.select("#svg")
                .append('svg')
                .attr('width', w)
                .attr('height', h);
  
    let partitionLayout = d3.partition()
        .size([w - 40,h - 40])
        .padding(2);
    root.sum((d) => d.value)


    partitionLayout(root);
    console.log(root)
  
  
    // Our data now has a lot of information as well as utility functions for grabbing
    // analyzed data. We are going to use the list of links() to draw our lines, 
    // and the list of all descendants() to draw each item.
  
    svg.selectAll('rect')
       .data(root.descendants())
       .enter()
       .append('rect')
       .classed('link', true)
       .attr('x', d => d.x0)
       .attr('y', d => d.y0)
       .attr('width', d => d.x1-d.x0)
       .attr('height', d => d.y1-d.y0)
       .attr('fill', 'red')
       .attr('opacity', 0.3);
  
    svg.selectAll('text')
       .data(root.descendants())
       .enter()
       .append('text')
       .classed('node-label', true)
       .classed('', true)
       .attr('x', d => (d.x0 + d.x1)/2 -40 )
       .attr('y', d => (d.y0+d.y1)/2 )
       .text(d =>  d.data.name);
  
  }
  
  
  window.onload = function() {
    // console.table is very handy for viewing row/column data
    makeGraph();
  };
  