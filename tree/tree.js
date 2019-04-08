/* Hierarchical Layouts I 
 *
 */

let dataset = {
    "name": "Grandpa A",
    "gender": "M",
    "children": [
      { "name": "Aunt B", 
      "gender": "F",
        "children": [ 
          { "name": "Cousin B1",
          "gender": "M",
          }
      
      ]},{ "name": "Mom", 
      
       "gender": "F",
        "children": [ 
          { "name": "Me",
          "gender": "F"
          },{ "name": "Brother",
          "gender": "M"
          },{ "name": "Sister",
          "gender": "F"
          }
      
      ]},
      { "name": "Aunt C",
      "gender": "F" }
    ]
  };
  
  function createTree() {
  
    let root = d3.hierarchy(dataset);
    console.log(root)
  
    let w = 500, h = 500;
  
    let svg = d3.select("#svg")
                .append('svg')
                .attr('width', w)
                .attr('height', h)
                .append('g')
                .attr('transform', 'translate(0,40)');
  
    let treelayout = d3.tree().size([w - 40,h - 80]);
  
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
       .attr('r', 20)
       .style('fill', d=> d.data.gender=="M"?'turquoise':'pink');
  
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
    .text('Family Tree')
          
    // LEGEND - built using Susie Lu's d3.svg.legend package
    let legendScale = d3.scaleOrdinal()
    .domain(['Male', 'Female'])
    .range(['turquoise', 'pink']);

    svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(400,50)");

    // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
    var legendOrdinal = d3.legendColor()
    .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
    .shapePadding(10)
    .scale(legendScale);

    svg.select(".legendOrdinal")
    .call(legendOrdinal);
    
  }
  
  
  window.onload = function() {
    // console.table is very handy for viewing row/column data
    createTree();
  };
  
