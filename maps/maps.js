/* Points, Pan, and Zoom. 
 * 
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
  
  let colors = ["#edf8fb", "#b3cde3", "#8c96c6", "#8856a7", "#810f7c"];

  /* VISUALIZATION CODE */
  
  function createVisualization(dataset, stateValues, cityValues) {
    let w = 500, h = 500;
    let svg = d3.select("#svg")
                .append('svg')
                .attr('width', w)
                .attr('height', h);
  
    // 2. Define a map projection
      let projection = d3.geoAlbersUsa()
                     .translate([w/2, 5*h/16])
                     .scale([600]);
                    
    let projectionDefaultScale = projection.scale();
  
    // 3. Define a path generator using the projection
    let path = d3.geoPath()
              .projection(projection);
                               
    // 4. Create a color scale to use for the fill
    let color = d3.scaleQuantize()
              .range(colors);
  
    //Set input domain for color scale
    let sValues = Array.from(stateValues.values()); // grab values from Map object and put into an array
    color.domain(d3.extent(sValues));
  
    // 5. Draw the map using SVG path elements, styling with fill values
    // from our color scale
  
    let map = svg.append('g');
  
    //Bind data and create one path per GeoJSON feature
    map.selectAll("path")
        .data(dataset.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", d => {
          //Get data value
          let value = stateValues.get(d.properties.name);
          
          if (value) {
            //If value exists…
            return color(value);
          } else {
            //If value is 0
            return colors[0];
          }
        })
        .style('stroke', 'black');
  
    /* CITY DATA AS POINTS */
    map.selectAll("circle")
        .data(cityValues.cities)
        .enter()
        .append("circle")
        .style('fill', 'red')
        .style('stroke', 'black')
        .style('opacity', '0.75')
        .attr('cx', d => projection([d.lon, d.lat])[0])
        .attr('cy', d => projection([d.lon, d.lat])[1])
        .attr('r', 5)
        .append('title')
          .text(d => d.name)
  
    /* CITY NAMES SHOWN BASED ON ZOOM LEVEL (SEMANTIC ZOOM) */
    map.selectAll("text")
        .data(cityValues.cities)
        .enter()
        .append("text")
        .style('fill', 'black')
        .style('font-size', 10)
        .attr('x', d => projection([d.lon, d.lat])[0] + 8)
        .attr('y', d => projection([d.lon, d.lat])[1])
        .text(d => d.name)
        .style('visibility', 'hidden')
  
    /* PAN AND ZOOM INTERACTIVITY */
  
    let updateMap = (k) => {
      //Update all paths and circles
      map.selectAll('path')
        .attr('d', path);
  
      map.selectAll('circle')
        .attr('cx', d => projection([d.lon, d.lat])[0])
        .attr('cy', d => projection([d.lon, d.lat])[1]);
  
      map.selectAll('text')
        .attr('x', d => projection([d.lon, d.lat])[0] + 8)
        .attr('y', d => projection([d.lon, d.lat])[1])
        .style('visibility', k > 1.5 ? '' : 'hidden')
        .style('font-size', k>2? `1em`:`${2/k}em` );
  
    }
  
    // what we want to do whenever we pan/zoom
    let handleZoom = (d) => {
      //New offset array
      var offset = [w/2 + d3.event.transform.x, h/2 + d3.event.transform.y];
  
      //Calculate new scale
      var newScale = d3.event.transform.k * projectionDefaultScale;
  
      //Update projection with new offset and scale
      projection.translate(offset)
            .scale(newScale);
  
      updateMap(d3.event.transform.k);
    };
  
    // alternatively, can use SVG transform for geometric zoom, but this scales the 
    // dots...
    // see https://bl.ocks.org/mbostock/db6b4335bf1662b413e7968910104f0f
    let handleZoomTransform = (d) => {
      map.attr("transform", d3.event.transform);
    }
  
    // define the D3 zoom 
    let zoom = d3.zoom()
                 .scaleExtent([1, 10])
                 .translateExtent([[-w, -h], [w * 2, h * 2]])
                 .on('zoom', handleZoom);
  
    //Bind the zoom behavior
    svg.call(zoom);


    
    // LEGEND - built using Susie Lu's d3.svg.legend package
    let legendScale = d3.scaleOrdinal()
                        .domain(['0-20', '20-40', '40-60', "60-80", "80-100"])
                        .range(colors);
  
    svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(420, 350)")
      .append('rect')
      .attr('width', '100')
      .attr('height', '150')
      .attr("transform", "translate(-20, -20)")
        .style('fill', '#997349');
  
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
      .text('Cities Visited');

    
    svg.append('text')
      .attr('x', 440)
      .attr('y', 320)
      .attr('text-anchor', 'middle')
      .text('% Want to Visit')
  }
  
  // load multiple json files and wait for all results using Promise.all()
  // 
  Promise.all([
      d3.json('us-states.json'),
      d3.json('city-data.json')
    ]).then((values) => {
      let [stateData, cityData] = values;
  
      let states = stateData.features.map(d => { 
        return {
          state: d.properties.name, 
          value: stateValues[d.properties.name]
        }
      });
  
      let stateValues2 = new Map(states.map(d => [d.state, d.value]));
  
  
      createVisualization(stateData, stateValues2, cityData);
  
    }); 
  