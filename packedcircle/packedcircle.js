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
  
    let packLayout = d3.pack().size([w - 40,h - 40]);
    root.sum((d) => d.value)


    packLayout(root);
    console.log(root)
  
  
    // Our data now has a lot of information as well as utility functions for grabbing
    // analyzed data. We are going to use the list of links() to draw our lines, 
    // and the list of all descendants() to draw each item.
  
    svg.selectAll('circle')
       .data(root.descendants())
       .enter()
       .append('circle')
       .classed('link', true)
       .attr('cx', d => d.x)
       .attr('cy', d => d.y)
       .attr('r', d => d.r)
       .attr('fill', 'red')
       .attr('opacity', 0.3);
  
    svg.selectAll('text')
       .data(root.descendants())
       .enter()
       .append('text')
       .classed('node-label', true)
       .classed('', true)
       .attr('x', d => d.x )
       .attr('y', d => d.y )
       .text(d => d.children===undefined? d.data.name: "");
  
  }
  
  
  window.onload = function() {
    // console.table is very handy for viewing row/column data
    makeGraph();
  };
  