/* Hierarchical Layouts I 
 *
 */

let dataset = {
    "name": "A",
    "children": [
      { "name": "B", 
        "children": [ 
          { "name": "C"
          }, { "name": "D", 
          "children": [ 
            { "name": "E"
            }
        
        ]}
      
      ]},
      { "name": "F","children": [ 
        { "name": "G"
        }, { "name": "H"}]
     }
    ]
  };
  
  
  function createCluster() {
  
    let root = d3.hierarchy(dataset);
    console.log(root)
  
    let w = 500, h = 500;
  
    let svg = d3.select("#svg")
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .append('g')
      .attr('transform', 'translate(0,40)');
  
    let treelayout = d3.cluster().size([w - 40,h - 80]);
  
    // The tree layout will analyze in-place and update our hierarchy data to
    // add x and y locations
    treelayout(root);
    console.log(root)
  
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
       .attr('r', 20)
       .style('fill', 'green');
  
    svg.selectAll('text')
       .data(root.descendants())
       .enter()
       .append('text')
       .classed('node-label', true)
       .classed('', true)
       .attr('x', d => d.x + 40)
       .attr('y', d => d.y + 25)
       .text(d => d.data.name);

       svg.append('text')
       .classed('title', true)
       .attr('x', w/2)
       .attr('y',  -20)
       .attr('text-anchor', 'middle')
       .text('Alphabet Soup')
  
  }
  
  
  window.onload = function() {
    // console.table is very handy for viewing row/column data
    createCluster();
  };
  