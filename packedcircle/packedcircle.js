/* Hierarchical Layouts I 
 *
 */

let dataset = {
    "name": "RIT",
    "children": [
      { "name": "GCCIS", 
        "children": [ 
          { "name": "GDD",
            "value": 100,
          },
          { "name": "NMID",
            "value": 150,
          },
          { "name": "IST",
            "value": 200,
          }
      
      ]},    { "name": "COLA", 
      "children": [ 
        { "name": "Language",
          "value": 100,
        },
        { "name": "Psychology",
          "value": 150,
        },
        { "name": "Linguistics",
          "value": 200,
        }
    
    ]},
      { "name": "COIS",
        "value": 300 }
    ]
  };

  let colors = ["blue", "yellow", "orange"]
  
  function makeGraph() {
  
    let root = d3.hierarchy(dataset);
  
    let w = 500, h = 500;
  
    let svg = d3.select("#svg")
                .append('svg')
                .attr('width', w)
                .attr('height', h);
  
    let packLayout = d3.pack().size([w - 60,h - 60]);
    root.sum((d) => d.value)


    packLayout(root);
  
  
    // Our data now has a lot of information as well as utility functions for grabbing
    // analyzed data. We are going to use the list of links() to draw our lines, 
    // and the list of all descendants() to draw each item.
  
    svg.append('g')
    .attr("transform", "translate(30, 30)")
    .selectAll('circle')
       .data(root.descendants())
       .enter()
       .append('circle')
       .classed('link', true)
       .attr('cx', d => d.x)
       .attr('cy', d => d.y)
       .attr('r', d => d.r)
       .attr('fill', (d,i)=> d.depth>0? d.depth==1?colors[i]: 'white':'red')
       .attr('opacity', 0.3);
  
    svg.select('g').selectAll('text')
       .data(root.descendants())
       .enter()
       .append('text')
       .classed('node-label', true)
       .classed('', true)
       .attr('x', d => d.x - d.r +10 )
       .attr('y', d => d.y )
       .text(d => d.children===undefined? d.data.name: "");
       
       
    // LEGEND - built using Susie Lu's d3.svg.legend package
    let legendScale = d3.scaleOrdinal()
                        .domain(["COLA", "GCCIS", 'COIS'])
                        .range(["#FFAB6C", "#FFC66C", "#B37A6C"]);
  
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
            
  

       svg.append('text')
       .classed('title', true)
       .attr('x', w/2)
       .attr('y', 20)
       .attr('text-anchor', 'middle')
       .text('RIT Majors')
  }
  
  
  window.onload = function() {
    // console.table is very handy for viewing row/column data
    makeGraph();
  };
  