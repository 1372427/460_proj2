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
    console.log(root)
  
    let w = 500, h = 500;
  
    let svg = d3.select("#svg")
                .append('svg')
                .attr('width', w)
                .attr('height', h);
  
    let packLayout = d3.pack().size([w - 60,h - 60]);
    root.sum((d) => d.value)


    packLayout(root);
    console.log(root)
  
  
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
  