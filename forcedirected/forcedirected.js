/* Example: Layouts II 
 *
 * Force-Directed Graph: 
 * 
 * Made up of Nodes (individual items) and Edges (connections between items) 
 * 
 * D3's force layout expects data to be separated into two arrays of data: one
 * containing node items and the second containing connection information for the items.
 * 
 * Reference:
 * 
 * d3-force: https://github.com/d3/d3-force
 */

// store force simulation globally to make it easy to reference from
// drag handling functions that are also defined globally
let force;  


function makeGraph() {
  // dataset for this pie chart
  let dataset = {
    nodes: [
      {name: 'U.S.'},   // 0
      {name: 'Canada'},      // 1
      {name: 'Mexico'},           // 2
      {name: 'Guatemala'},            // 3
      {name: 'Belize'},           // 4
      {name: 'El Salvador'},         // 5
      {name: 'Honduras'},    // 6
      {name: 'Nicaragua'},         // 7
      {name: 'CostaRica'}    // 8
    ], 
    edges: [
      { source: 0, target: 1},
      { source: 0, target: 2},
      { source: 2, target: 3},
      { source: 2, target: 4},
      { source: 3, target: 5},
      { source: 3, target: 6},
      { source: 5, target: 6},
      { source: 6, target: 7},
      { source: 5, target: 7},
      { source: 7, target: 8},
    ] 
  } 

  // settings for our graph 
  let w = 500;
  let h = 500;

  // create our SVG element
  let svg = d3
    .select("#svg")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // create D3 force layout that converts 
  // dataset into a simulation for force-directed graphs 
  // The simulation will have it's own derived dataset internally.
  let linkTargetLength = 100;
  force = d3.forceSimulation(dataset.nodes)
                .force('charge', d3.forceManyBody())
                .force('link', d3.forceLink(dataset.edges)
                                 .distance(linkTargetLength))
                .force('center', d3.forceCenter()
                                   .x(w/2)
                                   .y(h/2));

  // CREATE THE VISUAL
  // We first create the base items for the edges (the connection lines)
  // and nodes (circles) and configure for static properties. 

  let edges = svg.selectAll('line')
                 .data(dataset.edges)
                 .enter()
                 .append('line')
                   .classed('edge', true);

  let nodes = svg.selectAll('circle')
                 .data(dataset.nodes)
                 .enter()
                 .append('circle')
                   .attr('r', 20)
                   .style('fill', (d,i) => (i < 2) ? 'navy' : 'violet')
                   .call(d3.drag()
                           .on('start', onDragStart)
                           .on('drag', onDrag)
                           .on('end', onDragEnd));
                
  // append title elements for all nodes, giving us tooltips
  nodes.append('title')
       .text(d => d.name)

  // Next we deal with dynamic properties using the forceSimulation. 
  // We do this by setting what happens when the forceSimulation 'ticks'
  // when running. 

  force.on('tick', () => {
    // update edge line's starting and ending x/y using the 
    // joined data that D3 derived from our dataset
    edges
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    // update node center x/y's using the 
    // joined data that D3 derived from our dataset
    nodes 
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

  })
  
    // LEGEND - built using Susie Lu's d3.svg.legend package
    let legendScale = d3.scaleOrdinal()
                        .domain(['First World', 'Developing'])
                        .range(['navy', 'violet']);
  
    svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(40,60)");
  
    // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
    var legendOrdinal = d3.legendColor()
      .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
      .shapePadding(10)
      .scale(legendScale);
  
    svg.select(".legendOrdinal")
      .call(legendOrdinal);

     svg.append('text')
     .classed('title', true)
     .attr('x', 250)
     .attr('y', 20)
     .attr('text-anchor', 'middle')
     .text('Countries Sharing Borders')

  
}

// EVENT HANDLING FUNCTIONS
// (these come straight from "Interactive Data Visualization for the Web", Ch 13, "Draggable Nodes")
function onDragStart(d) {
  if(!d3.event.active) {
    force.alphaTarget(0.3).restart();
  }
  // use fx and fy as fixed x and y values; when set, overrides computed x/y
  d.fx = d.x;
  d.fy = d.y;
}

function onDrag(d) {
  // set fx and fy to event x/y 
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function onDragEnd(d) {
  if(!d3.event.active) {
    force.alphaTarget(1).restart();
  }
  // clear fx and fy so that computed x/y is used once again
  d.fx = null;
  d.fy = null;

}

window.onload = () => makeGraph();