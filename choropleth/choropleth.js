/* D3 Choropleth exercise.
 * 
 * This example uses randomized state data and puts it into a Javascript Map object.
 * The code here is based on the 05_choropleth.html example code from the book
 * "Interactive Data Visualization for the Web" by Scott Murray (2nd Edition).
 * The code has been updated for D3.
 * 
 * For today: 
 * 
 * 1. Work with color brewer to try different colors for the background
 * 2. Set a stroke to clarify the state boundaries
 * 3. Make interactive to show the values in a tooltip 
 * 4. Add a legend to show the quantized color scale values
 *    (use Susie Lu's d3-legend: https://d3-legend.susielu.com/) 
 * 
 * For your Project 2, you will need to find or create data that makes sense
 * for each state (if you are using a state data set, that is) 
 */

/* UTILITY FUNCTIONS */
let stateValues = {
  "Alabama": 1,
  "Alaska":4,
  "Arkansas":2,
  "Arizona":1,
  "California":2,
  "Colorado":1,
  "Connecticut":1,
  "Delaware":0,
  "Florida":4,
  "Georgia":0,
  "Hawaii":5,
  "Iowa":0,
  "Idaho":1,
  "Illinois":1,
  "Indiana":0,
  "Kansas":2,
  "Kentucky":3,
  "Louisiana":2,
  "Maine":1,
  "Maryland":1,
  "Massachusetts":1,
  "Michigan":4,
  "Minnesota":1,
  "Missouri":4,
  "Mississippi":0,
  "Montana":1,
  "North Carolina":0,
  "North Dakota":0,
  "Nebraska":5,
  "New Hampshire":1,
  "New Jersey":0,
  "New Mexico":1,
  "Nevada":2,
  "New York":2,
  "Ohio":3,
  "Oklahoma":0,
  "Oregon":3,
  "Pennsylvania":1,
  "Rhode Island":1,
  "South Carolina":0,
  "South Dakota":2,
  "Tennessee":3,
  "Texas":3,
  "Utah":1,
  "Virginia":2,
  "Vermont":1,
  "Washington":1,
  "Wisconsin":3,
  "West Virginia":0,
  "Wyoming":1
}
  
  let s;
  
  /* VISUALIZATION CODE */
  
  function createVisualization(dataset, stateValues) {
    let w = 500, h = 500;
    let svg = d3.select("#svg")
                .append('svg')
                .attr('width', w)
                .attr('height', h);
  
    // 2. Define a map projection
      let projection = d3.geoAlbersUsa()
                        .translate([w/2, 5*h/16]) 
                        .scale([600]);
  
    // 3. Define a path generator using the projection
    let path = d3.geoPath()
              .projection(projection);
                               
    // 4. Create a color scale to use for the fill
    let color = d3.scaleQuantize()
    .range(["#fef0d9",
      "#fdcc8a",
      "#fc8d59",
      "#e34a33",
      "#b30000"]);
             
    //Set input domain for color scale
    let sValues = Array.from(stateValues.values()); // grab values from Map object and put into an array
    color.domain(d3.extent(sValues));
  
    // 5. Draw the map using SVG path elements, styling with fill values
    // from our color scale
  
    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(dataset.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style('stroke', 'black')
        .style("fill", d => {
          //Get data value
          let value = stateValues.get(d.properties.name);
          
          if (value) {
            //If value exists…
            return color(value);
          } else {
            //If value is undefined…
            return "#ccc";
          }
        })
        .append('title')
        .text(d=> d.name);

    
    // LEGEND - built using Susie Lu's d3.svg.legend package
    let legendScale = d3.scaleOrdinal()
                        .domain(['0-20', '20-40', '40-60', "60-80", "80-100"])
                        .range(["#fef0d9",
                        "#fdcc8a",
                        "#fc8d59",
                        "#e34a33",
                        "#b30000"]);
  
    svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(430, 200)");
  
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
     .text('Percent of People Believing in Aliens')

  }
  
  
  // load the state GeoJSON data
  
  d3.json('us-states.json').then((json) => {
    let randMin = 10, randMax = 10000;

    // Make a second array with the state names and with rand data
    // We're using this as mock data. In a real scenario, you would 
    // probably load this data from elsewhere (e.g., CSV)
    let states = json.features.map(d => { 
      return {
        state: d.properties.name, 
        value: stateValues[d.properties.name]
      }
    });
  
    let stateValues2 = new Map(states.map(d => [d.state, d.value]));
    createVisualization(json, stateValues2);
  });
  
  