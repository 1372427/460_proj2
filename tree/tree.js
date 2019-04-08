/* Hierarchical Layouts I 
 *
 */

let dataset = {
    "name": "Grandpa A",
    "children": [
      { "name": "Aunt B", 
        "children": [ 
          { "name": "Cousin B1"
          }
      
      ]},{ "name": "Mom", 
        "children": [ 
          { "name": "Me"
          },{ "name": "Brother"
          },{ "name": "Sister"
          }
      
      ]},
      { "name": "Aunt C" }
    ]
  };
  
  function createTree() {
  
    let root = d3.hierarchy(dataset);
    console.log(root)
  
    let w = 500, h = 500;
  
    let svg = d3.select("#svg")
                .append('svg')
                .attr('width', w)
                .attr('height', h);
  
    let treelayout = d3.tree().size([w - 40,h - 40]);
  
    // The tree layout will analyze in-place and update our hierarchy data to
    // add x and y locations
    treelayout(root);
    console.log(root)
  
  
    // Our data now has a lot of information as well as utility functions for grabbing
    // analyzed data. We are going to use the list of links() to draw our lines, 
    // and the list of all descendants() to draw each item.
  
    svg.selectAll('lines')
       .data(root.links())
       .enter()
       .append('line')
       .classed('link', true)
       .attr('x1', d => d.source.x + 20)
       .attr('y1', d => d.source.y + 20)
       .attr('x2', d => d.target.x + 20)
       .attr('y2', d => d.target.y + 20)
       .attr('stroke', 'black');
  
    svg.selectAll('circle')
       .data(root.descendants())
       .enter()
       .append('circle')
       .classed('node', true)
       .attr('cx', d => d.x + 20)
       .attr('cy', d => d.y + 20)
       .attr('r', 20);
  
    svg.selectAll('text')
       .data(root.descendants())
       .enter()
       .append('text')
       .classed('node-label', true)
       .classed('', true)
       .attr('x', d => d.x + 40)
       .attr('y', d => d.y + 25)
       .text(d => d.data.name);
  
  }
  
  
  window.onload = function() {
    // console.table is very handy for viewing row/column data
    createTree();
  };
  
